import { AppBar, Toolbar, Typography, IconButton, Avatar, Badge, Stack, Box } from '@mui/material';
import { Menu as MenuIcon, Notifications as NotificationsIcon, Chat as ChatIcon } from '@mui/icons-material';

interface AppHeaderProps {
  open: boolean;
  onDrawerOpen: () => void;
}

export const AppHeader = ({ open, onDrawerOpen }: AppHeaderProps) => (
  <AppBar
    position="fixed"
    sx={{
      zIndex: (theme) => theme.zIndex.drawer + 1,
      background: 'white',
      color: 'text.primary',
      boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
    }}
  >
    <Toolbar>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        onClick={onDrawerOpen}
        edge="start"
        sx={{ mr: 2, ...(open && { display: 'none' }) }}
      >
        <MenuIcon />
      </IconButton>
      <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
        <Box component="span" sx={{ color: 'primary.main', fontWeight: 'bold' }}>LMS</Box>
        ystem
      </Typography>

      <Stack direction="row" spacing={2} alignItems="center">
        <IconButton color="inherit">
          <Badge badgeContent={4} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <IconButton color="inherit">
          <ChatIcon />
        </IconButton>
        <Avatar alt="User Name" src="/static/images/avatar/1.jpg" sx={{ width: 36, height: 36 }} />
      </Stack>
    </Toolbar>
  </AppBar>
);