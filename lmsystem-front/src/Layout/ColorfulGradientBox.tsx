import { Box, Typography, styled } from '@mui/material';

const ColorfulGradient = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  color: 'white',
  padding: theme.spacing(4),
  borderRadius: 16,
  marginBottom: theme.spacing(4)
}));

interface ColorfulGradientBoxProps {
  title?: string;
  subtitle?: string;
}

export const ColorfulGradientBox = ({
                                      title = "Welcome back, Alex!",
                                      subtitle = "You have 3 new assignments and 2 upcoming classes this week."
                                    }: ColorfulGradientBoxProps) => (
  <ColorfulGradient>
    <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
      {title}
    </Typography>
    <Typography variant="body1">
      {subtitle}
    </Typography>
  </ColorfulGradient>
);