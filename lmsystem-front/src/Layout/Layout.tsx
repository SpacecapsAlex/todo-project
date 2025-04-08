import { Box, CssBaseline, Toolbar, styled } from '@mui/material';
import { AppHeader } from './AppHeader';
import { AppSidebar } from './AppSidebar';
import React from 'react';

const LayoutContainer = styled(Box)({
  display: 'flex',
  minHeight: '100vh'
});

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

const drawerWidth = 240;

interface LayoutProps {
  children?: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const [open, setOpen] = React.useState(true);

  const handleToggle = () => {
    setOpen(!open);
  };

  return (
    <LayoutContainer>
      <CssBaseline />
      <AppHeader open={open} onDrawerOpen={() => setOpen(true)} />
      <AppSidebar open={open} onToggle={handleToggle} />
      <Main open={open}>
        <Toolbar />
        {children}
      </Main>
    </LayoutContainer>
  );
};