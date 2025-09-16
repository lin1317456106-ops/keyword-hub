'use client';

import { useState, useCallback, useEffect } from 'react';
import { Search, Loader2 } from 'lucide-react';
import { validateKeyword } from '@/lib/utils';

interface SearchBoxProps {
  onSearch: (keyword: string) => Promise<void>;
  isLoading: boolean;
  placeholder?: string;
}

export default function SearchBox({ onSearch, isLoading, placeholder = '输入关键词开始分析...' }: SearchBoxProps) {
  const [keyword, setKeyword] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [error, setError] = useState('');

  // 获取搜索建议
  const fetchSuggestions = useCallback(async (query: string) => {
    if (query.length < 2) {
      setSuggestions([]);
      return;
    }

    try {
      const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
      if (response.ok) {
        const data = await response.json();
        setSuggestions(data.suggestions || []);
      }
    } catch (error) {
      console.error('Failed to fetch suggestions:', error);
    }
  }, []);

  // 防抖处理搜索建议
  useEffect(() => {
    const timer = setTimeout(() => {
      if (keyword) {
        fetchSuggestions(keyword);
      } else {
        setSuggestions([]);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [keyword, fetchSuggestions]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 验证输入
    const validation = validateKeyword(keyword);
    if (!validation.isValid) {
      setError(validation.error || '请输入有效的关键词');
      return;
    }

    setError('');
    setShowSuggestions(false);
    await onSearch(keyword.trim());
  };

  const handleSuggestionClick = (suggestion: string) => {
    setKeyword(suggestion);
    setShowSuggestions(false);
    onSearch(suggestion);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setKeyword(value);
    setError('');
    setShowSuggestions(true);
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <input
            type="text"
            value={keyword}
            onChange={handleInputChange}
            onFocus={() => setShowSuggestions(true)}
            placeholder={placeholder}
            className={`w-full px-4 py-3 pl-12 pr-20 text-lg border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              error ? 'border-red-500' : 'border-gray-300'
            }`}
            disabled={isLoading}
            maxLength={50}
          />
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <button
            type="submit"
            disabled={isLoading || !keyword.trim()}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 px-4 py-1.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              '搜索'
            )}
          </button>
        </div>

        {/* 错误提示 */}
        {error && (
          <p className="mt-2 text-sm text-red-600">{error}</p>
        )}

        {/* 字符计数 */}
        <div className="mt-1 text-xs text-gray-500 text-right">
          {keyword.length}/50
        </div>
      </form>

      {/* 搜索建议 */}
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              className="w-full px-4 py-2 text-left hover:bg-gray-50 focus:bg-gray-50 focus:outline-none first:rounded-t-lg last:rounded-b-lg"
            >
              <span className="flex items-center">
                <Search className="w-4 h-4 mr-3 text-gray-400" />
                {suggestion}
              </span>
            </button>
          ))}
        </div>
      )}

      {/* 点击外部关闭建议 */}
      {showSuggestions && (
        <div
          className="fixed inset-0 z-5"
          onClick={() => setShowSuggestions(false)}
        />
      )}
    </div>
  );
}