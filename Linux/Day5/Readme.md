# Day 5 — Topics Covered

📦 **Module:** Storage | **Focus:** AWS EBS Volumes & Linux LVM


## ✅ Topics covered today

- **What is a Volume** — in Linux (raw block storage) vs AWS (EBS, network-attached virtual disk)
- **LVM core concepts**
  - Physical Volume (PV) — a disk marked as LVM-aware (`pvcreate`)
  - Volume Group (VG) — pooled capacity from multiple PVs (`vgcreate`)
  - Logical Volume (LV) — a resizable "virtual partition" carved from the VG (`lvcreate`)
- **Attaching an EBS volume to EC2** from the AWS Console (Volumes → Attach volume)
- **Detecting new disks on Linux** with `lsblk`
- **Building the LVM stack end-to-end**
  - `pvcreate` → `vgcreate` → `lvcreate` → `lvdisplay`
- **Formatting & mounting** a Logical Volume (`mkfs.ext4`, `mount`)
- **Proving data persistence** — writing a file, `umount`, confirming it "disappears," then `mount` again to get it back
- **Managing an EBS volume directly (without LVM)** — formatting and mounting `xvdh` on its own, and seeing why that's less flexible than the LVM path
- **Dynamic storage management** — growing a live Logical Volume with `lvextend` (10 GiB → 15 GiB) with zero downtime
- **Creating & attaching new EBS volumes** from the AWS Console (Create volume → Attach volume)

## 🖼️ Visuals

- `lvm-architecture.png` — PV → VG → LV flow, plus the direct-attached comparison
- `day6-poster.png` — cover/poster graphic summarizing the day's commands

## 🔑 Key takeaway

LVM trades a bit of upfront setup for the ability to resize storage live later (`lvextend`) — something a directly-formatted disk can't do without downtime and data migration.
