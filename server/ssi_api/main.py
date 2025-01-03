from flask import Flask, jsonify, request
from flask_cors import CORS
from ssi_fc_data.model import model
from ssi_fc_data.fc_md_client import MarketDataClient

from pymongo import MongoClient
from bson.objectid import ObjectId

import config as config
import json
import requests

from datetime import datetime, timedelta
import time

app = Flask(__name__)
CORS(app, origins='*')

mongo_client = MongoClient("mongodb://localhost:27017/")
db = mongo_client['market_data']
collection = db['market_indices']

mongo_client = MongoClient()
db = mongo_client['market_data']
collection = db['market_indices']

data_client = MarketDataClient(config)

def fetch_with_retry(index_id, fromDate, toDate):
    while True:
        try:
            response = data_client.daily_index(config, model.daily_index('123', index_id, fromDate, toDate, 1, 100, '', ''))
            if response.get('status') == "Success":
                return response
            else:
                print(f"Failed to fetch {index_id}: {response.get('message')}. Retrying...")
        except Exception as e:
            print(f"Error fetching {index_id}: {str(e)}. Retrying...")
        
        time.sleep(2)  
     
@app.route('/api/update_market_indices/<string:object_id>', methods=['PUT'])   
def update_market_indices(object_id):
    data = request.json
    result = collection.update_one(
        {"_id": ObjectId(object_id)},
        {"$set": data}
    )
    
    if result.modified_count > 0:
        return jsonify({"message": "Market indices updated successfully"}), 200
    else:
        return jsonify({"message": "Market indices not updated"}), 400
    

def fetch_daily_market_indices():
    # currentDate = datetime.now().strftime("%d-%m-%Y")
    yesterday = (datetime.now() - timedelta(days=1)).strftime("%d/%m/%Y")
    
    fromDate = '30/08/2002'
    # toDate = datetime.now().strftime("%d/%m/%Y")
    toDate = '10/09/2002'
    
    vnindex = fetch_with_retry('vnindex', fromDate, toDate)
    vn30 = fetch_with_retry('vn30', fromDate, toDate)
    hnxindex = fetch_with_retry('hnxindex', fromDate, toDate)
    hnx30 = fetch_with_retry('hnx30', fromDate, toDate)
    
    # Return the response as JSON
    response = {
        'vnindex': vnindex,
        'vn30': vn30,
        'hnxindex': hnxindex,
        'hnx30': hnx30
    }
    
    collection.insert_one(response)
    # return jsonify(response)
    print(response)



@app.route('/api/currentdatetime', methods=['GET'])
def getCurrentDate():
    current_datetime = datetime.now().strftime("%d-%m-%Y %H:%M:%S")
    return jsonify({'current_datetime': current_datetime})


if __name__ == '__main__':
    # app.run(debug=True)
    # print(getCurrentDate())
    fetch_daily_market_indices()