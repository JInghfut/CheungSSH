#!/bin/bash




while [ 1 ]
do
	sleep 600
	python /home/cheungssh/mysite/mysite/cheungssh/cheungssh_docker_admin.py  2>/dev/null  >/dev/null &
done &
pid="$!"
echo  $pid > /home/cheungssh/pid/docker_admin.pid


while [ 1 ]
do
	sleep 600
	python /home/cheungssh/mysite/mysite/cheungssh/assets/assets_controler.py  2>&1 >> /home/cheungssh/logs/assets.log &
done &
pid="$!"
echo  $pid > /home/cheungssh/pid/asset_admin.pid

while [ 1 ]
do
	sleep 600
	python /home/cheungssh/mysite/mysite/cheungssh/cheungssh_ssh_check.py  2&>/dev/null &
done &
pid="$!"
echo  $pid > /home/cheungssh/pid/server_status.pid
