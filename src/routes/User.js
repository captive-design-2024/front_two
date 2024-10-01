import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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

export default function User() {
  const [name, setUserName] = useState('');
  const [id, setUserId] = useState('');
  const [password, setUserPassword] = useState('');
  const [email, setUserEmail] = useState('');
  const [phone_number, setUserPhone] = useState('');
  const [title, setProjectTitle] = useState([]); // 프로젝트 제목 상태 추가
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get(`${baseAddress}/user/value`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          }
        });
        setUserId(response.data[0].id);
        setUserPassword(response.data[0].password);
        setUserName(response.data[0].name);
        setUserEmail(response.data[0].email);
        setUserPhone(response.data[0].phone);
      } catch (error) {
        console.error('유저 데이터를 가져오는 중 에러 발생:', error);
      }
    };

    const fetchProjectTitle = async () => { // 프로젝트 제목을 가져오는 함수
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get(`${baseAddress}/project/title`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          }
        });
        console.log('프로젝트 제목 응답:', response.data); // 응답 확인
        setProjectTitle(response.data.projectNames); // projectNames 배열로 상태 업데이트
      } catch (error) {
        console.error('프로젝트 제목을 가져오는 중 에러 발생:', error);
      }
    };

    fetchUserData();
    fetchProjectTitle(); // 컴포넌트가 마운트될 때 프로젝트 제목을 가져옴
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = {
      user_id: id, // 수정된 부분
      user_password: password, // 수정된 부분
      user_name: name, // 수정된 부분
      user_email: email, // 수정된 부분
      user_phone: phone_number // 수정된 부분
    };

    console.log('회원정보 수정 시도:', formData);

  try {
    const token = localStorage.getItem('token'); // 로컬 스토리지에서 토큰 가져오기
    const response = await axios.put(`${baseAddress}/user`, formData, {
      headers: {
        Authorization: `Bearer ${token}` // Authorization 헤더 추가
      }
    });
    console.log('서버 응답:', response.data);
    alert('회원정보 수정 성공!');
    navigate('/mypage'); // 수정 후 마이페이지로 이동
  } catch (error) {
    const errorMessage = error.response?.data?.message || '회원정보 수정 실패. 다시 시도해 주세요.';
    console.error('에러 발생:', error.response?.data); // ?를 추가하여 안전하게 접근
    alert(errorMessage);
  }
}
    
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
            회원정보 수정
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="name"
                  label="이름"
                  value={name}
                  onChange={(e) => setUserName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="id"
                  label="아이디"
                  value={id}
                  onChange={(e) => setUserId(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="비밀번호"
                  id="password"
                  value={password}
                  onChange={(e) => setUserPassword(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="이메일"
                  value={email}
                  onChange={(e) => setUserEmail(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="phone"
                  label="전화번호"
                  value={phone_number}
                  onChange={(e) => setUserPhone(e.target.value)}
                />
              </Grid>
              {title.map((item, index) => (
                <Grid item xs={12} key={index}>
                  <TextField
                    required
                    fullWidth
                    id={`title-${index}`}
                    label={`제목 ${index + 1}`}
                    value={item} // item으로 각 제목을 가져옴
                    onChange={(e) => {
                      const newTitle = [...title];
                      newTitle[index] = e.target.value; // 제목 수정 가능
                      setProjectTitle(newTitle);
                    }}
                  />
                </Grid>
              ))}
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              수정하기
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
