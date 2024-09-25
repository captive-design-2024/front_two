import React, { useState } from 'react';
import { Button, Label, Textarea, Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem, Input, Select, Audio} from '../components/Components';

export const Edit = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [showModal, setShowModal] = useState(false); // 모달 상태 추가
  const [fileName, setFileName] = useState(""); // 파일 이름 저장

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleInputFocus = () => {
    setIsFocused(true);
  };

  const handleInputBlur = () => {
    setIsFocused(false);
  };

  // 더미 데이터
  const words = [
    { word: "단어 1", suggestion: "대체 단어 1" },
    { word: "단어 2", suggestion: "대체 단어 2" },
    { word: "단어 3", suggestion: "대체 단어 3" },
    { word: "단어 4", suggestion: "대체 단어 4" },
    { word: "단어 5", suggestion: "대체 단어 5" },
    { word: "단어 6", suggestion: "대체 단어 6" },
    { word: "단어 7", suggestion: "대체 단어 7" },
    { word: "단어 8", suggestion: "대체 단어 8" },
    { word: "단어 9", suggestion: "대체 단어 9" },
    { word: "단어 10", suggestion: "대체 단어 10" },
  ];

  const filteredWords = words.filter(
    (item) => item.word.includes(searchTerm) || item.suggestion.includes(searchTerm)
  );

  const languageOptions = [
    { value: "", label: "언어 선택", disabled: true },
    { value: "en", label: "영어" },
    { value: "es", label: "스페인어" },
    { value: "fr", label: "프랑스어" },
    { value: "de", label: "독일어" },
    { value: "ja", label: "일본어" },
    { value: "zh", label: "중국어" },
  ];

  return (
    <div className="w-full bg-white">
      {/* 상단 페이지: 자막 편집 */}
      <div className="bg-white">
        <header className="bg-white text-gray-900 py-4 px-6 text-xl font-bold flex justify-between items-center">
          자막 편집
          <Button
            variant="outline"
            className="hover:bg-gray-200"
            onClick={() => {
              setFileName(""); // 모달을 열 때마다 입력된 내용을 초기화
              setShowModal(true);
            }}
          >
            + 자막 추가
          </Button>
        </header>
        <div className="flex bg-white">
          <div className="w-1/2 p-4">
            <div className="bg-white rounded-lg shadow-md p-4 border border-gray-300">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-xl font-bold text-black">자막 수정</h2>
                <div className="flex space-x-2">
                <Button variant="outline" size="sm">생성</Button>
                <Button variant="solid" size="sm">점검</Button>
                </div>
              </div>
              <div className="grid gap-4">
                <div>
                  <Label htmlFor="content">영상 자막</Label>
                  <Textarea
                    id="content"
                    rows={5}
                    defaultValue={`0:11 오늘도 아침엔 입에 빵을 물고

0:15 똑같이 하루를 시작하고...

1:05 나는 생각은 딱 질색이니까`}
                  />
                </div>
                <div className="relative">
                  <Command>
                    <CommandInput
                      placeholder="단어를 수정하세요..."
                      onChange={handleInputChange}
                      onFocus={handleInputFocus}
                      onBlur={handleInputBlur}
                    />
                    {isFocused && (
                      <CommandList>
                        {filteredWords.length === 0 ? (
                          <CommandEmpty>No results found.</CommandEmpty>
                        ) : (
                          <CommandGroup>
                            {filteredWords.map((item, index) => (
                              <CommandItem key={index}>
                                <Button variant="solid" size="sm" className="mr-2">수정</Button>
                                <span>{item.word}</span>
                                <span className="ml-2 text-gray-500">(추천: {item.suggestion})</span>
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        )}
                      </CommandList>
                    )}
                  </Command>
                </div>
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
              <div className="relative w-full h-0 pb-[56.25%]">
                <iframe
                  src="https://www.youtube.com/embed/ATK7gAaZTOM?"
                  className="absolute top-0 left-0 w-full h-full"
                  frameBorder="0"
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        </div>

        {/* 자막 추가 모달 */}
        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded shadow-lg">
              <h2 className="text-xl font-bold text-black mb-4">영상 선택</h2>
              <input 
                type="text" 
                placeholder="영상 제목을 입력하세요.." 
                className="border bg-white p-2 w-full mb-4"
              />

              <input 
                type="text" 
                placeholder="영상 링크를 입력하세요.." 
                value={fileName} 
                onChange={(e) => setFileName(e.target.value)} 
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
                  onClick={() => {
                    // 유튜브 URL 처리 로직
                    setShowModal(false); // 모달 닫기
                  }}
                >
                  업로드
                </Button>
              </div>
            </div>
          </div>
        )}
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
                <Button variant="outline" className="hover:bg-gray-200">추천받기</Button>
              </div>
              <div className="grid gap-4">
                <div>
                  <Label htmlFor="title">추천 제목</Label>
                  <Input id="title" defaultValue="제목 1" />
                </div>
                <div>
                  <Label htmlFor="tags">추천 태그</Label>
                  <Input id="tags" defaultValue="# 태그 1" />
                  <Input id="tags" defaultValue="# 태그 2" />
                  <Input id="tags" defaultValue="# 태그 3" />
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
                  <Select id="translation-language" options={languageOptions} className="mr-2" />
                  <Button variant="outline" className="hover:bg-gray-200">번역</Button>
                </div>
              </div>
              <div className="grid gap-4">
                <div>
                  <Label htmlFor="translation">번역 자막</Label>
                  <Textarea
                    id="translation"
                    rows={5}
                    defaultValue={`0:11 This morning, I ate bread in my mouth

0:15 Start your day exactly the same...

1:05 I don't like to think about it`}
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