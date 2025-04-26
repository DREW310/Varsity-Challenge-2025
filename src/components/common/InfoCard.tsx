import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  SvgIconProps,
  useTheme,
} from '@mui/material';

interface InfoCardProps {
  title: string;
  value: string | number;
  icon: React.ReactElement<SvgIconProps>;
  color?: string;
  subtitle?: string;
}

const InfoCard: React.FC<InfoCardProps> = ({
  title,
  value,
  icon,
  color,
  subtitle,
}) => {
  const theme = useTheme();
  const cardColor = color || theme.palette.primary.main;

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 3,
        boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
        transition: 'transform 0.3s, box-shadow 0.3s',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 8px 30px rgba(0,0,0,0.12)',
        },
      }}
    >
      <CardContent sx={{ flexGrow: 1, p: 3 }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            mb: 2,
          }}
        >
          <Box
            sx={{
              backgroundColor: `${cardColor}15`,
              borderRadius: '50%',
              p: 1,
              mr: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {React.cloneElement(icon, {
              sx: { color: cardColor, fontSize: 30 },
            })}
          </Box>
          <Typography variant="h6" color="text.secondary" fontWeight="medium">
            {title}
          </Typography>
        </Box>
        <Typography variant="h4" component="div" fontWeight="bold" gutterBottom>
          {value}
        </Typography>
        {subtitle && (
          <Typography color="text.secondary" variant="body2">
            {subtitle}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default InfoCard; 