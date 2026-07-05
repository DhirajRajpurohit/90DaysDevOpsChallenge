#!/bin/bash
<<info
This shell script will take backups

eg
./backup.sh <source> <dest>
info

src=$1
dest=$2

timestamp=$(date '+%Y-%m-%d-%H-%M')

zip -r "$dest/backup-$timestamp.zip" $src > /dev/null

aws s3 sync "$dest" s3://dsr-backups-d

echo "backup completed & uploaded to s3 "
