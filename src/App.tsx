import React from 'react';
import { LoginForm } from './components/auth/LoginForm';
import { ImageUploader } from './components/upload/ImageUploader';
import { useAuthStore } from './store/authStore';
import { Button } from './components/ui/Button';
import toast, { Toaster } from 'react-hot-toast';

function App() {
  const { isAuthenticated, signOut } = useAuthStore();

  const handleSignOut = async () => {
    await signOut();
    toast.success('已成功退出登录');
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Toaster position="top-right" />
      
      <div className="max-w-4xl mx-auto px-4 py-8">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Plex 图床</h1>
          
          {isAuthenticated && (
            <Button variant="danger" onClick={handleSignOut}>
              退出登录
            </Button>
          )}
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
            <LoginForm />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
