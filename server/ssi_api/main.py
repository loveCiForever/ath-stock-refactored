from flask import Flask, jsonify, request
from flask_cors import CORS
from ssi_fc_data.model import model
from ssi_fc_data.fc_md_client import MarketDataClient


import config as config
import json

from datetime import datetime, timedelta
import time

app = Flask(__name__)
CORS(app, origins='*')

client = MarketDataClient(config)

@app.route('/api/market_indices', methods=['GET'])
def get_daily_market_indices():
    try:
        # currentDate = datetime.now().strftime("%d-%m-%Y")
        yesterday = (datetime.now() - timedelta(days=1)).strftime("%d/%m/%Y")
        
        vnindex = client.daily_index(config, model.daily_index('123', 'vnindex', yesterday, yesterday, 1, 100, '', ''))
        time.sleep(5) 
        vn30 = client.daily_index(config, model.daily_index('123', 'vn30', yesterday, yesterday, 1, 100, '', ''))
        time.sleep(5) 
        hnxindex = client.daily_index(config, model.daily_index('123', 'hnxindex', yesterday, yesterday, 1, 100, '', ''))
        time.sleep(5) 
        hnx30 = client.daily_index(config, model.daily_index('123', 'hnx30', yesterday, yesterday, 1, 100, '', ''))
        time.sleep(5)
        
        # Return the response as JSON
        response = {
            'vnindex': vnindex,
            'vn30': vn30,
            'hnxindex': hnxindex,
            'hnx30': hnx30
        }
        
        return jsonify(response)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/currentdatetime', methods=['GET'])
def getCurrentDate():
    current_datetime = datetime.now().strftime("%d-%m-%Y %H:%M:%S")
    return jsonify({'current_datetime': current_datetime})


if __name__ == '__main__':
    app.run(debug=True)
    # print(getCurrentDate())