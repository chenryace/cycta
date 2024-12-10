import React, { useEffect } from 'react';
import { LoginForm } from './components/auth/LoginForm';
import { ImageUploader } from './components/upload/ImageUploader';
import { useAuthStore } from './store/authStore';
import { Button } from './components/ui/Button';
import toast, { Toaster } from 'react-hot-toast';

function App() {
  const { isAuthenticated, signOut, login, isLoading, error } = useAuthStore();

  const handleSignOut = async () => {
    await signOut();
    toast.success('已成功退出登录');
  };

  const handleSignIn = async (inputPassword: string) => {
    login(inputPassword);
    if (isAuthenticated) {
      toast.success('已成功登录');
    } else {
      toast.error(error || '登录失败');
    }
  };

  useEffect(() => {
    // 页面加载时检查用户认证状态
    if (isAuthenticated) {
      document.getElementById('signInBtn')?.classList.add('hidden');
      document.getElementById('signOutBtn')?.classList.remove('hidden');
    } else {
      document.getElementById('signInBtn')?.classList.remove('hidden');
      document.getElementById('signOutBtn')?.classList.add('hidden');
    }
  }, [isAuthenticated]);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Toaster position="top-right" />

      <div className="max-w-4xl mx-auto px-4 py-8">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Plex 图床</h1>
          <div>
            {/* 动态显示登录和退出按钮 */}
            <Button
              id="signInBtn"
              variant="primary"
              onClick={() => handleSignIn('your-password-here')} // 在这里传入密码
              className="hidden"
            >
              登录
            </Button>
            <Button
              id="signOutBtn"
              variant="danger"
              onClick={handleSignOut}
              className="hidden"
            >
              退出登录
            </Button>
          </div>
        </header>

        {isAuthenticated ? (
          <div>
            {/* 图片上传区域 */}
            <div className="bg-gray-800 p-6 rounded-lg shadow-md mb-8">
              <h2 className="text-2xl font-semibold mb-4">上传您的图片</h2>
              <ImageUploader />
            </div>
          </div>
        ) : (
          <div className="bg-gray-800 p-6 rounded-lg shadow-md">
            <LoginForm onSubmit={handleSignIn} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
