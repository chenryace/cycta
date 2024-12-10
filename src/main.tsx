import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // 引入主组件 App.tsx
import './index.css'; // 引入全局样式 index.css

// 确保你的 index.html 中有 <div id="app"></div>，这里是挂载点
const root = ReactDOM.createRoot(document.getElementById('app') as HTMLElement);

// 渲染 React 应用
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
