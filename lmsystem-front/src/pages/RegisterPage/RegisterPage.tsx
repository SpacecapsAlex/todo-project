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
  CircularProgress
} from "@mui/material";
import {
  PersonAdd,
  PersonOutline,
  LockOutlined,
  Visibility,
  VisibilityOff,
  ArrowBack
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSnackbar } from "notistack";

type UserRegisterDataType = {
  login: string;
  password: string;
  confirmPassword: string;
}

export const RegisterPage = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [userRegisterData, setUserRegisterData] = useState<UserRegisterDataType>({
    login: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLoginChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserRegisterData({ ...userRegisterData, login: event.target.value });
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserRegisterData({ ...userRegisterData, password: event.target.value });
  };

  const handleConfirmPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserRegisterData({ ...userRegisterData, confirmPassword: event.target.value });
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

  const handleMainPage = () => navigate('/');

  const handleRegister = async () => {
    if (userRegisterData.password !== userRegisterData.confirmPassword) {
      enqueueSnackbar('Пароли не совпадают', { variant: 'error' });
      return;
    }

    setIsLoading(true);
    try {
      await axios.post('https://localhost:7150/api/Auth/register', userRegisterData);
      enqueueSnackbar('Регистрация прошла успешно!', { variant: 'success' });
      navigate('/login');
    } catch {
      enqueueSnackbar('Ошибка при регистрации!', { variant: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleRegister().catch(() => {
        enqueueSnackbar('Ошибка при регистрации!', { variant: 'error' });
      })
    }
  };

  const isFormValid = userRegisterData.login &&
    userRegisterData.password &&
    userRegisterData.confirmPassword &&
    userRegisterData.password === userRegisterData.confirmPassword;

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: 'calc(100% - 64px)',
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
        p: 2
      }}
    >
      <Paper
        elevation={6}
        sx={{
          width: '100%',
          maxWidth: 450,
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
          <PersonAdd fontSize="large" />
        </Avatar>

        <Typography variant="h4" component="h1" fontWeight="bold">
          Создать аккаунт
        </Typography>

        <Box width="100%" display="flex" flexDirection="column" gap={3}>
          <TextField
            fullWidth
            label="Логин"
            variant="outlined"
            value={userRegisterData.login}
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
            value={userRegisterData.password}
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
                      onClick={togglePasswordVisibility}
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

          <TextField
            fullWidth
            label="Подтвердите пароль"
            type={showConfirmPassword ? 'text' : 'password'}
            variant="outlined"
            value={userRegisterData.confirmPassword}
            onChange={handleConfirmPasswordChange}
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
                      aria-label="toggle confirm password visibility"
                      onClick={toggleConfirmPasswordVisibility}
                      edge="end"
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }
            }}
            onKeyDown={handleKeyDown}
            error={userRegisterData.confirmPassword !== '' &&
              userRegisterData.password !== userRegisterData.confirmPassword}
            helperText={userRegisterData.confirmPassword !== '' &&
            userRegisterData.password !== userRegisterData.confirmPassword ?
              'Пароли не совпадают'
: ''}
          />

          <Button
            fullWidth
            size="large"
            variant="contained"
            onClick={handleRegister}
            disabled={!isFormValid || isLoading}
            sx={{
              py: 1.5,
              borderRadius: 2,
              fontSize: '1rem',
              fontWeight: 'bold',
              textTransform: 'none'
            }}
          >
            {isLoading
? (
              <CircularProgress size={24} color="inherit" />
            )
: (
              'Зарегистрироваться'
            )}
          </Button>

          <Divider sx={{ width: '100%', my: 1 }}>
            <Typography variant="body2" color="text.secondary">Уже есть аккаунт?</Typography>
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
              onClick={() => navigate('/login')}
              sx={{
                color: 'primary.main',
                fontWeight: 'bold'
              }}
            >
              Войти
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};