#!/bin/bash
/bin/rm -r /issue/cheungssh/cheungssh/ 2>/dev/null
/bin/cp  -r /home/cheungssh /issue/cheungssh/
/bin/rm -r /issue/cheungssh/cheungssh/.ssh
find  /issue/cheungssh/cheungssh  -name "*bak*" -exec  /bin/rm -r {} \;
find  /issue/cheungssh/cheungssh         -name "*tar.gz" -exec  /bin/rm -r {} \;
find  /issue/cheungssh/cheungssh         -name "*tgz" -exec  /bin/rm -r {} \;
find  /issue/cheungssh/cheungssh -type d -name "*2016*" -exec  /bin/rm -r {} \;
find  /issue/cheungssh/cheungssh -type f -name '*pyc'  -exec  /bin/rm -r {} \;
find  /issue/cheungssh/cheungssh -type f -name '*zip' -exec  /bin/rm -r {} \;
find  /issue/cheungssh/cheungssh -type f -name '*py'  -exec  sed -i  's/
find  /issue/cheungssh/cheungssh -type f -name '*sh'  -exec  sed -i  's/
/bin/rm  -r /issue/cheungssh/cheungssh/logs/*
/bin/rm -r /issue/cheungssh/cheungssh/data/*
/bin/rm  -r /issue/cheungssh/cheungssh/pid/*
/bin/rm  -r /issue/cheungssh/cheungssh/download/*
/bin/rm  -r /issue/cheungssh/cheungssh/keyfile/*
/bin/rm  -r /issue/cheungssh/cheungssh/script/*
/bin/rm  -r /issue/cheungssh/cheungssh/upload/*
/bin/rm  -r /issue/cheungssh/cheungssh/conf/dump.rdb
/bin/rm  -r /issue/cheungssh/cheungssh/conf/*aof
/bin/rm  -r /issue/cheungssh/cheungssh/soft/*
/bin/rm  -r /issue/cheungssh/cheungssh/.sshd
/bin/rm  -r /issue/cheungssh/cheungssh/.bash_history
/bin/rm  -r /issue/cheungssh/cheungssh/.bash_logout
/bin/rm  -r /issue/cheungssh/cheungssh/.bash_profile
/bin/rm  -r /issue/cheungssh/cheungssh/.bashrc
/bin/rm  -r /issue/cheungssh/cheungssh/.mysql_history
/bin/rm  -r /issue/cheungssh/cheungssh/.viminfo
/bin/rm  -r /issue/cheungssh/cheungssh/httpd.conf
/bin/rm  -r /issue/cheungssh/cheungssh/.bash_history
/bin/rm  -r /issue/cheungssh/cheungssh/.bashrc
/bin/rm  -r /issue/cheungssh/cheungssh/.viminfo
/bin/rm  -r /issue/cheungssh/cheungssh/.mysql_history
cd /issue/cheungssh
filename=cheungssh_web3.0_source_`date +%F`.tar.gz
tar zcvf $filename cheungssh
echo "sz $filename"
