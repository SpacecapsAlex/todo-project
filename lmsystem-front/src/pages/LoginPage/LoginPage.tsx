import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Avatar,
  InputAdornment,
  IconButton,
  Divider,
  Link
} from "@mui/material";
import {
  LockOutlined,
  PersonOutline,
  Visibility,
  VisibilityOff,
  ArrowBack
} from "@mui/icons-material";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { useSnackbar } from 'notistack';

type UserDataType = {
  login: string,
  password: string
}

export const LoginPage = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [userData, setUserData] = useState<UserDataType>({ login: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLoginChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({ ...userData, login: event.target.value });
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({ ...userData, password: event.target.value });
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMainPage = () => {
    navigate('/');
  };

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post('https://localhost:7150/api/Auth/login', userData);
      localStorage.setItem('token', `Bearer ${response.data.token}`);
      enqueueSnackbar('Авторизация прошла успешно!', { variant: 'success' });
      navigate('/');
    } catch {
      enqueueSnackbar('Неверный логин или пароль', { variant: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter') {
      handleLogin().catch(() => {
        enqueueSnackbar('Ошибка при авторизации!', { variant: 'error' });
      })
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
        p: 2
      }}
    >
      <Paper
        elevation={6}
        sx={{
          width: '100%',
          maxWidth: 400,
          p: 4,
          borderRadius: 3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 3
        }}
      >
        <Avatar sx={{
          bgcolor: 'primary.main',
          width: 60,
          height: 60,
          mb: 1
        }}>
          <LockOutlined fontSize="large" />
        </Avatar>

        <Typography variant="h4" component="h1" fontWeight="bold">
          Вход в систему
        </Typography>

        <Box width="100%" display="flex" flexDirection="column" gap={3}>
          <TextField
            fullWidth
            label="Логин"
            variant="outlined"
            value={userData.login}
            onChange={handleLoginChange}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonOutline color="action" />
                  </InputAdornment>
                ),
              }
            }}
            onKeyDown={handleKeyDown}
          />

          <TextField
            fullWidth
            label="Пароль"
            type={showPassword ? 'text' : 'password'}
            variant="outlined"
            value={userData.password}
            onChange={handlePasswordChange}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <LockOutlined color="action" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleTogglePassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }
            }}
            onKeyDown={handleKeyDown}
          />

          <Link
            href="#"
            variant="body2"
            textAlign="right"
            sx={{
              color: 'text.secondary',
              '&:hover': { color: 'primary.main' }
            }}
          >
            Забыли пароль?
          </Link>

          <Button
            fullWidth
            size="large"
            variant="contained"
            onClick={handleLogin}
            disabled={isLoading || !userData.login || !userData.password}
            sx={{
              py: 1.5,
              borderRadius: 2,
              fontSize: '1rem',
              fontWeight: 'bold',
              textTransform: 'none'
            }}
          >
            {isLoading ? 'Вход...' : 'Войти'}
          </Button>

          <Divider sx={{ width: '100%', my: 1 }}>
            <Typography variant="body2" color="text.secondary">или</Typography>
          </Divider>

          <Box display="flex" justifyContent="space-between" width="100%">
            <Button
              startIcon={<ArrowBack />}
              variant="text"
              onClick={handleMainPage}
              sx={{
                color: 'text.secondary',
                '&:hover': { color: 'primary.main' }
              }}
            >
              На главную
            </Button>

            <Button
              variant="text"
              onClick={() => navigate('/register')}
              sx={{
                color: 'primary.main',
                fontWeight: 'bold'
              }}
            >
              Регистрация
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};