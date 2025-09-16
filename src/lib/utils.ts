import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// 合并CSS类名
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// 格式化数字
export function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
}

// 格式化日期
export function formatDate(date: string | Date): string {
  const d = new Date(date);
  return d.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

// 验证关键词格式
export function validateKeyword(keyword: string): {
  isValid: boolean;
  error?: string;
} {
  if (!keyword || keyword.trim().length === 0) {
    return { isValid: false, error: '关键词不能为空' };
  }

  if (keyword.length > 50) {
    return { isValid: false, error: '关键词长度不能超过50个字符' };
  }

  // 简化验证，只检查基本条件
  // 允许所有Unicode字符，只禁止一些明显不合适的字符
  const invalidChars = /[<>"\\'`]/;
  if (invalidChars.test(keyword)) {
    return { isValid: false, error: '关键词包含不支持的特殊字符' };
  }

  return { isValid: true };
}

// 清理关键词
export function cleanKeyword(keyword: string): string {
  return keyword
    .trim()
    .replace(/\s+/g, ' ') // 多个空格合并为一个
    .replace(/[<>"\\'`]/g, ''); // 移除危险字符
}

// 生成随机ID
export function generateId(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}