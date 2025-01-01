import os
import json

def save_csv_filenames_to_json(directory, output_json_file):
    csv_files = []

    for filename in os.listdir(directory):
        if filename.endswith('.csv'):
            csv_files.append(filename)

    data = {'files': csv_files}

    with open(output_json_file, 'w') as json_file:
        json.dump(data, json_file, indent=4)

    print(f'Successfully saved {len(csv_files)} CSV file names to {output_json_file}')

csv_directory = 'DemoStocks\\'
output_json = csv_directory +'list_csv_file_name.json'

save_csv_filenames_to_json(csv_directory, output_json)