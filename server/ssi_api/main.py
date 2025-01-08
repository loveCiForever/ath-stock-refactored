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

market_data_client = MarketDataClient(config)

@app.route('/api/market_daily_index', methods=['GET'])
def get_daily_market_indices():
    try:
        # currentDate = datetime.now().strftime("%d-%m-%Y")
        yesterday = (datetime.now() - timedelta(days=1)).strftime("%d/%m/%Y")
        
        vnindex = market_data_client.daily_index(config, model.daily_index('123', 'vnindex', yesterday, yesterday, 1, 100, '', ''))
        time.sleep(5) 
        vn30 = market_data_client.daily_index(config, model.daily_index('123', 'vn30', yesterday, yesterday, 1, 100, '', ''))
        time.sleep(5) 
        hnxindex = market_data_client.daily_index(config, model.daily_index('123', 'hnxindex', yesterday, yesterday, 1, 100, '', ''))
        time.sleep(5) 
        hnx30 = market_data_client.daily_index(config, model.daily_index('123', 'hnx30', yesterday, yesterday, 1, 100, '', ''))
        time.sleep(5)

        response = {
            'vnindex': vnindex,
            'vn30': vn30,
            'hnxindex': hnxindex,
            'hnx30': hnx30
        }
        
        return jsonify(response)
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/api/stock_price', methods=['GET'])
def get_stock_price():
    # tickers = ['VIC', 'ACB', 'FPT', 'BID', 'SSI', 'VIB', 'CTG']
    # for ticker in ticker:
    try:
        yesterday = (datetime.now() - timedelta(days=1)).strftime("%d/%m/%Y")
        # date_from = '20/12/2024'
        # date_end = '21/12/2024'
        
        date_from = yesterday
        date_end = yesterday
        
        vic = market_data_client.daily_ohlc(config, model.daily_ohlc('vic', date_from, date_end, 1, 100, True))
        time.sleep(5)
        acb = market_data_client.daily_ohlc(config, model.daily_ohlc('acb', date_from, date_end, 1, 100, True))
        time.sleep(5)
        fpt = market_data_client.daily_ohlc(config, model.daily_ohlc('fpt', date_from, date_end, 1, 100, True))
        time.sleep(5)
        bid = market_data_client.daily_ohlc(config, model.daily_ohlc('bid', date_from, date_end, 1, 100, True))
        time.sleep(5)
        ssi = market_data_client.daily_ohlc(config, model.daily_ohlc('ssi', date_from, date_end, 1, 100, True))
        time.sleep(5)
        vib = market_data_client.daily_ohlc(config, model.daily_ohlc('vib', date_from, date_end, 1, 100, True))
        time.sleep(5)
        ctg = market_data_client.daily_ohlc(config, model.daily_ohlc('ctg', date_from, date_end, 1, 100, True))
        time.sleep(5)
        
        
        response = {
            'vic': vic,
            'acb': acb,
            'fpt': fpt,
            'bid': bid,
            'ssi': ssi,
            'vib': vib,
            'ctg': ctg
        }
        
        return jsonify(response)
        # print(response)
    except Exception as e:
        return jsonify({'error': str(e)}), 500



@app.route('/api/current_date_time', methods=['GET'])
def getCurrentDate():
    current_datetime = datetime.now()
    
    response_data = {
        'year': current_datetime.year,
        'month': str(current_datetime.month).zfill(2),  
        'date': str(current_datetime.day).zfill(2),     
        'hour': str(current_datetime.hour).zfill(2), 
        'minute': str(current_datetime.minute).zfill(2),
        'second': str(current_datetime.second).zfill(2),
        'day': current_datetime.strftime('%A')           
    }
    
    return jsonify(response_data)

if __name__ == '__main__':
    app.run(debug=True)
    # get_daily_olhc()