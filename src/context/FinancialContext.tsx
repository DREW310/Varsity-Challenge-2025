import React, { createContext, useContext, useState, ReactNode } from 'react';
import { 
  analyzeFinancialIntent
} from '../services/financialIntentService';

interface FinancialContextProps {
  intents: any[]; // Store full backend response
  insights: any[];
  loading: boolean;
  addIntent: (text: string) => Promise<void>;
  clearAll: () => void;
}

const FinancialContext = createContext<FinancialContextProps | undefined>(undefined);

interface FinancialProviderProps {
  children: ReactNode;
}

export const FinancialProvider: React.FC<FinancialProviderProps> = ({ children }) => {
  const [intents, setIntents] = useState<any[]>([]); // Start with empty
  const [insights, setInsights] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const addIntent = async (text: string) => {
    setLoading(true);
    try {
      const newIntent = await analyzeFinancialIntent(text);
      const updatedIntents = [...intents, newIntent];
      setIntents(updatedIntents);

      // Generate insights from backend alerts, suggestions, forecasts
      const newInsights: any[] = [];
      const commId = Math.random().toString(36).substring(2, 10);
      // Alerts
      (newIntent.financial_intents?.alerts || []).forEach((alert: any) => {
        newInsights.push({
          id: Math.random().toString(36).substring(2, 10),
          category: 'alert',
          title: alert.message,
          description: alert.impact,
          priority: alert.severity || 'medium',
          relatedCommunication: { id: commId, text },
          ...alert,
        });
      });
      // Suggestions
      (newIntent.financial_intents?.suggestions || []).forEach((suggestion: any) => {
        newInsights.push({
          id: Math.random().toString(36).substring(2, 10),
          category: 'suggestion',
          title: suggestion.message,
          description: suggestion.benefit,
          priority: suggestion.priority || 'medium',
          relatedCommunication: { id: commId, text },
          ...suggestion,
        });
      });
      // Forecasts (if present)
      (newIntent.financial_intents?.revenue_actions || []).forEach((forecast: any) => {
        newInsights.push({
          id: Math.random().toString(36).substring(2, 10),
          category: 'forecast',
          title: forecast.type || 'Forecast',
          description: forecast.description || '',
          priority: 'medium',
          relatedCommunication: { id: commId, text },
          ...forecast,
        });
      });
      setInsights(prev => [...prev, ...newInsights]);
    } catch (error) {
      console.error('Error analyzing financial intent:', error);
    } finally {
      setLoading(false);
    }
  };

  const clearAll = () => {
    setIntents([]);
    setInsights([]);
  };

  const value = {
    intents,
    insights,
    loading,
    addIntent,
    clearAll,
  };

  return (
    <FinancialContext.Provider value={value}>
      {children}
    </FinancialContext.Provider>
  );
};

export const useFinancial = (): FinancialContextProps => {
  const context = useContext(FinancialContext);
  if (context === undefined) {
    throw new Error('useFinancial must be used within a FinancialProvider');
  }
  return context;
}; 