'use client';

import { Globe } from 'lucide-react';
import { useLanguage } from '@/contexts/language-context';

export default function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'zh' ? 'en' : 'zh');
  };

  return (
    <button
      onClick={toggleLanguage}
      className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-500 hover:text-gray-700 transition-colors"
      title={language === 'zh' ? '切换到英文' : 'Switch to Chinese'}
    >
      <Globe className="w-4 h-4 mr-1" />
      <span className="uppercase">{language === 'zh' ? 'EN' : '中文'}</span>
    </button>
  );
}