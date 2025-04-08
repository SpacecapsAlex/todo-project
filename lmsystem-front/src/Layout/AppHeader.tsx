import { useState, useRef, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Avatar,
  Badge,
  Stack,
  Box,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Button,
  Divider
} from '@mui/material';
import {
  Menu as MenuIcon,
  Notifications as NotificationsIcon,
  Chat as ChatIcon,
  Circle as CircleIcon,
  ArrowForward as ArrowForwardIcon
} from '@mui/icons-material';

interface AppHeaderProps {
  open: boolean;
  onDrawerOpen: () => void;
}

export const AppHeader = ({ open, onDrawerOpen }: AppHeaderProps) => {
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, text: 'Новое сообщение', isNew: true },
    { id: 2, text: 'Оповещение', isNew: true },
    { id: 3, text: 'Напоминание: дедлайн завтра', isNew: false },
    { id: 4, text: 'Системное обновление', isNew: false },
  ]);
  const anchorRef = useRef<HTMLButtonElement>(null);

  const handleToggleNotifications = () => {
    setNotificationsOpen((prev) => !prev);

    if (!notificationsOpen) {
      setNotifications(notifications.map(n => ({ ...n, isNew: false })));
    }
  };

  const handleCloseNotifications = (event: MouseEvent | TouchEvent) => {
    if (anchorRef.current && anchorRef.current.contains(event.target as Node)) {
      return;
    }
    setNotificationsOpen(false);
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleCloseNotifications);
    return () => {
      document.removeEventListener('mousedown', handleCloseNotifications);
    };
  }, []);

  const newNotificationsCount = notifications.filter(n => n.isNew).length;

  return (
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
          <Box sx={{ position: 'relative' }}>
            <IconButton
              color="inherit"
              onClick={handleToggleNotifications}
              ref={anchorRef}
            >
              <Badge badgeContent={newNotificationsCount} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>

            {notificationsOpen && (
              <Paper
                sx={{
                  position: 'absolute',
                  right: 0,
                  top: '100%',
                  mt: 1,
                  width: 350,
                  maxHeight: 400,
                  overflow: 'auto',
                  boxShadow: 3,
                  zIndex: 1
                }}
              >
                <Box sx={{ p: 2 }}>
                  <Typography variant="subtitle1" fontWeight="bold">
                    Уведомления
                  </Typography>
                </Box>
                <Divider />

                {notifications.length > 0
? (
                  <List dense>
                    {notifications.map((notification) => (
                      <ListItem
                        key={notification.id}
                        sx={{
                          bgcolor: notification.isNew ? 'action.hover' : 'inherit',
                          '&:hover': { bgcolor: 'action.selected' }
                        }}
                      >
                        {notification.isNew && (
                          <ListItemIcon sx={{ minWidth: 32 }}>
                            <CircleIcon color="primary" sx={{ fontSize: 8 }} />
                          </ListItemIcon>
                        )}
                        <ListItemText
                          primary={notification.text}
                          primaryTypographyProps={{
                            sx: {
                              fontWeight: notification.isNew ? 'medium' : 'normal'
                            }
                          }}
                        />
                      </ListItem>
                    ))}
                  </List>
                )
: (
                  <Box sx={{ p: 3, textAlign: 'center' }}>
                    <Typography variant="body2" color="text.secondary">
                      Нет новых уведомлений
                    </Typography>
                  </Box>
                )}

                <Divider />
                <Box sx={{ p: 1.5, display: 'flex', justifyContent: 'center' }}>
                  <Button
                    size="small"
                    endIcon={<ArrowForwardIcon />}
                    onClick={() => {
                      console.log('Navigate to notifications page');
                      setNotificationsOpen(false);
                    }}
                  >
                    Все уведомления
                  </Button>
                </Box>
              </Paper>
            )}
          </Box>

          <IconButton color="inherit">
            <ChatIcon />
          </IconButton>
          <Avatar alt="User Name" src="/static/images/avatar/1.jpg" sx={{ width: 36, height: 36 }} />
        </Stack>
      </Toolbar>
    </AppBar>
  );
};