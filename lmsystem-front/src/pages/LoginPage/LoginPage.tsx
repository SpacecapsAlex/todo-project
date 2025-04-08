import React, {useState} from "react";
import {Box, Button, TextField, Typography} from "@mui/material";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

type UserDataType = {
  login: string,
  password: string
}

export const LoginPage = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<UserDataType>({login: '', password: ''});

  const handleLoginChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({...userData, login: event.target.value});
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({...userData, password: event.target.value});
  };

  const handleMainPage = () => {
    navigate('/');
  }

  const handleLogin = () => {
    axios.post('https://localhost:7150/api/Auth/login', userData).then((res) => {
      localStorage.setItem('token', `Bearer ${res.data.token}`);
      navigate('/');
    }).catch(() => {
      console.log('error');
    });
  }

  return (
    <Box width='30%' display='flex' flexDirection='column' gap={2}>
      <Typography textAlign='center' variant='h3'>Вход</Typography>
      <TextField fullWidth value={userData.login} onChange={handleLoginChange} size='small' variant='outlined' />
      <TextField fullWidth value={userData.password} onChange={handlePasswordChange} size='small' variant='outlined' />
      <Box display='flex' justifyContent='space-between' px={2}>
        <Button size='medium' variant='outlined' color='primary' onClick={handleMainPage}>На главную</Button>
        <Button size='medium' variant='contained' color='primary' onClick={handleLogin}>Войти</Button>
      </Box>
    </Box>
  );
}