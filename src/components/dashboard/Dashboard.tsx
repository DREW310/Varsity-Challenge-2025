import React, { useMemo } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Paper, 
  Alert, 
  Divider, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText,
  Button,
  Chip
} from '@mui/material';
import MoneyOffIcon from '@mui/icons-material/MoneyOff';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import BarChartIcon from '@mui/icons-material/BarChart';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import EventNoteIcon from '@mui/icons-material/EventNote';
import { Link as RouterLink } from 'react-router-dom';

import InfoCard from '../common/InfoCard';
import BarChart from '../common/BarChart';
import { useFinancial } from '../../context/FinancialContext';
import { IntentType } from '../../services/financialIntentService';

const Dashboard: React.FC = () => {
  const { intents, insights, loading } = useFinancial();

  // Generate summary data for the dashboard
  const summaryData = useMemo(() => {
    // Map backend intent descriptions to chart categories
    const mapDescriptionToCategory = (desc: string) => {
      if (!desc) return '';
      const d = desc.toLowerCase();
      if (d.includes('cash flow')) return 'cash_flow_concern';
      if (d.includes('expense')) return 'expense_reduction';
      if (d.includes('investment')) return 'investment_opportunity';
      if (d.includes('revenue')) return 'revenue_growth';
      if (d.includes('budget')) return 'budget_planning';
      if (d.includes('tax')) return 'tax_consideration';
      if (d.includes('debt')) return 'debt_management';
      return '';
    };
    // Get all detected intent types (mapped)
    const allIntentTypes = intents.flatMap(intent =>
      (intent.financial_intents?.detected_intents || []).map((i: any) => mapDescriptionToCategory(i.description))
    );
    // Count occurrences of each intent type
    const intentCounts: Record<string, number> = {
      cash_flow_concern: 0,
      expense_reduction: 0,
      investment_opportunity: 0,
      revenue_growth: 0,
      budget_planning: 0,
      tax_consideration: 0,
      debt_management: 0
    };
    allIntentTypes.forEach(type => {
      if (type && type in intentCounts) {
        intentCounts[type as keyof typeof intentCounts]++;
      }
    });
    // Get sentiment counts
    const sentimentCounts = {
      positive: 0,
      neutral: 0,
      negative: 0
    };
    intents.forEach(intent => {
      let sentimentValue: string | undefined;
      if (typeof intent.urgency_analysis?.sentiment === 'string') {
        sentimentValue = intent.urgency_analysis.sentiment.toLowerCase();
      } else if (typeof intent.urgency_analysis?.sentiment?.label === 'string') {
        sentimentValue = intent.urgency_analysis.sentiment.label.toLowerCase();
      }
      if (sentimentValue === 'positive') {
        sentimentCounts.positive++;
      } else if (sentimentValue === 'negative') {
        sentimentCounts.negative++;
      } else if (sentimentValue === 'neutral') {
        sentimentCounts.neutral++;
      } else {
        sentimentCounts.neutral++; // fallback if label is unexpected or missing
      }
    });
    console.log('intents:', intents);
    console.log('sentimentCounts:', sentimentCounts);
    return {
      intentCounts,
      sentimentCounts,
      totalIntents: intents.length,
      totalInsights: insights.length,
      highPriorityInsights: insights.filter((i: any) => i.priority === 'high').length
    };
  }, [intents, insights]);

  // Chart data for intents distribution
  const intentsChartData = useMemo(() => {
    return {
      labels: [
        'Cash Flow', 
        'Expenses', 
        'Investment', 
        'Revenue', 
        'Budget',
        'Tax',
        'Debt'
      ],
      datasets: [
        {
          label: 'Detected Intents',
          data: [
            summaryData.intentCounts.cash_flow_concern,
            summaryData.intentCounts.expense_reduction,
            summaryData.intentCounts.investment_opportunity,
            summaryData.intentCounts.revenue_growth,
            summaryData.intentCounts.budget_planning,
            summaryData.intentCounts.tax_consideration,
            summaryData.intentCounts.debt_management
          ],
          backgroundColor: '#2196f3',
        },
      ],
    };
  }, [summaryData.intentCounts]);

  // Chart data for sentiment distribution
  const sentimentChartData = useMemo(() => {
    return {
      labels: ['Positive', 'Neutral', 'Negative'],
      datasets: [
        {
          label: 'Communication Sentiment',
          data: [
            summaryData.sentimentCounts.positive,
            summaryData.sentimentCounts.neutral,
            summaryData.sentimentCounts.negative,
          ],
          backgroundColor: ['#4caf50', '#ff9800', '#f44336'],
        },
      ],
    };
  }, [summaryData.sentimentCounts]);

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 8 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Financial Intent Dashboard
        </Typography>
        <Typography color="text.secondary" variant="body1">
          Overview of your financial intent analysis and insights
        </Typography>
      </Box>

      {/* Summary Cards */}
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', mx: -1.5 }}>
          <Box sx={{ width: { xs: '100%', sm: '50%', md: '25%' }, p: 1.5 }}>
            <InfoCard
              title="Total Communications"
              value={summaryData.totalIntents}
              icon={<EventNoteIcon />}
              color="#2196f3"
            />
          </Box>
          <Box sx={{ width: { xs: '100%', sm: '50%', md: '25%' }, p: 1.5 }}>
            <InfoCard
              title="Insights Generated"
              value={summaryData.totalInsights}
              icon={<LightbulbIcon />}
              color="#ff9800"
            />
          </Box>
          <Box sx={{ width: { xs: '100%', sm: '50%', md: '25%' }, p: 1.5 }}>
            <InfoCard
              title="Cash Flow Concerns"
              value={summaryData.intentCounts.cash_flow_concern}
              icon={<AccountBalanceWalletIcon />}
              color="#f44336"
            />
          </Box>
          <Box sx={{ width: { xs: '100%', sm: '50%', md: '25%' }, p: 1.5 }}>
            <InfoCard
              title="Budget Planning"
              value={summaryData.intentCounts.budget_planning}
              icon={<BarChartIcon />}
              color="#4caf50"
            />
          </Box>
        </Box>
      </Box>

      {/* Data Visualization */}
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', mx: -1.5 }}>
          <Box sx={{ width: { xs: '100%', md: '58.333%' }, p: 1.5 }}>
            <BarChart title="Financial Intents Distribution" data={intentsChartData} />
          </Box>
          <Box sx={{ width: { xs: '100%', md: '41.667%' }, p: 1.5 }}>
            <BarChart title="Communication Sentiment" data={sentimentChartData} />
          </Box>
        </Box>
      </Box>

      {/* High Priority Insights */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          High Priority Insights
        </Typography>
        
        {insights.filter(insight => insight.priority === 'high').length > 0 ? (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {insights
              .filter(insight => insight.priority === 'high')
              .map(insight => (
                <Alert 
                  key={insight.id}
                  severity="warning" 
                  icon={<WarningAmberIcon />}
                  sx={{ 
                    borderRadius: 2,
                    '& .MuiAlert-message': {
                      width: '100%'
                    }
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                    <Typography variant="subtitle1" fontWeight="bold">
                      {insight.title}
                    </Typography>
                    <Chip 
                      label={insight.category.toUpperCase()} 
                      size="small" 
                      color={insight.category === 'alert' ? 'error' : 'primary'}
                    />
                  </Box>
                  <Typography variant="body2">{insight.description}</Typography>
                </Alert>
              ))}
          </Box>
        ) : (
          <Paper sx={{ p: 3, borderRadius: 3, bgcolor: '#f7f7f7' }}>
            <Typography align="center" color="text.secondary">
              No high priority insights detected
            </Typography>
          </Paper>
        )}
      </Box>

      {/* Recent Communications */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          Recent Communications
        </Typography>
        
        {intents.length > 0 ? (
          <Paper sx={{ p: 0, overflow: 'hidden', borderRadius: 3 }}>
            <List disablePadding>
              {intents.slice(-3).map((intent, index) => (
                <React.Fragment key={intent.id || index}>
                  <ListItem alignItems="flex-start" sx={{ py: 2, px: 3 }}>
                    <ListItemIcon>
                      {intent.financial_intents?.detected_intents?.[0]?.description === 'cash_flow_concern' && <AccountBalanceWalletIcon color="error" />}
                      {intent.financial_intents?.detected_intents?.[0]?.description === 'expense_reduction' && <MoneyOffIcon color="warning" />}
                      {intent.financial_intents?.detected_intents?.[0]?.description === 'revenue_growth' && <TrendingUpIcon color="success" />}
                      {intent.financial_intents?.detected_intents?.[0]?.description === 'budget_planning' && <BarChartIcon color="info" />}
                      {(intent.financial_intents?.detected_intents?.[0]?.description !== 'cash_flow_concern' && 
                        intent.financial_intents?.detected_intents?.[0]?.description !== 'expense_reduction' && 
                        intent.financial_intents?.detected_intents?.[0]?.description !== 'revenue_growth' && 
                        intent.financial_intents?.detected_intents?.[0]?.description !== 'budget_planning') && 
                        <EventNoteIcon color="action" />}
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Typography variant="subtitle1" fontWeight="medium" gutterBottom>
                          {intent.timestamp ? new Date(intent.timestamp).toLocaleString() : ''}
                        </Typography>
                      }
                      secondary={
                        <>
                          <Typography component="span" variant="body2" color="text.primary">
                            {intent.text || intent.financial_intents?.relevant_details}
                          </Typography>
                          <Box sx={{ mt: 1, display: 'flex', gap: 1 }}>
                            {(intent.financial_intents?.detected_intents || []).map((i: any, idx: number) => (
                              <Chip 
                                key={idx} 
                                label={i.description} 
                                size="small" 
                                variant="outlined"
                                sx={{ textTransform: 'capitalize' }}
                              />
                            ))}
                            <Chip 
                              label={(
                                typeof intent.urgency_analysis?.sentiment === 'string'
                                  ? intent.urgency_analysis.sentiment
                                  : intent.urgency_analysis?.sentiment?.label || 'neutral'
                              ).toLowerCase()}
                              size="small" 
                              color={(() => {
                                const val = typeof intent.urgency_analysis?.sentiment === 'string'
                                  ? intent.urgency_analysis.sentiment.toLowerCase()
                                  : intent.urgency_analysis?.sentiment?.label?.toLowerCase();
                                if (val === 'positive') return 'success';
                                if (val === 'negative') return 'error';
                                return 'default';
                              })()}
                            />
                          </Box>
                        </>
                      }
                    />
                  </ListItem>
                  {index < intents.slice(-3).length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
          </Paper>
        ) : (
          <Paper sx={{ p: 3, borderRadius: 3, bgcolor: '#f7f7f7' }}>
            <Typography align="center" color="text.secondary">
              No communications analyzed yet
            </Typography>
          </Paper>
        )}
      </Box>
      
      {/* Call to Action */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
        <Button
          component={RouterLink}
          to="/communication"
          variant="contained"
          size="large"
          sx={{ 
            px: 4, 
            py: 1.5, 
            borderRadius: 2,
            fontWeight: 'bold',
            boxShadow: '0 4px 10px rgba(33, 150, 243, 0.3)'
          }}
        >
          Add New Communication
        </Button>
      </Box>
    </Container>
  );
};

export default Dashboard; 