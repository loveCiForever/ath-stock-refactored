import os
from vnstock3 import Vnstock

tickers = ['ACB', 'FPT', 'VNM', 'VIC', 'VRE', 'ACV', 'AGR', 'BCG', 'BID']

directory = "\\DemoStocks\\"

vnstock = Vnstock()

for ticker in tickers:
    try:
        data = vnstock.get_price(ticker)
        if data is not None and not data.empty:
            file_path = os.path.join(directory, ticker + ".csv")
            data.to_csv(file_path)
            print(f"Saved {ticker} to {file_path}")
        else:
            print(f"Failed to get {ticker}")
    except Exception as e:
        print(f"Failed to get {ticker} due to {e}")