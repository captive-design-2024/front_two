import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Components';
import axios from 'axios';

const baseAddress = "http://localhost:3000";

export const Mypage = () => {
  const navigate = useNavigate();
  const [subtitles, setSubtitles] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [title, setProjectName] = useState('');
  const [url, setProjectUrl] = useState('');
  const [userData, setUserData] = useState({ name: '', email: '' });

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');

      try {
        const response = await axios.get(`${baseAddress}/user/value`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          }
        });
        setUserData({
          name: response.data[0].name,
          email: response.data[0].email,
        });
      } catch (error) {
        console.error('유저 데이터를 가져오는 중 에러 발생:', error);
      }
    };

    const fetchSubtitles = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get(`${baseAddress}/project/title`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          }
        });
        
        const fetchedSubtitles = response.data.projectNames.map((project, index) => ({
          id: response.data.projectIDs[index], // 프로젝트 ID를 추가
          title: `자막 ${index + 1}`,
          summary: project,
          date: new Date().toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' }),
        }));

        setSubtitles(fetchedSubtitles);
      } catch (error) {
        console.error('프로젝트 제목을 가져오는 중 에러 발생:', error);
      }
    };

    fetchUserData();
    fetchSubtitles();
  }, []);

  const handleAddSubtitle = async () => {
    const token = localStorage.getItem('token');
    
    try {
      const response = await axios.post(`${baseAddress}/project`, {
        project_title: title,
        project_url: url,
      }, {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });

      const newSubtitle = {
        id: response.data.id, // 새로 추가된 자막의 ID를 저장
        title: `자막 ${subtitles.length + 1}`,
        summary: title,
        date: new Date().toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' }),
      };

      setSubtitles([...subtitles, newSubtitle]);
      setShowModal(false);
      setProjectName('');
      setProjectUrl('');
    } catch (error) {
      const errorMessage = error.response?.data?.message || '서버 오류가 발생했습니다.';
      console.error('에러 발생:', errorMessage);
      alert(errorMessage);
    }
  };

  const handleDeleteSubtitle = async (index) => {
    const token = localStorage.getItem('token');
    const subtitleToDelete = subtitles[index];
  
    try {
      // 백엔드 API 호출
      await axios.delete(`${baseAddress}/project`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        data: {
          title: subtitleToDelete.summary, // 제목을 요청 본문으로 전송
        },
      });
  
      // UI에서 자막 삭제
      const updatedSubtitles = subtitles.filter((_, i) => i !== index);
      setSubtitles(updatedSubtitles);
    } catch (error) {
      const errorMessage = error.response?.data?.message || '서버 오류가 발생했습니다.';
      console.error('에러 발생:', errorMessage);
      alert(errorMessage);
    }
  };

  const handleEditClick = (projectId) => {
    navigate(`/Edit/${projectId}`);
  };
  

  return (
    <div className="w-full bg-white text-gray-900 min-h-screen">
      <div className="flex flex-col h-screen">
        <header className="bg-white text-gray-900 py-4 px-6 flex justify-between items-center">
          <h2 className="text-xl font-bold">마이페이지</h2>
          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              className="hover:bg-gray-200" 
              onClick={() => setShowModal(true)}
            >
              + 자막 추가
            </Button>
          </div>
        </header>

        <div className="bg-white rounded-lg p-4 border border-gray-300">
          <h2 className="text-xl font-bold">내 정보</h2>
          <p><span className="font-bold">이름: {userData.name}</span></p>
          <p><span className="font-bold">이메일: {userData.email}</span></p>
        </div>

        <div className="flex-1 overflow-auto p-4">
          <div className="grid gap-4">
            {subtitles.map((subtitle, index) => (
              <div key={subtitle.id} className="bg-white rounded-lg shadow-md p-4 border border-gray-300">
                <h2 className="text-xl font-bold mb-2">{subtitle.title}</h2>
                <h3 className="text-sm text-gray-500 mb-2">ID: {subtitle.id}</h3> {/* ID 출력 */}
                <div className="grid gap-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">{subtitle.summary}</h3>
                      <p className="text-sm text-gray-500">{subtitle.date}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleEditClick(subtitle.id)}
                      >
                        자막 기능
                      </Button>
                      <Button 
                        variant="solid" 
                        size="sm" 
                        onClick={() => handleDeleteSubtitle(index)}
                      >
                        삭제
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg">
            <h2 className="text-xl font-bold mb-4">영상 선택</h2>
            <input
              type="text"
              placeholder="영상 제목을 입력하세요.."
              value={title}
              onChange={(e) => setProjectName(e.target.value)}
              className="border bg-white p-2 w-full mb-4"
            />
            <input
              type="text"
              placeholder="영상 URL 입력하세요.."
              value={url}
              onChange={(e) => setProjectUrl(e.target.value)}
              className="border bg-white p-2 w-full mb-4"
            />
            <div className="flex justify-end space-x-2">
              <Button
                variant="outline"
                size="sm"
                className="hover:bg-gray-200"
                onClick={() => setShowModal(false)}
              >
                취소
              </Button>
              <Button
                variant="solid"
                size="sm"
                className="hover:bg-blue-600"
                onClick={handleAddSubtitle}
              >
                추가
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Mypage;
