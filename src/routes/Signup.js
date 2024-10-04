import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
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

export default function SignUp() {
  const [name, setUserName] = useState(''); // 이름 상태
  const [id, setUserId] = useState(''); // 아이디 상태
  const [password, setUserPassword] = useState(''); // 비밀번호 상태
  const [email, setUserEmail] = useState(''); // 이메일 상태
  const [phone_number, setUserPhone] = useState(''); // 전화번호 상태
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = {
      user_id: id, // 수정된 부분
      user_password: password, // 수정된 부분
      user_email: email, // 수정된 부분
      user_name: name, // 수정된 부분
      user_phone: phone_number // 수정된 부분
    };

    console.log('회원가입 시도:', formData);

    try {
      const response = await axios.post(`${baseAddress}/user/signup`, formData);
      console.log('서버 응답:', response.data);
      localStorage.setItem('token', response.data); // 회원가입 성공시 응답으로 받은 토큰을 localstorage에 저장
      alert('회원가입 성공!');
      navigate('/login'); // 회원가입 후 마이페이지로 이동
    } catch (error) {
      const errorMessage = error.response?.data?.message || '회원가입 실패. 다시 시도해 주세요.';
      console.error('에러 발생:', error.response.data);
      alert(errorMessage); // 서버에서 받은 에러 메시지로 알림 표시
      
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
            회원가입
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="name"
                  required
                  fullWidth
                  id="name"
                  label="이름"
                  autoFocus
                  value={name} // 수정된 부분
                  onChange={(e) => setUserName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="id"
                  label="아이디"
                  name="id"
                  autoComplete="id"
                  value={id} // 수정된 부분
                  onChange={(e) => setUserId(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="비밀번호"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={password} // 수정된 부분
                  onChange={(e) => setUserPassword(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="이메일"
                  name="email"
                  autoComplete="email"
                  value={email} // 수정된 부분
                  onChange={(e) => setUserEmail(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="phone"
                  label="전화번호"
                  name="phone"
                  autoComplete="phone"
                  value={phone_number} // 수정된 부분
                  onChange={(e) => setUserPhone(e.target.value)}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              회원가입
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/login" variant="body2">
                  이미 계정이 있습니까? 로그인
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
