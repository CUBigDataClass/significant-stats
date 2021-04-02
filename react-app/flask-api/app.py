import time
from flask import Flask, send_from_directory
from flask_restful import Api, Resource, reqparse
from HelloApiHandler import HelloApiHandler
from cassandra.cluster import Cluster


cluster = Cluster(['34.71.38.163','34.69.92.195','35.225.100.34'])
session = cluster.connect('firstkeyspace')

app = Flask(__name__, static_url_path='', static_folder='frontend/build')
api = Api(app)

@app.route("/", defaults={'path':''})
def serve(path):
    return send_from_directory(app.static_folder,'../frontend/build/index.html')

api.add_resource(HelloApiHandler, '/flask/hello')

@app.route('/time')
def get_current_time():
    return {'time': time.time()}

@app.route('/state_temp/<state>/<startYear>/<endYear>')
def get_state_temp(state,startYear,endYear):
     quer = "SELECT * FROM us_state_temp WHERE state='"+state+"' AND year>="+startYear+" AND year<="+endYear+" ALLOW FILTERING;"
     data = session.execute(quer)

     desc = data.column_names
     column_names = [col for col in desc]
     res= [dict(zip(column_names, row))
             for row in data]

     return {'result':res}

@app.route('/country_temp/<country>/<startYear>/<endYear>')
def get_country_temp(country,startYear,endYear):
     quer = "SELECT * FROM global_land_temp WHERE country='"+country+"' AND year>="+startYear+" AND year<="+endYear+" ALLOW FILTERING;"
     data = session.execute(quer)

     desc = data.column_names
     column_names = [col for col in desc]

     res= [dict(zip(column_names, row))
             for row in data]

     return {'result':res}

@app.route('/country_start_year/<country>')
def get_country_start_year(country):
     quer = "SELECT year FROM global_land_temp WHERE country='"+country+"' LIMIT 1 ALLOW FILTERING;"
     data = session.execute(quer)

     desc = data.column_names
     column_names = [col for col in desc]

     res= [dict(zip(column_names, row))
             for row in data]

     return {'result':res}
