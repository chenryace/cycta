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
    <div className="min-h-screen bg-gray-900">
      <Toaster position="top-right" />
      {isAuthenticated ? (
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-white">Plex 图床</h1>
            <Button variant="danger" onClick={handleSignOut}>
              退出登录
            </Button>
          </div>
          <ImageUploader />
        </div>
      ) : (
        <LoginForm />
      )}
    </div>
  );
}

export default App;