import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import Dashboard from './components/dashboard/Dashboard';
import Communication from './components/communication/Communication';
import Insights from './components/insights/Insights';
import Navbar from './components/common/Navbar';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2196f3', // Blue color for primary elements
    },
    secondary: {
      main: '#ff9800', // Orange for accent elements
    },
    background: {
      default: '#f5f5f5', // Light grey for background
    },
  },
  typography: {
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    h4: {
      fontWeight: 600,
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/communication" element={<Communication />} />
          <Route path="/insights" element={<Insights />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
