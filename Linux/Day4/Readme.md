
# Day 4 – SSH, EC2-to-EC2 Connectivity, User/Group Management & Log Analysis

Part of my #90DaysOfDevOps challenge.

## What I Did Today

- Connected to an EC2 instance from my local machine using a `.pem` key.
- Generated an SSH key pair (`ssh-keygen`) on one EC2 instance and used it to connect directly to a second EC2 instance — server-to-server SSH.
- Created multiple users (`useradd -m`) and groups (`groupadd`), and managed group membership with both `gpasswd -M` and `usermod -aG`.
- Verified user/group setup directly from `/etc/group`.
- Changed file ownership with `chown` and reviewed file permission basics (read/write/execute for owner, group, others).
- Used `grep` to isolate `authentication failure` entries in a real log file.
- Used `awk` to extract specific fields (date, username, source IP) from matching log lines.
- Used `sed` for quick in-line text substitution on log output.
- Found a real brute-force SSH pattern in the log — repeated failed `root` login attempts from external IPs — and worked through what the real-world remediation steps would be.

## Files

| File | Description |
|---|---|
| `day4-learnings.md` | Full in-depth write-up with commands, terminal screenshots, and the log-analysis incident scenario |
| `images/` | All terminal screenshots referenced in the write-up |

## Up Next

Continuing the Linux/cloud fundamentals track before moving into Shell Scripting.
