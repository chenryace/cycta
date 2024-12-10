import toast from 'react-hot-toast';

export const copyToClipboard = async (text: string, message = '已复制到剪贴板'): Promise<void> => {
  try {
    await navigator.clipboard.writeText(text);
    toast.success(message);
  } catch (error) {
    console.error('复制失败:', error);
    toast.error('复制失败，请手动复制');
  }
};