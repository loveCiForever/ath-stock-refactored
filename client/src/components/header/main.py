from flask import Flask, jsonify
from datetime import datetime
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


@app.route('/api/current-date-time', methods=['GET'])
def getCurrentDate():
    now = datetime.now()
    
    # Creating the current_time dictionary with formatted values using dictionary comprehension
    current_time = {
        'hour': f"{now.hour:02}",
        'minute': f"{now.minute:02}",
        'second': f"{now.second:02}",
        'date': f"{now.day:02}",
        'month': f"{now.month:02}",
        'year': now.year,  # Year remains as is
        'day': now.strftime('%A')  # Full name of the day (e.g., Monday)
    }
    
    return jsonify(current_time)

if __name__ == '__main__':
    app.run(debug=True)