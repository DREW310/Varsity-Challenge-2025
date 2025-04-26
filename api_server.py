from flask import Flask, request, jsonify
from financial_intent_analyzer import FinancialIntentAnalyzer
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Allow frontend to call this API

analyzer = FinancialIntentAnalyzer()

@app.route('/api/analyze', methods=['POST'])
def analyze():
    data = request.get_json()
    text = data.get('text', '')
    result = analyzer.analyze_financial_text(text)
    return jsonify(result)

if __name__ == '__main__':
    app.run(port=5000, debug=True)