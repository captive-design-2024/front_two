import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Components';
import axios from 'axios';

const baseAddress = "http://localhost:3000";

export const Mypage = () => {
  const navigate = useNavigate(); // useNavigate 훅을 사용하여 페이지 이동
  const [subtitles, setSubtitles] = useState([
    { title: '자막 1', summary: '영상 제목 1', date: '2024년 8월 1일' },
    { title: '자막 2', summary: '영상 제목 2', date: '2024년 8월 2일' },
    { title: '자막 3', summary: '영상 제목 3', date: '2024년 8월 3일' },
  ]);
  const [showModal, setShowModal] = useState(false);
  const [name, setProjectName] = useState(''); // "영상 제목을 입력하세요" 입력값 저장
  const [url, setProjectUrl] = useState('');   // "영상 링크를 입력하세요" 입력값 저장

  const handleAddSubtitle = async () => {
    const newSub = {
      project_name : name,
      project_url : url,
      
      date: new Date().toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' }),
    };

    // 서버에 자막 데이터 전송
    try {
      const response = await axios.post(`${baseAddress}/project`, {
        project_name : name,
        project_url : url,
      });
      console.log('서버 응답:', response.data);

      // 응답이 성공적이면 subtitles 상태에 추가
      setSubtitles([...subtitles, newSub]);
      setShowModal(false);
      setProjectName(''); // 상태 초기화
      setProjectUrl('');  // 상태 초기화
    } catch (error) {
      const errorMessage = error.response?.data?.message || '서버 오류가 발생했습니다.'; // 오류 메시지 정의
      console.error('에러 발생:', errorMessage);
      alert(errorMessage); // 서버에서 받은 에러 메시지로 알림 표시
    }
  };

  const handleDeleteSubtitle = (index) => {
    const updatedSubtitles = subtitles.filter((_, i) => i !== index);
    setSubtitles(updatedSubtitles);
  };

  const handleEditClick = () => {
    navigate('/Edit'); // 자막 편집 페이지로 이동
  };

  return (
    <div className="w-full bg-white text-gray-900 min-h-screen">
      <div className="flex flex-col h-screen">
        <header className="bg-white text-gray-900 py-4 px-6 flex justify-between items-center">
          <h2 className="text-xl font-bold">마이페이지</h2>
          <Button 
            variant="outline" 
            className="hover:bg-gray-200" 
            onClick={() => setShowModal(true)}
          >
            + 자막 추가
          </Button>
        </header>
        <div className="bg-white rounded-lg p-4 border border-gray-300">
          <h2 className="text-xl font-bold">내 정보</h2>
          <p><span className="font-bold">이름: 유튜브</span></p>
          <p><span className="font-bold">채널: 유튜브의 일상</span></p>
          <p><span className="font-bold">이메일: youtube@gmail.com</span></p>
        </div>
        <div className="flex-1 overflow-auto p-4">
          <div className="grid gap-4">
            {subtitles.map((subtitle, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-4 border border-gray-300">
                <h2 className="text-xl font-bold mb-2">{subtitle.title}</h2>
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
                        onClick={handleEditClick} // 자막 편집 버튼 클릭 시 페이지 이동
                      >
                        자막 편집
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
              value={name} // project_name 상태에 바인딩
              onChange={(e) => setProjectName(e.target.value)} // 입력값 변경 시 상태 업데이트
              className="border bg-white p-2 w-full mb-4"
            />
            <input
              type="text"
              placeholder="영상 링크를 입력하세요.."
              value={url} // project_url 상태에 바인딩
              onChange={(e) => setProjectUrl(e.target.value)} // 입력값 변경 시 상태 업데이트
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
