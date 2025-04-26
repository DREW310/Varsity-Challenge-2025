# Financial Intent Analyzer

This Python application uses GPT models to extract financial-related intents from text and perform sentiment analysis for detecting urgency in financial communications.

## Features

- Financial intent extraction using GPT-3.5
- Sentiment analysis for urgency detection
- Combined analysis of financial intents and urgency levels
- Modern web interface for easy interaction
- Support for various financial categories including:
  - Direct financial actions and expenditures
  - Financial commitments and obligations
  - Revenue-related intents
  - Financial alerts and suggestions
  - Budget planning and cash flow analysis

## Setup

1. Clone the repository:
```bash
git clone https://github.com/yourusername/Financial-Intent-Analyzer.git
cd Financial-Intent-Analyzer
```

2. Install the required dependencies:

For the Python backend:
```bash
pip install -r requirements.txt
```

For the React frontend:
```bash
npm install
```

3. Create a `.env` file in the project root and add your OpenAI API key:
```
OPENAI_API_KEY=your_api_key_here
```

## Running the Application

### Backend Server
Start the Python backend server:
```bash
python api_server.py
```
The backend server will run on `http://localhost:5000`

### Frontend Development Server
In a new terminal, start the React development server:
```bash
npm start
```
The frontend will be available at `http://localhost:3000`

## Usage

### Web Interface
1. Open your browser and navigate to `http://localhost:3000`
2. Enter or paste your financial text in the input area
3. Click "Analyze" to process the text
4. View the detailed analysis results including:
   - Financial intents and their urgency levels
   - Sentiment analysis
   - Action items and recommendations
   - Visual charts and summaries

### Python Library
You can also use the analyzer directly in your Python code:
```python
from financial_intent_analyzer import FinancialIntentAnalyzer

# Initialize the analyzer
analyzer = FinancialIntentAnalyzer()

# Analyze text
text = "I need to transfer $5,000 to my savings account immediately. This is urgent as I have a payment due tomorrow."
results = analyzer.analyze_financial_text(text)

# Print results
print(results)
```

## Output Format

The analyzer returns a dictionary with two main components:

1. `financial_intents`: Contains detailed financial analysis including:
   - `detected_intents`: List of financial intents with descriptions, urgency levels, and scores
   - `confidence_score`: Overall confidence in the analysis
   - `relevant_details`: Specific details mentioned in the text
   - `financial_topics`: List of financial topics identified
   - `action_items`: List of financial actions needed
   - `expenditures`: List of identified expenditures with amounts and timelines
   - `revenue_actions`: List of revenue-related actions
   - `alerts`: List of financial alerts with severity and recommendations
   - `suggestions`: List of financial suggestions with benefits and priorities

2. `urgency_analysis`: Contains sentiment analysis and urgency level assessment:
   - `sentiment`: Overall sentiment (POSITIVE/NEGATIVE)
   - `urgency_level`: Overall urgency level (low/medium/high)
   - `confidence_score`: Confidence in urgency assessment
   - `key_indicators`: List of key indicators that influenced the urgency assessment

## Example Output

```json
{
    "financial_intents": {
        "detected_intents": [
            {
                "description": "Need to transfer $5,000 to savings account",
                "urgency_level": "high",
                "urgency_score": 0.95,
                "timeline": "immediately",
                "impact": "Payment due tomorrow"
            }
        ],
        "confidence_score": 0.95,
        "relevant_details": "Transfer amount: $5,000, Account type: savings",
        "financial_topics": ["Account transfer", "Payment deadline"],
        "action_items": ["Complete transfer immediately"],
        "expenditures": [
            {
                "type": "Account transfer",
                "amount": "$5,000",
                "timeline": "immediately",
                "description": "Transfer to savings account"
            }
        ],
        "revenue_actions": [],
        "alerts": [
            {
                "message": "Payment due tomorrow",
                "severity": "high",
                "impact": "Potential late payment if transfer not completed",
                "recommendation": "Complete transfer immediately"
            }
        ],
        "suggestions": []
    },
    "urgency_analysis": {
        "sentiment": "NEGATIVE",
        "urgency_level": "high",
        "confidence_score": 0.92,
        "key_indicators": ["immediately", "urgent", "payment due tomorrow"]
    }
}
```

## Requirements

- Python 3.8+
- Node.js 14+ (for the web interface)
- OpenAI API key
- Internet connection for API calls
- Dependencies listed in `requirements.txt`:
  - openai==0.28.1
  - python-dotenv==1.0.0
  - numpy==1.24.3
  - pandas==2.0.3
  - flask
  - flask-cors

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details. 