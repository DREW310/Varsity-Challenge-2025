# Financial Intent Analyzer

This Python application uses GPT models to extract financial-related intents from text and perform sentiment analysis for detecting urgency in financial communications.

## Features

- Financial intent extraction using GPT-3.5
- Sentiment analysis for urgency detection
- Combined analysis of financial intents and urgency levels
- Support for various financial categories including:
  - Investment intent
  - Loan request
  - Payment issues
  - Account inquiries
  - Financial advice
  - Transaction requests
  - Budget planning
  - Other financial concerns

## Setup

1. Install the required dependencies:
```bash
pip install -r requirements.txt
```

2. Create a `.env` file in the project root and add your OpenAI API key:
```
OPENAI_API_KEY=your_api_key_here
```

## Usage

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

1. `financial_intents`: Contains detected financial intents, confidence scores, and relevant details
2. `urgency_analysis`: Contains sentiment analysis and urgency level assessment

## Example Output

```json
{
    "financial_intents": {
        "detected_intents": ["Transaction request", "Payment issue"],
        "confidence_score": 0.95,
        "relevant_details": {
            "amount": "$5,000",
            "action": "transfer",
            "account_type": "savings"
        }
    },
    "urgency_analysis": {
        "sentiment": {
            "label": "NEGATIVE",
            "score": 0.98
        },
        "urgency_level": "high",
        "confidence_score": 0.92,
        "key_indicators": ["immediately", "urgent", "payment due tomorrow"]
    }
}
```

## Requirements

- Python 3.8+
- OpenAI API key
- Internet connection for API calls 