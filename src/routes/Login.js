import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';

const defaultTheme = createTheme();
const baseAddress = "http://localhost:3000";

export default function Login({ setIsLoggedIn }) {  // setIsLoggedIn props 추가
  const location = useLocation();
  const navigate = useNavigate();
  const [id, setUserId] = useState(''); // 아이디 상태
  const [password, setUserPassword] = useState(''); // 비밀번호 상태

  useEffect(() => {
    if (location.state) {
      setUserId(location.state.username || '');
      setUserPassword(location.state.password || '');
    }
  }, [location.state]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = {
      user_id: id,
      user_password: password,
    };

    console.log('로그인 시도:', formData);

    try {
      const response = await axios.post(`${baseAddress}/login`, formData);
      console.log('서버 응답:', response.data);
      localStorage.setItem('token', response.data); // JWT 토큰 저장
      // alert('로그인 성공!');
      setIsLoggedIn(true); // 로그인 성공 시 상태 업데이트
      navigate('/mypage'); // 로그인 후 마이페이지로 이동
    } catch (error) {
      const errorMessage = error.response?.data?.message || '로그인 실패. 다시 시도해 주세요.';
      console.error('에러 발생:', error.response.data);
      alert(errorMessage);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth={false} sx={{ height: '100vh' }}>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 'auto',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            로그인
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="id"
              label="아이디"
              name="id"
              autoComplete="id"
              autoFocus
              value={id}
              onChange={(e) => setUserId(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="비밀번호"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setUserPassword(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              로그인
            </Button>
            <Grid container>
              <Grid item xs />
              <Grid item>
                <Link to="/signup" variant="body2">
                  계정이 존재하지 않으십니까? 회원가입
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
