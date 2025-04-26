import { FinancialIntent, FinancialInsight, IntentType } from './financialIntentService';

// Initial seed intents
export const seedIntents: FinancialIntent[] = [
  {
    id: 'seed-intent-1',
    text: 'I am concerned about our cash flow for the next quarter. We have several large payments due but our receivables are delayed.',
    timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days ago
    intents: [
      {
        type: 'cash_flow_concern' as IntentType,
        confidence: 0.92,
        details: 'High confidence detection of cash flow concern',
      },
      {
        type: 'budget_planning' as IntentType,
        confidence: 0.65,
        details: 'Moderate confidence detection of budget planning need',
      },
    ],
    sentiment: {
      score: -0.6,
      label: 'negative',
    },
  },
  {
    id: 'seed-intent-2',
    text: 'We should look into reducing our operating expenses. I think there are several areas where we can cut costs without affecting our core business.',
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
    intents: [
      {
        type: 'expense_reduction' as IntentType,
        confidence: 0.89,
        details: 'High confidence detection of expense reduction intent',
      },
    ],
    sentiment: {
      score: 0.3,
      label: 'positive',
    },
  },
  {
    id: 'seed-intent-3',
    text: 'I think we should invest in new marketing channels to boost our sales. Our current revenue growth is below our annual targets.',
    timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
    intents: [
      {
        type: 'revenue_growth' as IntentType,
        confidence: 0.87,
        details: 'High confidence detection of revenue growth intent',
      },
      {
        type: 'investment_opportunity' as IntentType,
        confidence: 0.72,
        details: 'Moderate confidence detection of investment intent',
      },
    ],
    sentiment: {
      score: 0.1,
      label: 'neutral',
    },
  },
];

// Initial seed insights
export const seedInsights: FinancialInsight[] = [
  {
    id: 'seed-insight-1',
    title: 'Cash Flow Risk Alert',
    description: 'Based on recent communications, there appears to be a significant concern about cash flow for the upcoming quarter. Consider reviewing accounts receivable processes and payment schedules to improve liquidity.',
    category: 'alert',
    priority: 'high',
    relatedIntentIds: ['seed-intent-1'],
  },
  {
    id: 'seed-insight-2',
    title: 'Cost Reduction Opportunity',
    description: 'Communications indicate interest in reducing operating expenses. Consider conducting a cost analysis across departments to identify potential savings opportunities without impacting core business functions.',
    category: 'suggestion',
    priority: 'medium',
    relatedIntentIds: ['seed-intent-2'],
  },
  {
    id: 'seed-insight-3',
    title: 'Revenue Growth Strategy Needed',
    description: 'Current revenue growth is reported as below annual targets. Consider developing a comprehensive marketing strategy to explore new channels and boost sales performance in the next quarter.',
    category: 'forecast',
    priority: 'medium',
    relatedIntentIds: ['seed-intent-3'],
  },
]; 