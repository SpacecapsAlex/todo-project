import { Drawer, Toolbar, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider, IconButton, styled, Box } from '@mui/material';
import {
  Dashboard as DashboardIcon,
  School as SchoolIcon,
  Assignment as AssignmentIcon,
  CalendarToday as CalendarIcon,
  Settings as SettingsIcon,
  Logout as LogoutIcon,
  Menu as MenuIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  TaskAlt as TaskAltIcon,
  Login as LoginIcon,
  PersonAdd as PersonAddIcon
} from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const drawerWidth = 240;
const collapsedWidth = 72;

const StyledDrawer = styled(Drawer, { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
}>(({ theme, open }) => ({
  width: open ? drawerWidth : collapsedWidth,
  height: '100%',
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  '& .MuiDrawer-paper': {
    width: open ? drawerWidth : collapsedWidth,
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    borderRight: 'none',
    boxShadow: '2px 0 10px rgba(0,0,0,0.05)',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column'
  },
}));

const ToggleButtonContainer = styled(Box)(({ theme }) => ({
  '&:hover': {
    backgroundColor: theme.palette.grey[200]
  },
  backgroundColor: theme.palette.background.paper,
  borderRadius: '50%',
  boxShadow: theme.shadows[4],
  display: 'none',
  position: 'absolute',
  right: -18,
  top: '85%',
  transform: 'translateY(-50%)',
  zIndex: theme.zIndex.drawer + 1
}));

interface AppSidebarProps {
  open: boolean;
  onToggle: () => void;
}

export const AppSidebar = ({ open, onToggle }: AppSidebarProps) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [hovered, setHovered] = useState(false);

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/' },
    { text: 'Courses', icon: <SchoolIcon />, path: '/courses' },
    { text: 'Assignments', icon: <AssignmentIcon />, path: '/assignments' },
    { text: 'Calendar', icon: <CalendarIcon />, path: '/calendar' },
    { text: 'Common task list', icon: <TaskAltIcon />, path: '/todo' },
    { text: 'Login', icon: <LoginIcon />, path: '/login' },
    { text: 'Register', icon: <PersonAddIcon />, path: '/register' },
  ];

  const bottomItems = [
    { text: 'Settings', icon: <SettingsIcon />, path: '/settings' },
    { text: 'Logout', icon: <LogoutIcon />, path: '/logout' }
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <Box
      sx={{
        position: 'relative',
        height: '100vh',
        '&:hover .toggle-button': {
          display: 'block'
        }
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <StyledDrawer
        variant="permanent"
        anchor="left"
        open={open}
      >
        <Box>
          <Toolbar sx={{
            display: 'flex',
            justifyContent: open ? 'flex-end' : 'center',
            minHeight: '64px !important'
          }}>
            {open
? (
              <IconButton onClick={onToggle}>
                <ChevronLeftIcon />
              </IconButton>
            )
: (
              <IconButton onClick={onToggle}>
                <MenuIcon />
              </IconButton>
            )}
          </Toolbar>
          <Divider />
          <List>
            {menuItems.map((item) => (
              <ListItem key={item.text} disablePadding sx={{ display: 'block' }}>
                <ListItemButton
                  onClick={() => navigate(item.path)}
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5,
                    borderRadius: 2,
                    mx: 1,
                    backgroundColor: isActive(item.path) ? theme.palette.action.selected : 'inherit',
                    '&:hover': {
                      backgroundColor: theme.palette.action.hover,
                      '& .MuiListItemIcon-root': {
                        color: 'primary.main'
                      }
                    }
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : 'auto',
                      justifyContent: 'center',
                      color: isActive(item.path) ? 'primary.main' : 'text.secondary'
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.text}
                    sx={{
                      opacity: open ? 1 : 0,
                      transition: 'opacity 0.2s ease',
                      '& .MuiTypography-root': {
                        fontWeight: isActive(item.path) ? 'bold' : 'normal'
                      }
                    }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>

        <Box sx={{ mt: 'auto' }}>
          <Divider sx={{ my: 1 }} />
          <List>
            {bottomItems.map((item) => (
              <ListItem key={item.text} disablePadding sx={{ display: 'block' }}>
                <ListItemButton
                  onClick={() => navigate(item.path)}
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5,
                    borderRadius: 2,
                    mx: 1,
                    backgroundColor: isActive(item.path) ? theme.palette.action.selected : 'inherit',
                    '&:hover': {
                      backgroundColor: theme.palette.action.hover,
                      '& .MuiListItemIcon-root': {
                        color: 'primary.main'
                      }
                    }
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : 'auto',
                      justifyContent: 'center',
                      color: isActive(item.path) ? 'primary.main' : 'text.secondary'
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.text}
                    sx={{
                      opacity: open ? 1 : 0,
                      transition: 'opacity 0.2s ease',
                      '& .MuiTypography-root': {
                        fontWeight: isActive(item.path) ? 'bold' : 'normal'
                      }
                    }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </StyledDrawer>

      {(hovered || !open) && (
        <ToggleButtonContainer className="toggle-button">
          <IconButton
            onClick={onToggle}
            size="small"
            sx={{
              border: `1px solid ${theme.palette.divider}`
            }}
          >
            {open ? <ChevronLeftIcon fontSize="small" /> : <ChevronRightIcon fontSize="small" />}
          </IconButton>
        </ToggleButtonContainer>
      )}
    </Box>
  );
};