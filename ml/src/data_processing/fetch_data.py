from vnstock3 import Vnstock
import pandas as pd
import os
def fetch_stock_data(symbols, start_date, end_date, save_path):
    # Download data from 
    stock = Vnstock().stock(symbol='ACB', source='VCI')
    df = stock.quote.history(start=start_date, end=end_date, interval='1D')

    if df.empty:
        print(f"Can't find {symbols}.")
        return None

    os.makedirs(os.path.dirname(save_path), exist_ok=True)
    df.to_csv(save_path)
    return df

if __name__ == "__main__":
    symbols = "ACB"  # stock symbols
    start_date = "2020-01-01"
    end_date = "2023-01-01"
    save_path = f"./data/raw/{symbols}_stock_data.csv"

    # collect data
    stock_data = fetch_stock_data(symbols, start_date, end_date, save_path)
    print(stock_data.head())
