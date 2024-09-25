import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './routes/Home';
import MyPage from './routes/Mypage';
import Edit from './routes/Edit';
import Login from './routes/Login';
import SignUp from './routes/Signup';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태 관리

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true); // 토큰이 있으면 로그인 상태로 설정
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token'); // 로그아웃 시 토큰 삭제
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <header className="bg-gray-900 text-white py-4 px-6 flex justify-between items-center">
        <div className="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-8 h-8 mr-2 text-red-500"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M23.498 6.186a2.92 2.92 0 0 0-2.055-2.057C19.747 3.5 12 3.5 12 3.5s-7.747 0-9.443.629a2.92 2.92 0 0 0-2.055 2.057c-.586 3.303-.586 6.814-.586 6.814s0 3.511.586 6.814a2.92 2.92 0 0 0 2.055 2.057c1.696.629 9.443.629 9.443.629s7.747 0 9.443-.629a2.92 2.92 0 0 0 2.055-2.057c.586-3.303.586-6.814.586-6.814s0-3.511-.586-6.814ZM9.75 15.417V8.583L15.75 12 9.75 15.417Z" />
          </svg>
          <div className="flex items-center space-x-4">
            <Link to="/Home" className="text-xl font-bold hover:text-gray-300">
              YouTube SubHelper
            </Link>
            <Link to="/Mypage" className="text-gray-300 font-bold text-white px-4 py-2 rounded hover:bg-blue-600">
              마이페이지
            </Link>
            <Link to="/Edit" className="text-gray-300 font-bold text-white px-4 py-2 rounded hover:bg-blue-600">
              자막편집
            </Link>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          {isLoggedIn ? (
            <>
              <Link to="/Edit" className="text-gray-300 text-white px-4 py-2 rounded hover:bg-blue-600 text-sm">
                회원정보 수정
              </Link>
              <button onClick={handleLogout} className="text-gray-300 text-white px-4 py-2 rounded hover:bg-blue-600 text-sm">
                로그아웃
              </button>
            </>
          ) : (
            <>
              <Link to="/Login" className="text-gray-300 text-white px-4 py-2 rounded hover:bg-blue-600 text-sm">
                로그인
              </Link>
              <Link to="/Signup" className="text-gray-300 text-white px-4 py-2 rounded hover:bg-blue-600 text-sm">
                회원가입
              </Link>
            </>
          )}
        </div>
      </header>

      <Routes>
        <Route path="/" element={<Home isLoggedIn={isLoggedIn} />} />
        <Route path="/Home" element={<Home isLoggedIn={isLoggedIn} />} />
        <Route path="/Mypage" element={<MyPage />} />
        <Route path="/Edit" element={<Edit />} />
        <Route path="/Login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/Signup" element={<SignUp />} />
      </Routes>

    </Router>
  );
}

export default App;

