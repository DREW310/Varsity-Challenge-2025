import React from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Box,
  useTheme,
  Container,
  Avatar
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ChatIcon from '@mui/icons-material/Chat';
import InsightsIcon from '@mui/icons-material/Insights';

const Navbar: React.FC = () => {
  const theme = useTheme();

  return (
    <AppBar position="static" elevation={0} sx={{ mb: 3 }}>
      <Container maxWidth="lg">
        <Toolbar>
          <Avatar 
            sx={{ 
              mr: 2, 
              bgcolor: theme.palette.secondary.main,
              width: 40,
              height: 40
            }}
          >
            FI
          </Avatar>
          <Typography 
            variant="h6" 
            component="div" 
            sx={{ 
              flexGrow: 1, 
              fontWeight: 'bold' 
            }}
          >
            Financial Intent Detector
          </Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button 
              startIcon={<DashboardIcon />}
              component={RouterLink} 
              to="/" 
              color="inherit" 
              sx={{ 
                borderRadius: 2,
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)'
                }
              }}
            >
              Dashboard
            </Button>
            <Button 
              startIcon={<ChatIcon />}
              component={RouterLink} 
              to="/communication" 
              color="inherit"
              sx={{ 
                borderRadius: 2,
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)'
                }
              }}
            >
              Communication
            </Button>
            <Button 
              startIcon={<InsightsIcon />}
              component={RouterLink} 
              to="/insights" 
              color="inherit"
              sx={{ 
                borderRadius: 2,
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)'
                }
              }}
            >
              Insights
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar; 