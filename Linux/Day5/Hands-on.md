Day 5 – AWS EBS Volumes & Linux LVM (Physical Volume, Volume Group, Logical Volume)


Table of Content

LVM Architecture

What is a Volume? 

Physical Volume, Volume Group, Logical Volume — Concepts

Step 1: Attaching an EBS Volume from AWS

Step 2: Detecting the New Disks on Linux

Step 3: Creating Physical Volumes

Step 4: Creating the Volume Group

Step 5: Creating the Logical Volume

Step 6: Formatting and Mounting the Logical Volume

Step 7: Proving Data Persistence (Unmount / Remount)

Step 8: Managing a 3rd EBS Volume Directly (No LVM)

Step 9: Dynamic Storage Management — Extending the LV
Reflection

LVM Architecture

![image alt](https://github.com/DhirajRajpurohit/90DaysDevOpsChallenge/blob/f11911acc6e5efe0bd34412f2b871175efa26cc5/Linux/Day5/Practical_Images/architectiure.png)

Before touching a single command, here's the big picture of what we're building today — three raw EBS volumes turned into pooled, resizable Linux storage, plus one volume managed the "simple but rigid" way:




The left path (xvdf + xvdg) is what most of today's lab is about: Physical Volume → Volume Group → Logical Volume. The right path (xvdh) is the same disk, but used the old-fashioned way — no LVM, no pooling, no easy resizing.

What is a Volume?
In Linux, a volume is just block storage — a disk (or a partition of one) that you can format with a filesystem and mount somewhere in the directory tree.

In AWS, an EBS (Elastic Block Store) volume is that same idea, but virtual: a network-attached disk you create in the console and attach to an EC2 instance. Once attached, the instance sees it as a normal block device (e.g. /dev/xvdf), and from that point on, Linux doesn't really care whether it's a physical disk or a cloud-backed one.

Physical Volume, Volume Group, Logical Volume — Concepts
LVM (Logical Volume Manager) sits between raw disks and filesystems, adding a flexible layer in between:

Physical Volume (PV) — a raw disk or partition that's been marked as available for LVM (pvcreate). It's the raw building block.
Volume Group (VG) — one or more Physical Volumes pooled together into a single chunk of storage capacity (vgcreate). Think of it as a shared pool of disk space.
Logical Volume (LV) — a "virtual partition" carved out of that pool (lvcreate). This is what actually gets formatted with a filesystem and mounted.

Why bother with this extra layer instead of just formatting a disk directly? 

Because an LV can be resized later (lvextend) by pulling more space from the VG — without caring which physical disk that space comes from. A directly-formatted disk can't do that; it's stuck at whatever size it was created with.

Step 1: Attaching an EBS Volume from AWS
In the AWS Console: EC2 → Volumes → select volume → Attach volume.

Volume ID: vol-0f9d2ab06288a856e
Availability Zone: use1-az4 (us-east-1a)
Instance: i-0f4ebcc82ff735369
Device name: /dev/sdh

![image alt](https://github.com/DhirajRajpurohit/90DaysDevOpsChallenge/blob/f11911acc6e5efe0bd34412f2b871175efa26cc5/Linux/Day5/Practical_Images/Screenshot%202026-06-28%20142553.png )

 ![image alt](https://github.com/DhirajRajpurohit/90DaysDevOpsChallenge/blob/f11911acc6e5efe0bd34412f2b871175efa26cc5/Linux/Day5/Practical_Images/Screenshot%202026-06-28%20143412.png )

AWS maps the device name you choose (/dev/sdh) to whatever name the OS actually assigns (commonly /dev/xvdh on these instance types).

Step 2: Detecting the New Disks on Linux




lsblk
 
![image alt](https://github.com/DhirajRajpurohit/90DaysDevOpsChallenge/blob/f11911acc6e5efe0bd34412f2b871175efa26cc5/Linux/Day5/Practical_Images/Screenshot%202026-06-28%20143749.png)




Observation: Three new disks — xvdf (10G), xvdg (12G), xvdh (14G) — show up as raw, unformatted disks. No partitions, no filesystem, no mount points yet.

Step 3: Creating Physical Volumes

![image alt](https://github.com/DhirajRajpurohit/90DaysDevOpsChallenge/blob/f11911acc6e5efe0bd34412f2b871175efa26cc5/Linux/Day5/Practical_Images/Screenshot%202026-06-28%20144653.png )


 

Step 4: Creating the Volume Group

![image alt](https://github.com/DhirajRajpurohit/90DaysDevOpsChallenge/blob/f11911acc6e5efe0bd34412f2b871175efa26cc5/Linux/Day5/Practical_Images/Screenshot%202026-06-28%20144847.png)

vgcreate tws_vg /dev/xvdf /dev/xvdg 


vgs 
VG      #PV #LV #SN Attr   VSize  VFree
tws_vg    2   0   0 wz--n- 21.99g 21.99g 
  
Observation: xvdf (10G) and xvdg (12G) are now pooled into one Volume Group, tws_vg, with 21.99 GiB of usable space. Note xvdh was deliberately left out — that one is going down the "direct-attached, no LVM" path later.

Step 5: Creating the Logical Volume


![image alt](https://github.com/DhirajRajpurohit/90DaysDevOpsChallenge/blob/f11911acc6e5efe0bd34412f2b871175efa26cc5/Linux/Day5/Practical_Images/Screenshot%202026-06-28%20145206.png)

lvcreate -L 10G -n tws_lv tws_vg 
 Logical volume "tws_lv" created. 
![image alt](https://github.com/DhirajRajpurohit/90DaysDevOpsChallenge/blob/f11911acc6e5efe0bd34412f2b871175efa26cc5/Linux/Day5/Practical_Images/Screenshot%202026-06-28%20145243.png)


![image alt](https://github.com/DhirajRajpurohit/90DaysDevOpsChallenge/blob/f11911acc6e5efe0bd34412f2b871175efa26cc5/Linux/Day5/Practical_Images/Screenshot%202026-06-28%20145354.png)


Observation: A 10 GiB Logical Volume, tws_lv, has been carved out of the 21.99 GiB tws_vg pool — leaving ~12 GiB still free in the VG for later.

Step 6: Formatting and Mounting the Logical Volume

![image alt](https://github.com/DhirajRajpurohit/90DaysDevOpsChallenge/blob/f11911acc6e5efe0bd34412f2b871175efa26cc5/Linux/Day5/Practical_Images/Screenshot%202026-06-28%20150201.png)




mkdir /mnt/tws_lv_mount
mkfs.ext4 /dev/tws_vg/tws_lv
mount /dev/tws_vg/tws_lv /mnt/tws_lv_mount 
![image alt](https://github.com/DhirajRajpurohit/90DaysDevOpsChallenge/blob/f11911acc6e5efe0bd34412f2b871175efa26cc5/Linux/Day5/Practical_Images/Screenshot%202026-06-28%20150228.png)


Filesystem                Size  Used Avail Use% Mounted on
/dev/mapper/tws_vg-tws_lv  9.8G  2.1M  9.3G   1% /mnt/tws_lv_mount 
Observation: The Logical Volume is now a real, mounted ext4 filesystem — ready to store data like any other directory.

![image alt](https://github.com/DhirajRajpurohit/90DaysDevOpsChallenge/blob/f11911acc6e5efe0bd34412f2b871175efa26cc5/Linux/Day5/Practical_Images/Screenshot%202026-06-28%20150509.png)

![image alt](https://github.com/DhirajRajpurohit/90DaysDevOpsChallenge/blob/f11911acc6e5efe0bd34412f2b871175efa26cc5/Linux/Day5/Practical_Images/Screenshot%202026-06-28%20150848.png)


cd /mnt/tws_lv_mount
mkdir Devops
cd Devops
touch hello.txt 
cat /mnt/tws_lv_mount/Devops/hello.txt 
Hii Everyone
Kaiseh ho Aap Sabhi 

Step 7: Proving Data Persistence (Unmount / Remount)


![image alt](https://github.com/DhirajRajpurohit/90DaysDevOpsChallenge/blob/f11911acc6e5efe0bd34412f2b871175efa26cc5/Linux/Day5/Practical_Images/Screenshot%202026-06-28%20151234.png)



umount /mnt/tws_lv_mount

cat /mnt/tws_lv_mount/Devops/hello.txt 

cat: /mnt/tws_lv_mount/Devops/hello.txt: No such file or directory 

Observation: Once unmounted, the mount point is just an empty local directory again — the data isn't gone, it's just not visible until the LV is mounted back.





Step 8: Managing a 3rd EBS Volume Directly (No LVM)

This is the "direct-attached" path from the architecture diagram — xvdh skips PV/VG/LV entirely and gets formatted on its own:

![image alt](https://github.com/DhirajRajpurohit/90DaysDevOpsChallenge/blob/f11911acc6e5efe0bd34412f2b871175efa26cc5/Linux/Day5/Practical_Images/Screenshot%202026-06-28%20151746.png)



... 

Note: xvdh still had its earlier PV signature from Step 3 (pvcreate had touched it too), so mkfs warns before overwriting it. Answering y wipes that signature and formats it as a plain ext4 disk instead.

![image alt](https://github.com/DhirajRajpurohit/90DaysDevOpsChallenge/blob/f11911acc6e5efe0bd34412f2b871175efa26cc5/Linux/Day5/Practical_Images/Screenshot%202026-06-28%20151847.png)


mount /dev/xvdh /mnt/tws_disk_mount
df -h 
Filesystem                Size  Used Avail Use% Mounted on
/dev/mapper/tws_vg-tws_lv  9.8G  2.1M  9.3G   1% /mnt/tws_lv_mount
/dev/xvdh                   14G  2.1M   13G   1% /mnt/tws_disk_mount 

Observation: xvdh is now mounted directly — simple and fast to set up, but it can never be resized without detaching/reattaching a bigger volume and migrating the data. Compare that to tws_lv below.

Step 9: Dynamic Storage Management — Extending the LV

![image alt](https://github.com/DhirajRajpurohit/90DaysDevOpsChallenge/blob/f11911acc6e5efe0bd34412f2b871175efa26cc5/Linux/Day5/Practical_Images/Screenshot%202026-06-28%20152450.png)

![image alt](https://github.com/DhirajRajpurohit/90DaysDevOpsChallenge/blob/f11911acc6e5efe0bd34412f2b871175efa26cc5/Linux/Day5/Practical_Images/Screenshot%202026-06-28%20152527.png)


lvextend -L +5G -n /dev/tws_vg/tws_lv 
 
Observation: tws_lv grew from 10 GiB to 15 GiB without unmounting it or touching the application using it — pulling the extra 5 GiB straight from the free space still sitting in tws_vg. This is exactly the flexibility a directly-formatted disk (like xvdh) doesn't have.

In a production setup, the next step would normally be resize2fs /dev/tws_vg/tws_lv so the ext4 filesystem itself grows to match the new LV size — lvextend only resizes the block device, not the filesystem on top of it.
