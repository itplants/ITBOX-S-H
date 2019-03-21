#!/bin/sh
 cat PID.txt |awk '{NR==1;print("sudo kill ",$2)}'|sh
cd /home/sakaguti/MRAA/SPECT2
 cat PID.txt |awk '{NR==1;print("sudo kill ",$2)}'|sh

