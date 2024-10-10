import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // useParams 임포트
import axios from 'axios';
import { Button, Label, Textarea, Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem, Input, Select, Audio, Spinner} from '../components/Components';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

// 로딩 팝업 컴포넌트
const LoadingPopup = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-4 rounded shadow-md flex items-center">
        <div>
          <h2 className="text-lg font-bold">로딩중...</h2>
          <p>잠시만 기다려 주세요.</p>
        </div>
        <Spinner className="mr-2" /> {/* Spinner 컴포넌트를 여기에 추가 */}
      </div>
    </div>
  );
};


export const Edit = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [generatedData, setGeneratedData] = useState(""); // 생성된 데이터를 위한 상태 추가
  const [checkedData, setCheckedData] = useState(''); // 서버에서 받아온 데이터를 저장할 상태 추가
  const [recommendtitle, setrecommendTitle] = useState(''); //추천 제목
  const [recommendtag, setrecommendTag] = useState(''); //추천 태그
  const [translation, settranslation] = useState(''); //번역
  const [selectedLanguage, setSelectedLanguage] = useState(''); // 선택한 언어 저장
  const [getlink, setlink] = useState(''); //유튜브 링크
  const [loading, setLoading] = useState(false); // 로딩 상태 추가
  const { projectId } = useParams(); // URL에서 projectId 추출

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token'); // 로컬 스토리지에서 JWT 토큰 가져오기

      try {
        const response = await axios.get(`http://localhost:3000/edit/${projectId}`, {
          headers: {
            Authorization: `Bearer ${token}`, // 헤더에 JWT 토큰 추가
          },
        });
        
        console.log('받은 데이터:', response.data); // 받은 데이터 콘솔에 출력
        setlink(response.data);
        
      } catch (error) {
        console.error('데이터 요청 에러 발생:', error.response?.data || error.message);
      }
    };

    fetchData(); // 데이터 가져오기 호출
  }, [projectId]);


  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleInputFocus = () => {
    setIsFocused(true);
  };

  const handleInputBlur = () => {
    setIsFocused(false);
  };


  const languageOptions = [
    { value: "", label: "언어 선택", disabled: true },
    { value: "en", label: "영어" },
    { value: "es", label: "스페인어" },
    { value: "fr", label: "프랑스어" },
    { value: "de", label: "독일어" },
    { value: "ja", label: "일본어" },
    { value: "zh", label: "중국어" },
  ];
  const handleGenerate = async (event) => {
    event.preventDefault();
    const formData = { content_projectID: projectId };

    setLoading(true); // 로딩 시작

    try {
      await axios.post(`http://localhost:3000/work/generateSub`, formData);
      const readSRTData = { content_projectID: projectId, content_language: "kr" };
      const responseReadSRT = await axios.post(`http://localhost:3000/files/readSRT`, readSRTData);
      setGeneratedData(responseReadSRT.data);
    } catch (error) {
      console.error('에러 발생:', error.response?.data || error.message);
    } finally {
      setLoading(false); // 로딩 종료
    }
  };

  const handleCheck = async () => {
    try {
      // 보낼 데이터를 콘솔에서 확인
      console.log('보내는 데이터:', generatedData);
  
      // axios.post 요청 실행
      const response = await axios.post('http://localhost:4000/llm/check', { content: generatedData });
  
      // 서버 응답 출력
      console.log('서버 응답:', response.data);
      setCheckedData(response.data); // 서버 응답 데이터를 checkedData에 저장
    
  
    } catch (error) {
      console.error('에러 발생:', error.response?.data || error.message);
    }
  };
  

  const handleRecommend = async () => {
    try {
      const response = await axios.post('http://localhost:4000/llm/recommend', { content: generatedData });
    
      const data = response.data;

      const title = data.제목 || ''; 
      
      const hashtags = Object.keys(data) 
        .filter(key => key.startsWith('해시태그')) 
        .map(key => data[key].trim()) 

      setrecommendTitle(title);
      setrecommendTag(hashtags);
  
      console.log('추천 제목:', title);
      console.log('추천 태그:', hashtags);
    } catch (error) {
      console.error('추천 요청 에러 발생:', error.response?.data || error.message);
    }
  };
  
  
  const handleTranslation = async () => {
    try {
      // 서버에 번역 요청
      const response = await axios.post('http://localhost:4000/llm/translate', {
        content: generatedData,
        language: selectedLanguage, // 선택한 언어를 함께 전송
      });

      // 서버 응답 처리
      console.log('번역 결과:', response.data);
      settranslation(response.data);
      // 필요에 따라 번역 결과를 상태에 저장하거나 처리
    } catch (error) {
      console.error('번역 요청 에러 발생:', error.response?.data || error.message);
    }
  };

  return (
    <div className="w-full bg-white">
      {/* 상단 페이지: 자막 편집 */}
      <div className="bg-white">
        <header className="bg-white text-gray-900 py-4 px-6 text-xl font-bold flex justify-between items-center">
          자막 편집
        </header>
        <div className="flex bg-white">
          <div className="w-1/2 p-4">
            <div className="bg-white rounded-lg shadow-md p-4 border border-gray-300">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-xl font-bold text-black">자막 수정</h2>
                <div className="flex space-x-2">
                <Button variant="outline" size="sm"onClick={handleGenerate}>생성</Button>
                <Button variant="solid" size="sm" onClick={handleCheck}>점검</Button>
                </div>
              </div>
              <div className="grid gap-4">
                <div>
                  <Label htmlFor="content">영상 자막</Label>
                  <Textarea
                    id="content"
                    rows={5}
                    defaultValue={generatedData}
                  />
                </div>
                <div>
                  <Label htmlFor="content">수정된 자막</Label>
                  <div className="bg-gray-100 border border-gray-300 p-4 rounded-md">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>{checkedData}</ReactMarkdown>
                  </div>
                </div>    
                {loading && <LoadingPopup />} {/* 로딩 중일 때 팝업 표시 */}     
                <div className="mt-7" />
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" size="sm">취소</Button>
                  <Button variant="solid" size="sm">저장</Button>
                  <Button variant="solid" size="sm">업로드</Button>
                </div>
              </div>
            </div>
          </div>
          <div className="w-1/2 p-4">
  <div className="bg-white rounded-lg shadow-md p-4 border border-gray-300">
    
    <h2 className="text-xl font-bold text-black mb-4">영상 미리보기</h2>
    <div className="relative w-full h-0 pb-[56.25%]">
    <iframe
            src={getlink}
            className="absolute top-0 left-0 w-full h-full"
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
      />

    </div>
  </div>
</div>

        </div>

      </div>

      {/* 하단 페이지: 자막 번역 */}
      <div className="bg-white mt-4">
        <header className="bg-white text-gray-900 py-4 px-6 text-xl font-bold flex justify-between items-center">
          번역 및 AI 기능
        </header>
        <div className="flex">
          <div className="w-1/2 p-4">
            <div className="bg-white rounded-lg shadow-md p-4 border border-gray-300">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-xl font-bold text-black">제목 및 태그 추천</h2>
                <Button variant="outline" className="hover:bg-gray-200" onClick={handleRecommend}>추천받기</Button>
             </div>
              <div className="grid gap-4">
                <div>
                  <Label htmlFor="title">추천 제목</Label>
                  <Input id="title" defaultValue={recommendtitle} />
                </div>
                <div>
                  <Label htmlFor="tags">추천 태그</Label>
                  <Input id="tags" defaultValue={recommendtag} />
      
                </div>
                <div className="mt-3" />
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" className="hover:bg-gray-200">취소</Button>
                  <Button variant="solid" className="hover:bg-blue-600">저장</Button>
                </div>
              </div>
            </div>
          </div>
          <div className="w-1/2 p-4">
            <div className="bg-white rounded-lg shadow-md p-4 border border-gray-300">
              <div className="flex items-center justify-between mb-2">
                
                <h2 className="text-xl font-bold text-black">자막 번역</h2>
                <div className="flex space-x-2">
                <Select
                id="translation-language"
                options={languageOptions}
                className="mr-2"
                onChange={(e) => setSelectedLanguage(e.target.value)} // 선택한 언어 상태 업데이트
              />
                  <Button variant="outline" className="hover:bg-gray-200" onClick={handleTranslation}> 번역</Button>
  </div>
              </div>
              <div className="grid gap-4">
                <div>
                  <Label htmlFor="translation">번역 자막</Label>
                  <Textarea
                    id="translation"
                    rows={5}
                    defaultValue={translation}
                  />
                </div>
                <div>
                  <Label htmlFor="voice">AI 보이스 생성</Label>
                  <div className="mt-5" />
                  <div className="flex items-center justify-between mt-4">
                    <Label htmlFor="user-voice" className="mr-2">사용자 음성 TTS</Label>
                    <div className="flex space-x-2">
                      <Button variant="outline" className="hover:bg-gray-200">녹음시작</Button>
                      <Button variant="solid" className="hover:bg-gray-200">녹음중지</Button>
                    </div>
                  </div>
                  <div className="mt-6" />
                  <div className="flex items-center justify-between mt-4">
                    <Audio src="generated-voice.mp3" />
                    <div className="flex space-x-2">
                    <Button variant="outline" className="hover:bg-gray-200">생성</Button>
                    <Button variant="solid" className="hover:bg-gray-200">저장</Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Edit;

