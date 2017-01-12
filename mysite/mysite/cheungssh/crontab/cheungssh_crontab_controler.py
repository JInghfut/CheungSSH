#!/usr/bin/env python
#coding:utf-8
#Author: Cheung Kei-Chuen CheungSSH 张其川
import paramiko,re,socket,os,sys,json,time
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "mysite.settings")
sys.path.append('/home/cheungssh/mysite')
sys.path.append('/home/cheungssh/mysite/mysite/cheungssh')
from cheungssh_error import CheungSSHError
import cheungssh_settings
from django.core.cache import cache
REDIS=cache.master_client
from cheungssh_thread_queue import CheungSSHPool
from cheungssh_crontab import 	CheungSSHCrontab
class CheungSSHCrontabControler(object):
	def __init__(self):
		pass
	def get_all_server_data(self):
		#server_config.objects.all()
		
		servers_list=REDIS.lrange("servers.config.list",0,-1)
		
		tmp=[]
		for line in servers_list:
			line=json.loads(line)
			tmp.append(line)
		
		return tmp
	def run(self):
		
		data=self.get_all_server_data()
		pool=CheungSSHPool()
		for server_conf in data:
			pool.add_task(self.start_collect,server_conf)
		pool.all_complete()
	def start_collect(self,**server_conf):
		self.all_crontab_data={}
		a=CheungSSHCrontab()
		data=a.get_crontab_list(server_conf)
		print data["content"],server_conf["alias"]
		
		
		
		
if __name__=='__main__':
	A=CheungSSHCrontabControler()
	A.run()
