**Day 4 – SSH, EC2-to-EC2 Connectivity, User/Group Management & Log Analysis**


Day 3 covered Linux fundamentals on a single machine. Day 4 moves into multi-server territory — connecting to cloud servers securely, connecting servers to each other, managing who's allowed to do what on a box, and pulling real signal out of log files using grep, awk, and sed.


Part 1: SSH into EC2 from My Local Machine
The very first step — connecting from my own laptop into an AWS EC2 instance using a private key (.pem file) 

![image alt](https://github.com/DhirajRajpurohit/90DaysDevOpsChallenge/blob/935e726b8aac60fae1c302d14a6d69675729aeba/Linux/Day4/PracticalImages/Screenshot%202026-06-26%20161240.png)


Observe: the -i flag points to the private key matching the key pair selected when the EC2 instance was launched. A successful connection drops you straight into the instance's shell — the welcome banner with Ubuntu version, system load, and IP confirms you're in.


Part 2: Connecting One EC2 Instance to Another
This is the more interesting part — not connecting from my laptop, but making one EC2 instance able to SSH into a second EC2 instance, server-to-server.

Step 1 — Generate a key pair on the source instance
Inside the .ssh folder of the first EC2 instance:

ssh-keygen

![image alt](https://github.com/DhirajRajpurohit/90DaysDevOpsChallenge/blob/935e726b8aac60fae1c302d14a6d69675729aeba/Linux/Day4/PracticalImages/Screenshot%202026-06-26%20163632.png)


Observe: this creates id_ed25519 (private key) and id_ed25519.pub (public key) inside ~/.ssh. The private key stays on this instance; the public key is what gets shared with the destination server.

Step 2 — Add the public key to the destination instance's authorized_keys
On the second EC2 instance, the public key gets appended into ~/.ssh/authorized_keys:

![image alt](https://github.com/DhirajRajpurohit/90DaysDevOpsChallenge/blob/935e726b8aac60fae1c302d14a6d69675729aeba/Linux/Day4/PracticalImages/Screenshot%202026-06-26%20164003.png)

![image alt](https://github.com/DhirajRajpurohit/90DaysDevOpsChallenge/blob/935e726b8aac60fae1c302d14a6d69675729aeba/Linux/Day4/PracticalImages/Screenshot%202026-06-26%20164246.png)





Observe: authorized_keys can hold multiple keys (notice both an ed25519 and an rsa key present here) — any private key matching one of these public keys will be allowed to log in.

Step 3 — Connect from instance 1 to instance 2

**ssh -i id_ed25519 ubuntu@publicipofinstance2**


![image alt](https://github.com/DhirajRajpurohit/90DaysDevOpsChallenge/blob/935e726b8aac60fae1c302d14a6d69675729aeba/Linux/Day4/PracticalImages/Screenshot%202026-06-26%20164611.png)


Observe: the first time you connect to a new host, SSH shows the key fingerprint and asks you to confirm — typing yes adds it to known_hosts so future connections don't prompt again.

Step 4 — Prove the connection actually works
Once logged into the second instance, create a file to prove you're really on a different machine:

echo "this is an server2" > new-file.txt
cat new-file.txt

![image alt](https://github.com/DhirajRajpurohit/90DaysDevOpsChallenge/blob/935e726b8aac60fae1c302d14a6d69675729aeba/Linux/Day4/PracticalImages/Screenshot%202026-06-26%20164611.png)
Add a caption (optional)
Observe: going back to the first instance and confirming this file doesn't exist there is the real proof that this is genuinely a separate server, reached over SSH using key-based auth — not just two terminal tabs on the same box.


Part 3: User & Group Management

Creating users

![image alt](https://github.com/DhirajRajpurohit/90DaysDevOpsChallenge/blob/935e726b8aac60fae1c302d14a6d69675729aeba/Linux/Day4/PracticalImages/Screenshot%202026-06-26%20165910.png)

Observe: the -m flag creates a home directory for each user automatically. Notice the typo attempt sedo useradd failed with "command not found" — a good reminder that a single typo in user creation just fails loudly rather than silently doing the wrong thing.

Creating groups

![image alt](https://github.com/DhirajRajpurohit/90DaysDevOpsChallenge/blob/935e726b8aac60fae1c302d14a6d69675729aeba/Linux/Day4/PracticalImages/Screenshot%202026-06-26%20165910.png)

Adding users to a group

![image alt](https://github.com/DhirajRajpurohit/90DaysDevOpsChallenge/blob/935e726b8aac60fae1c302d14a6d69675729aeba/Linux/Day4/PracticalImages/Screenshot%202026-06-26%20170305.png)

Observe: gpasswd -M lets you set the entire member list for a group in one command — useful when you want to define group membership explicitly rather than adding users one at a time.

Verifying with **cat /etc/group**


![image alt](https://github.com/DhirajRajpurohit/90DaysDevOpsChallenge/blob/935e726b8aac60fae1c302d14a6d69675729aeba/Linux/Day4/PracticalImages/Screenshot%202026-06-26%20170325.png)


Observe: Devops:x:1005:Dhiraj,Shubham confirms the group exists with GID 1005 and lists its members — this file is the single source of truth for group membership, no guessing needed.

Adding a user to a group with usermod instead
sudo usermod -aG Devops Aman

![image alt](https://github.com/DhirajRajpurohit/90DaysDevOpsChallenge/blob/935e726b8aac60fae1c302d14a6d69675729aeba/Linux/Day4/PracticalImages/Screenshot%202026-06-26%20173742.png)

Observe: this history view shows the full sequence — creating users, creating groups, fixing a typo, and using both gpasswd -M and usermod -aG to manage group membership. -aG appends a user to a group without removing them from others, while gpasswd -M replaces the whole member list — worth knowing which one you actually want before running it.

A final check from a different session, confirming UID/GID numbering:


Part 4: File Permissions & Ownership

![image alt](https://github.com/DhirajRajpurohit/90DaysDevOpsChallenge/blob/935e726b8aac60fae1c302d14a6d69675729aeba/Linux/Day4/PracticalImages/Screenshot%202026-06-27%20003354.png)

Observe: before chown, command.txt would have been owned by whoever created it (ubuntu). After sudo chown Shubham command.txt, the ls -l output shows Shubham as the owner instead. Permissions themselves (rw-rw-r-- in this case) didn't change — only who the "owner" permission bits apply to changed.

A quick refresher on what those permission letters mean, since this is the foundation chown/chmod build on:

Position Applies to Example 1st set (rwx) Owner Owner can read, write, execute 2nd set (rwx) Group Group members' access 3rd set (rwx) Others Everyone else on the system


Part 5: Log Analysis — grep, awk & sed
This is where things got genuinely interesting: digging through app.log to find real authentication failure attempts — basically a mini security-incident investigation.

grep — finding the relevant lines
grepgrep (Global Regular Expression Print) searches through text and prints the lines that match a given pattern. It's the simplest of the three — it just finds lines, it doesn't change or rearrange data within them



![image alt](https://github.com/DhirajRajpurohit/90DaysDevOpsChallenge/blob/935e726b8aac60fae1c302d14a6d69675729aeba/Linux/Day4/PracticalImages/Screenshot%202026-06-27%20004754.png)

Despite the warning, grep still searched for authentication and matched the right lines because app.log was also passed — but quoting the full phrase is the correct, unambiguous way to do this.

grep -i "authentication failure" app.log | head


![image alt](https://github.com/DhirajRajpurohit/90DaysDevOpsChallenge/blob/935e726b8aac60fae1c302d14a6d69675729aeba/Linux/Day4/PracticalImages/Screenshot%202026-06-27%20005115.png)


Observe: piping to head limits output to the first 10 lines by default — useful when a log file has hundreds of matching lines and you just want a quick look.


![image alt](https://github.com/DhirajRajpurohit/90DaysDevOpsChallenge/blob/935e726b8aac60fae1c302d14a6d69675729aeba/Linux/Day4/PracticalImages/Screenshot%202026-06-27%20005320.png)


Observe: tail -n 4 shows the most recent matching entries — in an incident, this is usually more useful than head, since you care about what's happening now, not what happened first.

The real finding: multiple failed SSH login attempts for user=root, repeatedly, from the same external IP (220-135-151-1.hinet-ip.hinet.net) and another IP (218.188.2.4, later 207.243.16x). Repeated root login attempts from external IPs in short bursts is the classic signature of an automated SSH brute-force attempt.

awk — pulling out just the fields that matter
awk is a pattern-scanning and text-processing tool that treats each line as a row split into fields ($1, $2, $3, etc., by whitespace by default). Instead of just finding lines like grep, it lets you pull out, rearrange, or conditionally process specific fields within those lines.

awk '/authentication failure/ {print}' app.log

![image alt](https://github.com/DhirajRajpurohit/90DaysDevOpsChallenge/blob/935e726b8aac60fae1c302d14a6d69675729aeba/Linux/Day4/PracticalImages/Screenshot%202026-06-27%20010017.png)

Observe: this does roughly the same job as grep — printing the whole line — but awk becomes more powerful once you start printing specific fields instead of the whole line.

awk '/authentication failure/ {print $1, $2}' app.log

![image alt](https://github.com/DhirajRajpurohit/90DaysDevOpsChallenge/blob/935e726b8aac60fae1c302d14a6d69675729aeba/Linux/Day4/PracticalImages/Screenshot%202026-06-27%20010158.png)

Observe: $1 and $2 pull out just the first two space-separated fields of each matching line — here, the month and day (Jun 14, Jun 15). awk splits each line by whitespace automatically, so each $N refers to the Nth word on the line.

awk '/authentication failure/ {print $12, $13, $14, $15}' app.log | head -n 5

![image alt](https://github.com/DhirajRajpurohit/90DaysDevOpsChallenge/blob/935e726b8aac60fae1c302d14a6d69675729aeba/Linux/Day4/PracticalImages/Screenshot%202026-06-27%20010649.png)

Observe: this pulls out exactly the fields containing ruser= and rhost=<ip> — turning a noisy, full log line into a clean list of just "who tried to log in as what, from where." This is the single most useful line from the whole session: it took a wall of raw text and turned it into an actual list of attacker IPs and attempted usernames.

sed — quick in-line text substitution
sedsed (Stream Editor) reads text line by line and applies an editing command to it — most commonly find-and-replace — without opening a text editor. It edits the content of lines, rather than just searching or extracting fields

sed was used for fast find-and-replace style editing directly on text streams, e.g.:

sed 's/ruser/username/' failure.txt

![image alt](https://github.com/DhirajRajpurohit/90DaysDevOpsChallenge/blob/935e726b8aac60fae1c302d14a6d69675729aeba/Linux/Day4/PracticalImages/Screenshot%202026-06-27%20012843.png)


This replaces the first occurrence of ruser with username on each line — handy for quickly reformatting log output or redacting/highlighting specific terms before sharing a snippet, without opening a text editor.


Part 6: Real Incident Scenario — What This Log Actually Showed
Symptom: app.log contains repeated authentication failure entries for sshd, with user=root, all originating from external IPs not belonging to any known team member.

Investigation using the commands above:

grep -i "authentication failure" app.log — confirmed how many failed attempts existed and roughly when.

awk '{print $1,$2}' — confirmed the dates these attempts happened on (clustered around specific days, not spread evenly — a sign of an active attack window, not background noise).

awk '{print $12,$13,$14,$15}' — extracted exactly which usernames and source IPs were responsible.

Conclusion: the same handful of external IPs repeatedly tried logging in as root over SSH — a brute-force pattern.

Real-world next steps after a finding like this:

Disable direct root SSH login (PermitRootLogin no in sshd_config) — root should never be SSH-accessible directly.

Move SSH to key-based auth only (PasswordAuthentication no) — exactly what was set up in Part 2 of this lab.

Block the offending IPs at the firewall/security group level, or use a tool like fail2ban to do this automatically after repeated failures.




