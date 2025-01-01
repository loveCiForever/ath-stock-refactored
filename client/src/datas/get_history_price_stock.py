import os
import json
from vnstock3 import Vnstock

tickers = ['ACB']

directory = "DemoStocks\\"

vnstock = Vnstock()

for ticker in tickers:
    try:
        stock = Vnstock().stock(symbol=ticker, source='VCI')
        df = stock.quote.history(start='2024-01-01', end='2024-12-31', interval='1D')
        if df is not None and not df.empty:
            df.reset_index(inplace=True)
            df['time'] = df['time'].dt.strftime('%Y-%m-%d')
            
            file_path = os.path.join(directory, ticker + ".json")

            data = df.to_dict(orient='records')
            with open(file_path, 'w') as json_file:
                json.dump(data, json_file, indent=4)
                
            print(f"Saved {ticker} to {file_path}")
        else:
            print(f"Failed to get {ticker}")
    except Exception as e:
        print(f"Failed to get {ticker} due to {e}")
        
        