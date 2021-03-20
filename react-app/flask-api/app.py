import time
from flask import Flask
from cassandra.cluster import Cluster
import json


cluster = Cluster(['34.71.38.163','34.69.92.195','35.225.100.34'])
session = cluster.connect('firstkeyspace')

app = Flask(__name__)

@app.route('/time')
def get_current_time():
    return {'time': time.time()}

@app.route('/data')
def get_temp_state():
     quer = "SELECT * FROM us_state_temp WHERE state='Colorado' LIMIT 2 ALLOW FILTERING;"
     data = session.execute(quer)
    
     desc = data.column_names
     column_names = [col for col in desc]
#     for row in data:
#         avg = row.average_temp
     res= [dict(zip(column_names, row))  
             for row in data]
#     json_object = json.dumps(res)   
     return {'result':res}
#    quer = "SELECT * FROM us_state_temp WHERE state='"+cond[0]+"'"
#    if (len(cond) == 1):
#        quer += " ALLOW FILTERING;"
#    elif (len(cond) == 2):
#        quer += " AND year="+str(cond[1])+" ALLOW FILTERING;"
#    else:
#        quer += " AND year>="+str(cond[1])+" AND year <="+str(cond[2])+" ALLOW FILTERING;"