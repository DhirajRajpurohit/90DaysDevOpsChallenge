**#90DaysOfDevOps – Networking & Cloud Learning Journey**

This repo tracks my day-by-day hands-on learning, starting with core networking fundamentals and moving into Azure cloud networking.

📅 Progress

DayTopicNotesDay 1Networking Fundamentals & Hands-on ChecksOSI vs TCP/IP, ping, traceroute, ss, dig, curl, nc — diagnosing connectivity from the command lineDay 2Azure Networking FundamentalsVNet, Subnet, NIC, NSG, VNet Peering, Route Tables — built manually in the Azure Portal using a real-world scenario

🗂️ Repo Structure

.
├── README.md              ← you are here

├── day-1/
│   └── day1-learnings.md  ← Day 1 full notes

└── day-2/
    └── day2-learnings.md  ← Day 2 full notes

🧠 Day 1 Summary — Networking Fundamentals

Covered the OSI and TCP/IP models, where common protocols sit, and ran a full hands-on diagnostic checklist: identity (hostname -I), reachability (ping), path (traceroute), open ports (ss -tulpn), name resolution (dig), HTTP checks (curl -I), and active connections (netstat). Closed with real incident scenarios mapped to which OSI layer to check first.

➡️ Full write-up: day-1/day1-learnings.md

🧠 Day 2 Summary — Azure Networking Fundamentals

Moved into Azure: built a VNet with separate web/database subnets, locked down access with an NSG, stood up a public-facing web server, peered a second VNet to it (fixing a real overlapping-address-space error along the way), and forced cross-network traffic through a checkpoint using a custom route table — all done manually through the Azure Portal, built around a real-world "company hosting a web app" scenario.

➡️ Full write-up: day-2/day2-learnings.md

✅ Key Takeaways So Far


A status badge or "Connected" label only proves a config exists — only a real ping or ssh test proves it's actually working.
Troubleshooting is faster once you know which OSI/TCP-IP layer you're debugging — don't guess, check layer by layer.
In Azure, VNets being peered must not have overlapping address spaces — ran into this directly and resolved it.
Read CIDR by the number after the slash: smaller number = bigger range.
