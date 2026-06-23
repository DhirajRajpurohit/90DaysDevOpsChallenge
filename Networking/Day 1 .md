

Day 1 - Networking Fundamentals

 What is the Internet?

The Internet is the biggest network of networks. It connects billions of devices across the globe and enables services such as websites, APIs, cloud platforms, and communication systems.

The Internet works because of a stack of technologies and protocols including:

* IP Addressing
* DNS (Domain Name System)
* Routing
* TCP/IP Protocols

Every request made by a device passes through multiple layers and network devices before reaching its destination.

---

🌐 How the Internet Works

When you enter a URL into a browser, several things happen behind the scenes:

1. DNS converts the domain name (for example, `google.com`) into an IP address.
2. Your device sends a request using TCP/IP.
3. The request passes through routers, firewalls, and NAT devices.
4. The server receives the request and sends back a response.
5. The browser renders the webpage.

Understanding this flow is important for troubleshooting and deploying applications in production.

---

## 🔹 What is a Subnet?

A subnet (subnetwork) is a logical division of a larger network.

Benefits of subnetting:

* Better traffic management
* Improved security
* Network isolation
* Efficient IP address utilization

Cloud providers like AWS, Azure, and GCP use subnets extensively to organize infrastructure and control access.

---

## 🔹 IPv4 vs IPv6

| IPv4                   | IPv6                    |
| ---------------------- | ----------------------- |
| 32-bit address         | 128-bit address         |
| Example: 192.168.1.1   | Example: 2001:db8::1    |
| ~4.3 billion addresses | Trillions of addresses  |
| Older standard         | New generation standard |

Most modern systems support both IPv4 and IPv6.

---

## Why DevOps Engineers Must Understand Networking

DevOps environments rely heavily on:

* Servers
* Containers
* APIs
* CI/CD Pipelines
* Kubernetes
* Cloud Infrastructure

Common issues caused by networking problems:

* Firewall restrictions
* Incorrect subnet configurations
* DNS failures
* Routing issues
* Port accessibility problems

Understanding networking fundamentals helps in troubleshooting and maintaining infrastructure efficiently.

---

# 🛠 Hands-on Practice

## 1️⃣ Reachability Test

### Command

```bash
ping google.com -c 4
```

### Output

```text
4 packets transmitted, 4 received, 0% packet loss, time 3004ms
rtt min/avg/max/mdev = 17.9/18.2/18.6/0.25 ms
```

### Observation

Average latency is around 18 ms with 0% packet loss, indicating a stable network connection.

---

## 2️⃣ Listening Ports

### Command

```bash
ss -tulpn
```

### Output

```text
tcp   LISTEN   0.0.0.0:22    sshd
tcp   LISTEN   0.0.0.0:80    nginx
udp   LISTEN   0.0.0.0:68    dhclient
```

### Observation

* SSH service is listening on port 22.
* Web server is listening on port 80.
* DHCP client uses UDP port 68.

---

## 3️⃣ Traceroute Command

### What is Traceroute?

`traceroute` shows the path (hops) packets take from your machine to a destination server.

It helps identify:

* Network delays
* Connection failures
* Number of routers between source and destination

### Command

```bash
traceroute google.com
```

### Example Output

```text
1  192.168.1.1     1.2 ms
2  10.10.0.1       5.4 ms
3  72.14.233.21    20.1 ms
4  142.250.183.14  22.3 ms
```

### How to Read the Output

* Each line represents one hop (router).
* Time values indicate latency.
* `*` means that the router did not respond.

### Real-world Use

If a website is slow, traceroute helps determine where delays are occurring and which hop might be causing the issue.

---

# 📝 Reflection

When troubleshooting connectivity issues:

* `ping` quickly verifies reachability.
* `ip route` shows routing information.
* Check the Internet layer first (routing table and default gateway).
* Then verify the Link layer using ARP and MAC address resolution.

---

 Key Takeaways

* Learned how the Internet works.
* Understood subnetting concepts.
* Compared IPv4 and IPv6.
* Practiced network troubleshooting commands.
* Explored traceroute and listening ports.
* Built a strong foundation for future DevOps and cloud networking concepts.


