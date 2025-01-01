import os
from vnstock3 import Vnstock

tickers = ['ACB', 'FPT', 'VNM', 'VIC', 'VRE', 'ACV', 'AGR', 'BCG', 'BID']

directory = "DemoStocks\\"

vnstock = Vnstock()

for ticker in tickers:
    try:
        stock = Vnstock().stock(symbol=ticker, source='VCI')
        df = stock.quote.history(start='2024-01-01', end='2024-12-31', interval='1D')
        if df is not None and not df.empty:
            file_path = os.path.join(directory, ticker + ".csv")
            df.to_csv(file_path, index=False)
            print(f"Saved {ticker} to {file_path}")
        else:
            print(f"Failed to get {ticker}")
    except Exception as e:
        print(f"Failed to get {ticker} due to {e}")