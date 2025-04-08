import { Card, CardContent, Stack, Avatar, Typography, Box, styled } from '@mui/material';
import { School as SchoolIcon, Assignment as AssignmentIcon, Chat as ChatIcon, CalendarToday as CalendarIcon } from '@mui/icons-material';

const StyledCard = styled(Card)(() => ({
  borderRadius: 16,
  boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
  transition: 'transform 0.3s, box-shadow 0.3s',
  flex: '1 1 200px',
  minWidth: '200px',
  maxWidth: '100%',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 12px 20px rgba(0,0,0,0.15)'
  }
}));

const CardsContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  gap: theme.spacing(4),
  marginBottom: theme.spacing(4),
  '& > *': {
    flex: '1 1 calc(25% - 32px)',
    [theme.breakpoints.down('lg')]: {
      flex: '1 1 calc(50% - 32px)'
    },
    [theme.breakpoints.down('sm')]: {
      flex: '1 1 100%'
    }
  }
}));

export const StatsCards = () => (
  <CardsContainer>
    <StyledCard>
      <CardContent>
        <Stack direction="row" alignItems="center" spacing={2}>
          <Avatar sx={{ bgcolor: 'primary.light', width: 56, height: 56 }}>
            <SchoolIcon fontSize="large" />
          </Avatar>
          <Box>
            <Typography variant="h6" color="text.secondary">
              Active Courses
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
              5
            </Typography>
          </Box>
        </Stack>
      </CardContent>
    </StyledCard>

    <StyledCard>
      <CardContent>
        <Stack direction="row" alignItems="center" spacing={2}>
          <Avatar sx={{ bgcolor: 'secondary.light', width: 56, height: 56 }}>
            <AssignmentIcon fontSize="large" />
          </Avatar>
          <Box>
            <Typography variant="h6" color="text.secondary">
              Pending Assignments
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
              3
            </Typography>
          </Box>
        </Stack>
      </CardContent>
    </StyledCard>

    <StyledCard>
      <CardContent>
        <Stack direction="row" alignItems="center" spacing={2}>
          <Avatar sx={{ bgcolor: 'info.light', width: 56, height: 56 }}>
            <ChatIcon fontSize="large" />
          </Avatar>
          <Box>
            <Typography variant="h6" color="text.secondary">
              New Messages
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
              7
            </Typography>
          </Box>
        </Stack>
      </CardContent>
    </StyledCard>

    <StyledCard>
      <CardContent>
        <Stack direction="row" alignItems="center" spacing={2}>
          <Avatar sx={{ bgcolor: 'success.light', width: 56, height: 56 }}>
            <CalendarIcon fontSize="large" />
          </Avatar>
          <Box>
            <Typography variant="h6" color="text.secondary">
              Upcoming Events
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
              2
            </Typography>
          </Box>
        </Stack>
      </CardContent>
    </StyledCard>
  </CardsContainer>
);