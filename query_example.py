# -*- coding: utf-8 -*-
"""
Created on Wed Mar 10 10:30:18 2021

@author: narut
"""

from cassandra.cluster import Cluster

cluster = Cluster(['34.71.38.163','34.69.92.195','35.225.100.34'])
session = cluster.connect('firstkeyspace')
quer1 = "SELECT * FROM landtemp WHERE country='Japan' LIMIT 1 ALLOW FILTERING"
rows = session.execute(quer1)
for user_row in rows:
    print(user_row.average_temp)
    
quer1 = "SELECT * FROM us_state_temp WHERE state='Colorado' LIMIT 1 ALLOW FILTERING"
rows = session.execute(quer1)
for user_row in rows:
    print(user_row)