import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Components';

const Home = ({ isLoggedIn }) => {
  const navigate = useNavigate();

  const handleStartClick = () => {
    if (isLoggedIn) {
      navigate('/Edit'); // 로그인이 되어 있으면 /Edit 페이지로 이동
    } else {
      alert('로그인이 필요합니다!'); // 로그인이 안 되어 있으면 경고 메시지
      navigate('/Login'); // 로그인 페이지로 이동
    }
  };

  return (
    <div className="w-full">
      <div className="relative h-[92vh] overflow-hidden">
        <img src="/IMG_2535.jpeg" alt="Main Content" className="object-cover w-full h-full" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
          <h2 className="text-4xl font-bold mb-4">YouTube 영상의 자막을 쉽게 관리하세요</h2>
          <p className="text-lg mb-6">업로드한 동영상의 자막을 간편하게 수정하고 번역할 수 있습니다.</p>
          <div className="flex justify-start">
            <Button
              variant="solid"
              className="bg-red-500 hover:bg-red-600 text-white px-12 py-3 text-lg font-bold"
              onClick={handleStartClick} // 클릭 시 페이지 이동 핸들러
            >
              시작하기
            </Button>
          </div>
        </div>
      </div>
      <section className="bg-gray-100 py-12">
        <div className="container mx-auto px-6">
          <h2 className="text-2xl font-bold mb-4 text-center text-gray-900">Why Use SubHelper?</h2>
          <div className="mt-20" />
          <p className="text-lg text-gray-900 text-center">
            유튜브의 자동자막 생성 기능은 정확도가 처참한 것으로 유명합니다.<br /><br />
            몇몇 사람들을 제외하고는 딕션이 그렇게 정확하지 못하기 때문에 나타나는 문제입니다.<br /><br />
            이때문에 유튜버 중에는 직접 자막을 입력해 영상을 업로드하는 경우가 많습니다.<br /><br />
            하지만 사람이 직접 입력하는 자막은 항상 오타가 동반될 수 밖에 없습니다.<br /><br />
            이러한 문제를 간편하게 해결하고자 저희는 유튜브 영상 업로더를 대상으로 하는<br /><br />
            유튜브 영상의 자막 오류 수정, 자막 기반 영상 제목 및 태그 추천,<br /><br />
            자막 번역 및 AI 보이스 추가 기능을 구현해 보았습니다.

          </p>
        </div>
      </section>
      <footer className="bg-gray-900 text-white py-6 px-6">
        <div className="container mx-auto flex flex-col items-center space-y-8">
          <div className="flex items-center" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-8 h-8 mr-2 text-red-500"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M23.498 6.186a2.92 2.92 0 0 0-2.055-2.057C19.747 3.5 12 3.5 12 3.5s-7.747 0-9.443.629a2.92 2.92 0 0 0-2.055 2.057c-.586 3.303-.586 6.814-.586 6.814s0 3.511.586 6.814a2.92 2.92 0 0 0 2.055 2.057c1.696.629 9.443.629 9.443.629s7.747 0 9.443-.629a2.92 2.92 0 0 0 2.055-2.057c.586-3.303.586-6.814.586-6.814s0-3.511-.586-6.814ZM9.75 15.417V8.583L15.75 12 9.75 15.417Z" />
            </svg>
            <span className="text-sm cursor-pointer">YouTube SubHelper</span>
          </div>
          <div className="grid grid-cols-4 gap-24">
            <div className="flex flex-col items-center">
              <div className="text-sm font-bold">Developer</div>
              <div className="text-sm font-bold">정준석</div>
              <div className="text-sm">junseok@gmail.com</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-sm font-bold">Developer</div>
              <div className="text-sm font-bold">이재용</div>
              <div className="text-sm">jaeyong@gmail.com</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-sm font-bold">Developer</div>
              <div className="text-sm font-bold">최원석</div>
              <div className="text-sm">wonseok@gmail.com</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-sm font-bold">Developer</div>
              <div className="text-sm font-bold">김범서</div>
              <div className="text-sm">beomseo@gmail.com</div>
            </div>
          </div>
          <div className="flex items-center space-x-4 mt-4">
            <div className="w-full border-b border-gray-600" />
          </div>
          <div className="flex items-center space-x-4">
          <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer" className="text-sm hover:underline">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 mr-1"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M23.498 6.186a2.92 2.92 0 0 0-2.055-2.057C19.747 3.5 12 3.5 12 3.5s-7.747 0-9.443.629a2.92 2.92 0 0 0-2.055 2.057c-.586 3.303-.586 6.814-.586 6.814s0 3.511.586 6.814a2.92 2.92 0 0 0 2.055 2.057c1.696.629 9.443.629 9.443.629s7.747 0 9.443-.629a2.92 2.92 0 0 0 2.055-2.057c.586-3.303.586-6.814.586-6.814s0-3.511-.586-6.814ZM9.75 15.417V8.583L15.75 12 9.75 15.417Z" />
            </svg>
          </a>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-sm hover:underline">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 mr-1"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 0C5.373 0 0 5.373 0 12c0 5.304 3.438 9.79 8.207 11.388.6.112.827-.259.827-.577v-2.168c-3.338.724-4.042-1.61-4.042-1.61-.546-1.39-1.334-1.762-1.334-1.762-1.091-.748.083-.733.083-.733 1.205.085 1.834 1.235 1.834 1.235 1.07 1.832 2.809 1.303 3.492.997.108-.775.418-1.303.763-1.602-2.664-.303-5.467-1.332-5.467-5.934 0-1.309.467-2.378 1.236-3.22-.124-.303-.536-1.526.117-3.177 0 0 1.003-.32 3.287 1.228a11.418 11.418 0 0 1 3.002-.404c1.02.005 2.048.137 3.002.404 2.287-1.549 3.287-1.228 3.287-1.228.653 1.651.242 2.874.118 3.177.77.842 1.236 1.91 1.236 3.22 0 4.612-2.806 5.632-5.478 5.927.43.371.818 1.105.818 2.23v3.293c0 .322.225.693.832.576C20.565 21.79 24 17.305 24 12 24 5.373 18.627 0 12 0z" />
            </svg>
          </a>
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="text-sm hover:underline">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 mr-1"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2.5c-3.033 0-3.389.012-4.575.066-1.195.055-2.037.248-2.835.533-.838.315-1.492.743-2.15 1.4-.658.658-1.086 1.312-1.4 2.15-.285.798-.478 1.64-.533 2.835C2.512 8.611 2.5 8.967 2.5 12c0 3.033.012 3.389.066 4.575.055 1.195.248 2.037.533 2.835.315.838.743 1.492 1.4 2.15.658.658 1.312 1.086 2.15 1.4.798.285 1.64.478 2.835.533C8.611 21.488 8.967 21.5 12 21.5c3.033 0 3.389-.012 4.575-.066 1.195-.055 2.037-.248 2.835-.533.838-.315 1.492-.743 2.15-1.4.658-.658 1.086-1.312 1.4-2.15.285-.798.478-1.64.533-2.835.055-1.185.066-1.541.066-4.575s-.012-3.389-.066-4.575c-.055-1.195-.248-2.037-.533-2.835-.315-.838-.743-1.492-1.4-2.15-.658-.658-1.312-1.086-2.15-1.4-.798-.285-1.64-.478-2.835-.533C15.389 2.512 15.033 2.5 12 2.5zm0 1.5c2.98 0 3.344.012 4.529.065 1.121.054 1.891.25 2.524.545.706.324 1.232.78 1.804 1.34.573.573 1.018 1.097 1.34 1.804.295.633.491 1.403.545 2.524.053 1.185.065 1.549.065 4.529s-.012 3.344-.065 4.529c-.054 1.121-.25 1.891-.545 2.524-.324.706-.78 1.232-1.34 1.804-.573.573-1.097 1.018-1.804 1.34-.633.295-1.403.491-2.524.545-1.185.053-1.549.065-4.529.065-2.98 0-3.344-.012-4.529-.065-1.121-.054-1.891-.25-2.524-.545-.706-.324-1.232-.78-1.804-1.34-.573-.573-1.018-1.097-1.34-1.804-.295-.633-.491-1.403-.545-2.524-.053-1.185-.065-1.549-.065-4.529s.012-3.344.065-4.529c.054-1.121.25-1.891.545-2.524.324-.706.78-1.232 1.34-1.804.573-.573 1.097-1.018 1.804-1.34.633-.295 1.403-.491 2.524-.545 1.185-.053 1.549-.065 4.529-.065zm0 4.1a4.9 4.9 0 1 0 0 9.8 4.9 4.9 0 0 0 0-9.8zm0 1.5a3.4 3.4 0 1 1 0 6.8 3.4 3.4 0 0 1 0-6.8zm5.075-1.475a.8.8 0 1 1-.001-1.6.8.8 0 0 1 .001 1.6z" />
            </svg>
          </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
