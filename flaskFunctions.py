# -*- coding: utf-8 -*-
"""
Created on Wed Mar 17 09:36:40 2021

@author: narut
"""

from cassandra.cluster import Cluster


cluster = Cluster(['34.71.38.163','34.69.92.195','35.225.100.34'])
session = cluster.connect('firstkeyspace')


#NOT DONE WITH COUNTRY
def getCountryTemp(country):
    quer1 = "SELECT * FROM landtemp WHERE country='" + country + "' LIMIT 1 ALLOW FILTERING;"
    data = session.execute(quer1)
    
    desc = data.column_names
    column_names = [col for col in desc]
    res= [dict(zip(column_names, row))  
            for row in data]
    return (res)

def getStateTemp(cond):
    quer = "SELECT * FROM us_state_temp WHERE state='"+cond[0]+"'"
    if (len(cond) == 1):
        quer += " ALLOW FILTERING;"
    elif (len(cond) == 2):
        quer += " AND year="+str(cond[1])+" ALLOW FILTERING;"
    else:
        quer += " AND year>="+str(cond[1])+" AND year <="+str(cond[2])+" ALLOW FILTERING;"
    data = session.execute(quer)
    
    desc = data.column_names
    column_names = [col for col in desc]
    res= [dict(zip(column_names, row))  
            for row in data]
    return (res)

def main():
    print(getStateTemp(['Colorado',1900,2000]))
#    print(getStateTemp(['Colorado',]))

if __name__ == "__main__":
    main()