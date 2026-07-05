# Day 2 – Azure Networking Fundamentals: Theory

Day 1 covered networking at the OS level — IP, DNS, ports, routing. Day 2 moves into Azure: how Microsoft's cloud implements networking concepts like VNet, Subnet, NIC, NSG, Peering, and Route Tables.

---

## 1.1 CIDR Notation — the foundation of everything below

Before VNets or subnets make sense, you need to read CIDR notation comfortably, because every address range in Azure is written this way.

A CIDR block looks like `10.0.0.0/16`. The number after the slash is the **prefix length** — it tells you how many bits (out of 32) are fixed for the network, leaving the rest free for individual addresses.

**Example:**
- `10.0.0.0/16` → 16 bits fixed, 16 bits free → 2^16 = **65,536 addresses** (`10.0.0.0` to `10.0.255.255`)
- `10.0.1.0/24` → 24 bits fixed, 8 bits free → 2^8 = **256 addresses** (`10.0.1.0` to `10.0.1.255`)
- `10.0.1.0/28` → 28 bits fixed, 4 bits free → 2^4 = **16 addresses** (`10.0.1.0` to `10.0.1.15`)

The smaller the number after the slash, the bigger the range. A `/16` is a big bucket (a whole VNet); a `/24` is a smaller bucket carved out of it (a subnet); a `/28` is tiny, often used for things like an Azure Bastion or Firewall subnet that needs very few addresses.

**Worked example:** if your VNet is `10.0.0.0/16`, you could carve it into:

| Subnet | CIDR | Addresses | Usable for VMs* |
|---|---|---|---|
| subnet-web | 10.0.1.0/24 | 256 | 251 |
| subnet-db | 10.0.2.0/24 | 256 | 251 |
| subnet-bastion | 10.0.3.0/27 | 32 | 27 |

*Azure reserves 5 addresses in every subnet (network address, gateway, two for DNS, broadcast) — so a `/24` gives you 256 total but 251 usable.

---

## 1.2 VNet (Virtual Network)

A VNet is your own private, isolated network inside Azure — the cloud version of a physical LAN in a data center.

**Example:** A company creates `vnet-prod` with address space `10.0.0.0/16` in the East US region. Every VM, database, and app service they deploy in production lives inside this VNet, and nothing outside it can reach those resources directly unless explicitly allowed.

---

## 1.3 Subnet

A subnet is a smaller range carved out of the VNet's CIDR block. You never put a resource directly into a VNet — only into a subnet within it.

**Example:** Inside `vnet-prod (10.0.0.0/16)`, the team creates `subnet-web (10.0.1.0/24)` for internet-facing VMs and `subnet-db (10.0.2.0/24)` for the database tier — kept separate so a different, stricter NSG can be applied to the database subnet.

---

## 1.4 Public & Private IP

- **Private IP** — drawn from the subnet's range, used for internal communication only. Example: a VM in `subnet-web (10.0.1.0/24)` gets private IP `10.0.1.4` automatically.
- **Public IP** — a separate resource you attach, giving internet reachability. Example: that same VM also gets public IP `20.115.40.12`, so a developer can SSH into it from their laptop at home.

Only resources that genuinely need to be reached from outside Azure should have a public IP — the database VM in the example above should stay private-only.

---

## 1.5 NIC (Network Interface Card)

The NIC is the virtual adapter attached to a VM, holding its IP configuration.

**Example:** `vm-web` has one NIC, `nic-vm-web`, which holds private IP `10.0.1.4`, is linked to public IP `20.115.40.12`, and has NSG `nsg-web` attached to filter its traffic.

---

## 1.6 NSG (Network Security Group)

A stateful firewall made of priority-ordered allow/deny rules, attached to a subnet or a NIC.

**Example:** `nsg-web` has one custom rule — priority 1000, allow inbound TCP port 22 from any source. Everything else inbound falls back to the default deny-all rule that ships with every NSG. If you also wanted to allow web traffic, you'd add a second rule: priority 1010, allow inbound TCP port 443.

---

## 1.7 VNet Peering

Connects two VNets so resources communicate over private IPs without crossing the public internet. Not transitive.

**Example:** `vnet-hub (10.0.0.0/16)` peers with `vnet-spoke (10.1.0.0/16)`. A VM in the hub at `10.0.1.4` can now ping a VM in the spoke at `10.1.1.4` directly, even though they're in two separate VNets — as long as peering is set up in both directions and NSGs allow it.

---

## 1.8 Route Tables

A route table is a set of rules that tells traffic leaving a subnet which next hop to use, overriding Azure's default system routes when needed.

Every subnet has default system routes already (e.g., "anything in my own VNet → VnetLocal", "anything else → Internet"). You create a custom route table when you need to force traffic somewhere specific — most commonly, through a firewall or network virtual appliance (NVA) instead of going directly to its destination.

**Example:** You have `vnet-hub (10.0.0.0/16)` and `vnet-spoke (10.1.0.0/16)`, peered together, with an Azure Firewall sitting in the hub at private IP `10.0.4.4`. Without a route table, traffic from the spoke to the hub would go directly over the peering link, bypassing the firewall entirely. So you create a route table with one rule:

| Destination CIDR | Next hop type | Next hop IP |
|---|---|---|
| 10.0.0.0/16 | Virtual appliance | 10.0.4.4 |

You attach this route table to `subnet-app` in the spoke. Now any traffic from that subnet heading to the hub's address range is forced through the firewall first, instead of taking the direct peering path.

---

## 1.9 Connectivity Testing

Once everything is built, you confirm it actually works:
- `ping <ip>` — basic reachability.
- `ssh user@<ip>` — confirms login actually works, not just that a port is open.
- `ip route` — run inside the VM, shows its local routing table — useful for confirming which gateway and route a packet will actually take.
