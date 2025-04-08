import { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSnackbar } from "notistack";

type userRegisterDataType = {
  login: string;
  password: string;
  confirmPassword: string;
}

export const RegisterPage = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [userRegisterData, setUserRegisterData] = useState<userRegisterDataType>({ login: '', password: '', confirmPassword: '' });

  const handleLoginChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserRegisterData({ ...userRegisterData, login: event.target.value });
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserRegisterData({ ...userRegisterData, password: event.target.value });
  };

  const handleConfirmPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserRegisterData({ ...userRegisterData, confirmPassword: event.target.value });
  }

  const handleMainPage = () => {
    navigate('/');
  }

  const handleRegister = () => {
    axios.post('https://localhost:7150/api/Auth/register', userRegisterData).then(() => {
      enqueueSnackbar('Регистрация прошла успешно!');
      navigate('/login');
    }).catch(() => {
      enqueueSnackbar('Ошибка при регистрации!');
    });
  }

  return (
    <Box width='30%' display='flex' flexDirection='column' gap={2}>
      <Typography variant='h4' textAlign='center'>Регистрация</Typography>
      <TextField variant='outlined' size='small' value={userRegisterData.login} onChange={handleLoginChange} />
      <TextField variant='outlined' size='small' value={userRegisterData.password} onChange={handlePasswordChange} />
      <TextField variant='outlined' size='small' value={userRegisterData.confirmPassword} onChange={handleConfirmPasswordChange} />
      <Box display='flex' justifyContent='space-between' px={2}>
        <Button variant='outlined' size='medium' onClick={handleMainPage}>На главную</Button>
        <Button variant='contained' size='medium' onClick={handleRegister}>Регистрация</Button>
      </Box>
    </Box>
  );
};