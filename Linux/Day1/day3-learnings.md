# Day 3 – Linux Basics: Commands, Users & Deploying My First Web Page on Nginx
 
Day 1 and Day 2 covered networking — at the OS level and then inside Azure. Day 3 goes back a layer further: the operating system itself. Almost every DevOps tool (Docker, Kubernetes, CI/CD runners, cloud VMs) runs on Linux underneath, so this is the real foundation.
 

 
---
 
## Part 1: Why Linux?
 
Linux is the operating system that runs the overwhelming majority of servers, cloud VMs, and containers in the world. A few reasons it's the default choice in DevOps:
 
- **Free and open-source** — no licensing cost, and the source code is open to inspect and modify.
- **Stable and lightweight** — runs well even on minimal hardware or stripped-down cloud instances.
- **Secure by design** — strict permission model (users, groups, file permissions) reduces accidental or malicious damage.
- **Scriptable** — almost everything can be automated through the shell, which is exactly what CI/CD and infrastructure automation depend on.
- **Industry standard** — Docker images, Kubernetes nodes, and most cloud VMs (AWS EC2, Azure VMs) default to Linux.
 
## 1.1 Linux Architecture (at a glance)
 
Linux is built in layers:
 
- **Kernel** — the core; talks directly to hardware (CPU, memory, disk, network).
- **Shell** — the command-line interface (e.g., bash) that takes your typed commands and asks the kernel to act on them.
- **System utilities & applications** — everything else you run (commands, services, programs) sits on top of the shell and kernel.
 
When you type a command like `ls`, the shell interprets it, asks the kernel to read the directory, and prints the result back to you.

![image alt]{https://github.com/DhirajRajpurohit/90DaysDevOpsChallenge/blob/687dc52eb74ddd2cd316f727ff04b6675793c40f/Linux/Day1/Practical%20Hand-on%20Images/Screenshot%202026-06-25%20171959.png}


 
## Part 2: File System Management Commands
 
These are the everyday commands for navigating and managing files and folders.
 
| Command | What it does |
|---|---|
| `pwd` | Print working directory — shows your current path |
| `ls` | List files & folders |
| `ls -lh` | List with details and human-readable sizes |
| `cd /path` | Change directory |
| `mkdir dir` | Create a directory |
| `touch file` | Create a new empty file |
| `echo` | Print text to the terminal (or into a file) |
| `mv src dest` | Move or rename a file/folder |
| `cp src dest` | Copy a file |
| `rm file` | Delete a file |
| `rm -d dir` | Delete an **empty** folder |
| `rm -rf dir` | Force-delete a folder **and everything inside it** |
| `find / -name file` | Search for a file by name |
| `du -sh dir` | Show a folder's total size |
| `df -h` | Show disk usage |
 
**The `rm -d` vs `rm -rf` difference, in practice:** `rm -d` only works on an empty folder — it's a safety net, same idea as `rmdir`. If the folder still has files inside it, `rm -d` (and `rmdir`) will refuse with a "directory not empty" error. `rm -rf` deletes the folder and everything inside it, no matter what's there and with no confirmation prompt — so it's the one to be careful with.
 

https://github.com/DhirajRajpurohit/90DaysDevOpsChallenge/blob/687dc52eb74ddd2cd316f727ff04b6675793c40f/Linux/Day1/Practical%20Hand-on%20Images/Screenshot%202026-06-25%20154717.png
 
### A few extra commands I picked up alongside these
 
| Command | What it does |
|---|---|
| `find` | Search files or folders |
| `date` | Show current date |
| `whoami` | Show current user |
| `uname` | Show system details |
| `free -h` | Show memory usage |
| `df -h` | Show disk space |
| `ping` | Check network connectivity |
| `ifconfig` | Check network details |
| `ps` | Show running processes |
| `top` | Show live processes |
 

---
 
## Part 3: Process Management Commands
 
Once files are under control, the next thing to monitor is what's actually running on the system:
 
| Command | What it does |
|---|---|
| `ps aux` | List all running processes, with full details |
| `top` | Live, continuously-updating process monitor |
| `htop` | A friendlier, color version of `top` (if installed) |
| `pidof nginx` | Get the process ID of a specific running service (e.g., nginx) |
| `kill PID` | Stop a process gracefully by its process ID |
| `kill -9 PID` | Force-kill a process that won't stop normally |
| `uptime` | Show how long the system has been running |
| `free -h` | Show memory usage, human-readable |
 

 
**Why this matters in real troubleshooting:** if a service like Nginx seems stuck, `pidof nginx` finds its process ID, `top` or `ps aux` shows if it's consuming abnormal CPU/memory, and `kill`/`kill -9` lets you stop and restart it cleanly if needed.
 
---
 
## Part 4: Text Editors — vim vs nano
 
Both let you edit files directly from the terminal, but they're built very differently:
 
- **nano** — beginner-friendly, shows the available shortcuts at the bottom of the screen, works the moment you open it (just start typing).
- **vim** — far more powerful once you know it, but has "modes" (press `i` for insert mode to start typing, `Esc` to leave it, then `:wq` to save and quit, or `:q!` to quit without saving). Steeper learning curve, but faster once you know it.

https://github.com/DhirajRajpurohit/90DaysDevOpsChallenge/blob/687dc52eb74ddd2cd316f727ff04b6675793c40f/Linux/Day1/Practical%20Hand-on%20Images/Screenshot%202026-06-25%20155612.png
 
**Rule of thumb:** start with `nano` for quick edits; learn `vim` once comfortable, since it's available on almost every Linux system by default, even minimal ones.
 
---
 
## Part 5: update vs upgrade
 
These two are often confused but do different things:
 
- **`sudo apt update`** — refreshes the local list of available packages and their versions from the repositories. Doesn't install or change anything — just updates the "catalog."
- **`sudo apt upgrade`** — actually installs newer versions of packages already on your system, based on that refreshed catalog.
 
**In practice, you always run them together:**
```
sudo apt update
sudo apt upgrade
```
Running `upgrade` without `update` first means you might be upgrading against an outdated catalog and missing the latest available versions.
 
---
 
## Part 6: sudo, Users & Switching
 
### What is `sudo`?
 
`sudo` (superuser do) lets a regular user run a single command with administrator (root) privileges, without permanently becoming the root user. It's the controlled, audited way to do admin-level tasks — instead of staying logged in as root all the time, which is risky.
 
### Creating a new user, giving them a password, and switching to them
 
Here's exactly what I ran:
 
```
https://github.com/DhirajRajpurohit/90DaysDevOpsChallenge/blob/687dc52eb74ddd2cd316f727ff04b6675793c40f/Linux/Day1/Practical%20Hand-on%20Images/Screenshot%202026-06-25%20160303.png
```
 
`useradd -m dhiraj -s /bin/bash` creates a new user named `dhiraj`, with `-m` creating their home directory automatically, and `-s /bin/bash` setting bash as their default shell.
 
`passwd dhiraj` sets a password for that user — prompts you to type and retype the new password.
 
Then, to actually switch into that user's session:
```
su dhiraj
```
`su` (switch user) logs you into another user's session — asks for that user's password before letting you in.
 
Here's the real run from my terminal:
```
ubuntu@ip-172-31-26-16:/home$ sudo useradd -m dhiraj -s /bin/bash
ubuntu@ip-172-31-26-16:/home$ sudo paswd dhiraj
sudo: 'paswd': command not found
ubuntu@ip-172-31-26-16:/home$ sudo passwd dhiraj
New password:
Retype new password:
passwd: password updated successfully
ubuntu@ip-172-31-26-16:/home$ su dhiraj
Password:
dhiraj@ip-172-31-26-16:/home$
```
 
**Observe:** I mistyped `passwd` as `paswd` first — Linux immediately said "command not found" instead of silently failing, so the typo was obvious right away. After correcting it, the password was set, and `su dhiraj` dropped me into that new user's shell — confirmed by the prompt changing from `ubuntu@...` to `dhiraj@...`.
 
![Creating a user, setting a password, and switching user](images/day3-useradd.png)
 
---
 
## Part 7: Deploying My First Web Page on Nginx
 
The capstone for the day — taking everything (commands, sudo, package management) and using it to actually serve a web page.
 
### Step 1 — Update package lists and install Nginx
```
sudo apt update
sudo apt install nginx -y
```
 
### Step 2 — Start and enable the service
```
sudo systemctl start nginx
sudo systemctl enable nginx
```
`start` runs it now; `enable` makes sure it starts automatically on every reboot.
 
### Step 3 — Check it's running
```
sudo systemctl status nginx
```
**Observe:** look for `active (running)` in the output.
 
### Step 4 — Replace the default page with your own
Nginx's default web page lives at `/var/www/html/index.html`:
```
sudo nano /var/www/html/index.html
```
Replace the content with your own simple HTML, save (`Ctrl+O`, `Enter`, then `Ctrl+X` in nano), and exit.
 
### Step 5 — View it in the browser
Open your VM's public IP in a browser — no port needed, since Nginx listens on port 80 by default:
```
http://<your-public-ip>
```
 
Here's mine, live — a small "DevOps Zero to Hero" progress tracker page:
 
![My deployed Nginx page](images/day3-nginx-deployed.png)
 
---
 
## Part 8: Real Scenarios — Symptom → Command → Fix
 
**Scenario A — "I ran a command and got 'command not found.'"**
- Almost always a typo (like `paswd` instead of `passwd` above) — re-check spelling first before assuming something deeper is broken.
 
**Scenario B — "I can't delete a folder, it says 'Directory not empty.'"**
- You used `rm -d` (or `rmdir`) on a non-empty folder. Either empty it first, or use `rm -rf <folder>` if you're sure you want everything inside it gone too.
 
**Scenario C — "I installed Nginx but the browser shows nothing."**
- Check the service is actually running: `sudo systemctl status nginx`.
- Check the VM's security group allows inbound traffic on port 80 — a common miss, since SSH (22) often gets opened but HTTP (80) gets forgotten.
- Check the process itself: `pidof nginx` — if nothing comes back, the service isn't actually running despite what `systemctl` might suggest.
 
**Scenario D — "I created a user but can't switch to them."**
- Confirm the password was actually set with `sudo passwd <username>` — if skipped, `su <username>` will reject any password you try.
 
**Scenario E — "A service seems stuck or unresponsive."**
- Find its process ID: `pidof <service>`.
- Check what it's doing: `top` or `ps aux`.
- If it won't respond to a normal stop, force it: `kill -9 <PID>`, then restart the service properly.
 
---
 
## Quick Reflection
 
- **Fastest way to confirm a typo vs. a real error:** Linux tells you immediately with "command not found" — read the error message before assuming the worst.
- **`rm -rf` has no undo** — always double check the path before running it.
- **A running service isn't the same as a reachable service** — Nginx can show `active (running)` and still be unreachable if the firewall/security group is blocking the port.
- **Process management commands (`ps`, `top`, `kill`) are your troubleshooting toolkit** once something is deployed and misbehaving.
 
