import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { Box, Paper, Typography, useTheme } from '@mui/material';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface BarChartProps {
  title: string;
  data: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      backgroundColor: string | string[];
    }[];
  };
  height?: number;
}

const BarChart: React.FC<BarChartProps> = ({ title, data, height = 300 }) => {
  const theme = useTheme();

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: theme.palette.divider,
          borderDash: [5, 5],
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        borderRadius: 3,
        boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Typography variant="h6" fontWeight="medium" mb={2}>
        {title}
      </Typography>
      <Box sx={{ height: height, flexGrow: 1 }}>
        <Bar options={options} data={data} />
      </Box>
    </Paper>
  );
};

export default BarChart; 