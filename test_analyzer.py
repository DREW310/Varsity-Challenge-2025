from financial_intent_analyzer import FinancialIntentAnalyzer

def test_analysis():
    # Initialize the analyzer
    analyzer = FinancialIntentAnalyzer()
    
    # Test text
    test_text = """
    I urgently need to check my account balance. 
    I think there might be some unauthorized transactions 
    and I'm worried about my savings.
    """
    
    try:
        # Get the analysis
        results = analyzer.analyze_financial_text(test_text)
        
        # Print results in a readable format
        print("\nTest Results:")
        print("-" * 50)
        print("Financial Intents Analysis:")
        print(results["financial_intents"])
        print("\nUrgency Analysis:")
        print(results["urgency_analysis"])
        
    except Exception as e:
        print(f"An error occurred: {str(e)}")

if __name__ == "__main__":
    test_analysis() 