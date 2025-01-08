# import ssi_fc_trading
from http.client import responses

from ssi_fc_data import fc_md_client , model
import config
import json


client = fc_md_client.MarketDataClient(config)
def md_access_token():
	print(client.access_token(model.accessToken(config.consumerID, config.consumerSecret)))

def md_get_securities_list():
    req = model.securities('HNX', 1,100)
    response = client.securities(config, req)
    print('type of output:', type(response))
    print(json.dumps(response, indent=4, ensure_ascii=False))


def md_get_securities_details():
    try:
        req = model.securities_details('HOSE', 'VPB', 1, 100)
        response = client.securities_details(config, req)
        print(json.dumps(response, indent=4, ensure_ascii=False))
    except Exception as e:
        print(e)

def md_get_index_components():
    response =  client.index_components(config, model.index_components('vn100', 1, 100))
    print(json.dumps(response, indent=4, ensure_ascii=False))

def md_get_index_list():
    symbol = input("enter symbol HOSE,HNX or (EMPTY): ")
    response = client.index_list(config, model.index_list(symbol, 1, 100))
    print(json.dumps(response, indent=4, ensure_ascii=False))

def md_get_daily_OHLC():
    response = client.daily_ohlc(config, model.daily_ohlc('ACC', '11/10/2024', '12/10/2024', 1, 100, True))
    print(json.dumps(response, indent=4, ensure_ascii=False))

def md_get_intraday_OHLC():
    response = client.intraday_ohlc(config, model.intraday_ohlc('fpt', '15/10/2020', '15/10/2020', 1, 100, True, 1))
    print(json.dumps(response, indent=4, ensure_ascii=False))

def md_get_daily_index():
    symbol = input("enter symbol HOSE,HNX or (EMPTY): ")
    response = client.daily_index(config, model.daily_index( '123', symbol, '02/01/2025', '02/01/2025', 1, 100, '', ''))
    print(json.dumps(response, indent=4, ensure_ascii=False))

def md_get_stock_price():
    response = client.daily_stock_price(config, model.daily_stock_price ('ACC', '11/10/2024', '12/10/2024', 1, 100, 'hose'))
    print(json.dumps(response, indent=4, ensure_ascii=False))


    # "data": [
    #     {
    #         "Symbol": "ACC",
    #         "Market": "HOSE",
    #         "TradingDate": "11/10/2024",
    #         "Time": null,
    #         "Open": "14150",
    #         "High": "14200",
    #         "Low": "13900",
    #         "Close": "13900",
    #         "Volume": "81400",
    #         "Value": "1140130000"
    #     }
    # ],
    
def main():
    
    while True:
        print('11  - Securities List')
        print('12  - Securities Details')
        print('13  - Index Components')
        print('14  - Index List')
        print('15  - Daily OHLC')
        print('16  - Intraday OHLC')
        print('17  - Daily index')
        print('18  - Stock price')
        value = input('Enter your choice: ')

        if value == '11':
            md_get_securities_list()
        elif value == '12':
            md_get_securities_details()
        elif value == '13':
            md_get_index_components()
        elif value == '14':
            md_get_index_list()
        elif value == '15':
            md_get_daily_OHLC()
        elif value == '16':
            md_get_intraday_OHLC()
        elif value == '17':
            md_get_daily_index()
        elif value == '18':
            md_get_stock_price()

if __name__ == '__main__':
	main()