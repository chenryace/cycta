import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // 确保路径正确
import './index.css'; // 确保样式文件也被正确引入

const rootElement = document.getElementById('root') as HTMLElement;

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
