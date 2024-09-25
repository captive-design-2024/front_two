//임시 미사용 코드(Mypage 단어 수정 필요)
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const baseAddress = "http://localhost:3000";

const Sidebar = () => {
  return (
    <div style={{ width: '200px', backgroundColor: '#f0f0f0', padding: '20px' }}> 
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        <li style={{ marginBottom: '20px' }}>
          <Link to="/mypage" style={{ textDecoration: 'none', color: '#333', fontWeight: 'bold' }}>회원 정보</Link>
        </li>
        <li>
          <Link to="/Stats" style={{ textDecoration: 'none', color: '#333', fontWeight: 'bold' }}>내 채널 통계</Link>
        </li>
      </ul>
    </div>
  );
};

export const Mypage = () => {
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('로그인이 필요합니다.');
        navigate('/login');
        return;
      }

      try {
        const response = await axios.post(`${baseAddress}/auth/signup`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data);
      } catch (error) {
        console.error('에러 발생:', error);
        alert('사용자 정보를 가져오는데 실패했습니다.');
        navigate('/login');
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'row', flexGrow: 1 }}>
      <Sidebar />
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexGrow: 1 }}>
        <div style={{ margin: '40px', marginLeft: '-100px' }}>
          <Link to="/mypage">
            <h2 style={{ color: '#333', fontWeight: 'bold', fontSize: '2rem' }}>회원 정보</h2>
          </Link>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'baseline', marginLeft: '10px' }}>
          <label className="input input-bordered flex items-center gap-2" style={{ margin: '10px' }}>
            이름
            <input type="text" className="grow" value={user.name || '이름 가져오기'} readOnly />
          </label>
          <label className="input input-bordered flex items-center gap-2" style={{ margin: '10px' }}>
            아이디
            <input type="text" className="grow" value={user.id || '아이디 가져오기'} readOnly />
          </label>
          <label className="input input-bordered flex items-center gap-2" style={{ margin: '10px' }}>
            현재 비밀번호
            <input type="password" className="grow" placeholder="비밀번호 입력" />
          </label>
          <label className="input input-bordered flex items-center gap-2" style={{ margin: '10px', marginBottom: '50px' }}>
            새로운 비밀번호
            <input type="password" className="grow" placeholder="새로운 비밀번호 입력" />
          </label>
          <div>
            <span style={{ marginRight: '10px' }}>
              <Link to="/mypage">
                <button className="btn btn-outline">회원정보 수정</button>
              </Link>
            </span>
            <span>
              <button className="btn btn-outline" onClick={handleLogout}>로그아웃</button>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mypage;
