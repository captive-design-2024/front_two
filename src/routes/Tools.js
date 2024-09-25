//임시 미사용 코드(폐기 예정)
import React, { useState } from 'react';
import { Button, Label, Input, Textarea, Select, Audio } from '../components/Components';

export const Tools = () => {
  const [subtitles, setSubtitles] = useState(''); 

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
    <div className="bg-white text-gray-900 min-h-screen">
      <header className="bg-white text-gray-900 py-4 px-6 text-xl font-bold flex justify-between items-center">
      부가 기능
        <Button variant="outline" className="hover:bg-gray-200">
          + 자막 불러오기
        </Button>
      </header>

      
      <div className="p-4">
  <h2 className="text-xl font-bold mb-4">불러온 자막</h2>  
  <Textarea
    id="subtitle-input"
    rows={5}
    value={subtitles}
    onChange={(e) => setSubtitles(e.target.value)}
    placeholder="여기에 자막을 입력하세요..."
  />
</div>



      <div className="flex h-[80vh]">
        <div className="w-1/2 p-4 overflow-auto">
          <div className="bg-white rounded-lg shadow-md p-4 border border-gray-300">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-xl font-bold">제목 및 태그 추천</h2>
              <Button variant="outline" className="hover:bg-gray-200">
                추천받기
              </Button>
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
                <Button variant="outline" className="hover:bg-gray-200">
                  취소
                </Button>
                <Button variant="solid" className="hover:bg-blue-600">
                  저장
                </Button>
                <Button variant="solid" className="hover:bg-blue-600">
                  업로드
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="w-1/2 p-4 overflow-auto">
          <div className="bg-white rounded-lg shadow-md p-4 border border-gray-300">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-xl font-bold">자막 번역</h2>
              <div className="flex space-x-2">
                <Select id="translation-language" options={languageOptions} />
                <Button variant="outline" className="hover:bg-gray-200">
                  번역
                </Button>
              </div>
            </div>
            <div className="grid gap-4">
              <div>
                <Label htmlFor="translation">자막 번역</Label>
                <Textarea
                  id="translation"
                  rows={5}
                  defaultValue={`0:11 This morning, I ate bread in my mouth

0:15 Start your day exactly the same

0:20 Iced americano in one hand all day long

0:25 I'm so tired

0:28 Did you see this scene in your dream yesterday

0:32 Oh, it's always been a day

0:36 On a common day in this busy life

0:41 When I saw him

0:44 The peaceful sky collapsed

0:49 As my dark eyes turn red

0:53 I think I forgot something

0:57 I feel like I'm going to cry for no reason

1:02 I think it's better to let it go

1:05 I don't like to think about it`}
                />
              </div>
              <div>
                <Label htmlFor="voice">AI 보이스</Label>
                <div className="flex items-center justify-between">
                  <Audio src="generated-voice.mp3" />
                  <Button variant="outline" className="hover:bg-gray-200">
                    생성
                  </Button>
                </div>
              </div>
              <div className="mt-1" />
              <div className="flex justify-end space-x-2">
                <Button variant="outline" className="hover:bg-gray-200">
                  취소
                </Button>
                <Button variant="solid" className="hover:bg-blue-600">
                  저장
                </Button>
                <Button variant="solid" className="hover:bg-blue-600">
                  업로드
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tools;
