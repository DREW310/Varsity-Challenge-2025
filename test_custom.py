from financial_intent_analyzer import FinancialIntentAnalyzer

# Initialize the analyzer
analyzer = FinancialIntentAnalyzer()

# Example text as a meeting recording transcript
text = """
So during today's leadership meeting, the CFO brought up some critical concerns about our cash flow situation. We have about RM180,000 in overdue payments from Q1 that we absolutely must collect by mid-May, or we'll have to take legal action. This is really putting pressure on our liquidity, and we need to address this immediately.

The operations team is also in a tough spot - they're severely understaffed right now. We need to hire two operations team members and one junior accountant as soon as possible because our current staff is completely overwhelmed. This is causing significant delays in our core operations, and it's becoming a major bottleneck.

On top of that, we just got notified that our main supplier is increasing raw material prices by 12% starting next week. This is going to hit our margins hard if we don't renegotiate quickly. The CEO has offered to personally step in on the next supplier call to try to secure a better deal.

For some medium-term solutions, we're preparing an application for a RM250,000 working capital credit line that we need to submit by the end of next week. We're also looking into a government SME grant that could help with our upcoming payroll expenses - the application deadline is in two weeks. We should also review our Q2 marketing budget and potentially scale back some initiatives until we have better visibility on our cash flow.

Looking further ahead, we need to think about some longer-term strategies. We should explore establishing longer-term agreements with our suppliers to get better pricing in the future. We also need to do a proper cost-benefit analysis for any future contract-based hires, and develop a more robust pricing strategy that can better handle cost fluctuations.

The CFO highlighted several red flags we need to watch out for. The most critical one is that we might face a serious cash flow shortfall by late June if we don't resolve these collection issues. Our operational costs are also rising due to the supplier price increases, and we'll need to address that within the next month. On a less urgent note, our marketing budget might need some optimization in the coming quarter.

For immediate actions, we really need to implement a proper payment follow-up system for these overdue invoices. We should also develop a better supplier negotiation strategy to handle future price increases more effectively. And while it's not urgent, we should start thinking about implementing a long-term pricing strategy to better handle these kinds of cost fluctuations in the future.
"""

# Analyze the text
results = analyzer.analyze_financial_text(text)

# Print results in a more readable format
print("\nSummary:")
print("-" * 50)
for key, value in results["summary"].items():
    print(f"{key}: {value}")

print("\nFinancial Intents:")
print("-" * 50)
for intent in results["financial_intents"]["detected_intents"]:
    print(f"\nIntent: {intent['description']}")
    print(f"Urgency Level: {intent['urgency_level']} (Score: {intent['urgency_score']})")
    print(f"Timeline: {intent['timeline']}")
    print(f"Impact: {intent['impact']}")

print("\nAlerts:")
print("-" * 50)
for alert in results["financial_intents"]["alerts"]:
    print(f"\nAlert: {alert['message']}")
    print(f"Severity: {alert['severity']}")
    print(f"Impact: {alert['impact']}")
    print(f"Recommendation: {alert['recommendation']}")

print("\nSuggestions:")
print("-" * 50)
for suggestion in results["financial_intents"]["suggestions"]:
    print(f"\nSuggestion: {suggestion['message']}")
    print(f"Benefit: {suggestion['benefit']}")
    print(f"Implementation: {suggestion['implementation']}")
    print(f"Priority: {suggestion['priority']}") 