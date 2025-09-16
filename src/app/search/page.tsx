'use client';

import { useState } from 'react';
import MainLayout from '@/components/layout/main-layout';
import SearchBox from '@/components/search/search-box';
import ResultsDisplay from '@/components/search/results-display';
import { Search, BarChart3, Zap, TrendingUp, Users, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { useLanguage } from '@/contexts/language-context';
import type { KeywordResult } from '@/types';

interface SearchResponse {
  success: boolean;
  data?: {
    keyword: string;
    results: KeywordResult[];
    query_id?: string;
    from_cache?: boolean;
    usage?: {
      current_count: number;
      daily_limit: number;
    };
  };
  error?: string;
  details?: string;
}

export default function SearchPage() {
  const { t, language } = useLanguage();
  const [searchResults, setSearchResults] = useState<SearchResponse['data'] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (keyword: string) => {
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ keyword }),
      });

      const data: SearchResponse = await response.json();

      if (data.success && data.data) {
        setSearchResults(data.data);
      } else {
        setError(data.error || t('search.searchFailed'));
        setSearchResults(null);
      }
    } catch (err) {
      setError(t('search.networkError'));
      setSearchResults(null);
      console.error('Search error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleExport = () => {
    if (!searchResults) return;

    // 生成CSV内容
    const csvContent = generateCSV(searchResults);

    // 下载文件
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `keyword-analysis-${searchResults.keyword}-${new Date().toISOString().split('T')[0]}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const generateCSV = (data: NonNullable<SearchResponse['data']>) => {
    const headers = [t('results.keyword'), t('results.monthlySearch'), t('results.competition'), t('results.dataSource'), t('results.queryTime')];
    const result = data.results[0];
    const row = [
      data.keyword,
      result.search_volume?.toString() || 'N/A',
      result.competition_score?.toString() || 'N/A',
      result.data_source,
      new Date().toISOString()
    ];

    return [headers.join(','), row.join(',')].join('\n');
  };

  const features = [
    {
      icon: Search,
      title: t('search.smartSearch'),
      description: t('search.smartSearchDesc')
    },
    {
      icon: BarChart3,
      title: t('search.trendAnalysis'),
      description: t('search.trendAnalysisDesc')
    },
    {
      icon: Zap,
      title: t('search.fastResponse'),
      description: t('search.fastResponseDesc')
    },
    {
      icon: TrendingUp,
      title: t('search.relatedKeywords'),
      description: t('search.relatedKeywordsDesc')
    }
  ];

  const benefits = t('search.benefits');
  // 确保 benefits 是数组，如果不是则使用空数组作为后备
  const benefitsArray = Array.isArray(benefits) ? benefits : [];
  const exampleKeywords = language === 'zh'
    ? ['SEO工具', 'AI', '电商运营', '短视频', '数字营销']
    : ['SEO Tools', 'AI', 'E-commerce', 'Short Video', 'Digital Marketing'];

  return (
    <MainLayout>
      <div className="min-h-screen bg-gray-50">
        {/* Hero区域 */}
        <div className="bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center mb-12">
              <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                <span className="block">{t('search.title1')}</span>
                <span className="block text-blue-600">{t('search.title2')}</span>
              </h1>
              <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-500">
                {t('search.subtitle')}
              </p>
            </div>

            {/* 搜索区域 */}
            <div className="max-w-4xl mx-auto mb-16">
              <SearchBox
                onSearch={handleSearch}
                isLoading={isLoading}
                placeholder={t('search.placeholder')}
              />

              {/* 示例关键词 */}
              <div className="mt-4 text-center">
                <p className="text-sm text-gray-500 mb-2">{t('search.tryKeywords')}</p>
                <div className="flex flex-wrap justify-center gap-2">
                  {exampleKeywords.map((example) => (
                    <button
                      key={example}
                      onClick={() => handleSearch(example)}
                      className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200 transition-colors"
                      disabled={isLoading}
                    >
                      {example}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          {/* 错误提示 */}
          {error && (
            <div className="mb-8 bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex">
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">{t('search.error')}</h3>
                  <p className="mt-1 text-sm text-red-700">{error}</p>
                </div>
              </div>
            </div>
          )}

          {/* 搜索结果 */}
          {searchResults && (
            <div className="mb-16">
              <ResultsDisplay
                keyword={searchResults.keyword}
                results={searchResults.results}
                queryId={searchResults.query_id}
                onExport={handleExport}
              />
            </div>
          )}

          {/* 功能介绍 */}
          {!searchResults && !isLoading && (
            <div className="space-y-16">
              {/* 功能特性 */}
              <div>
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                    {t('search.powerfulFeatures')}
                  </h2>
                  <p className="mt-4 max-w-3xl mx-auto text-xl text-gray-500">
                    {t('search.professionalTool')}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {features.map((feature, index) => {
                    const Icon = feature.icon;
                    return (
                      <div key={index} className="bg-white p-6 rounded-lg shadow-sm border text-center">
                        <div className="flex justify-center mb-4">
                          <div className="p-3 bg-blue-100 rounded-lg">
                            <Icon className="h-6 w-6 text-blue-600" />
                          </div>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          {feature.title}
                        </h3>
                        <p className="text-gray-600 text-sm">
                          {feature.description}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* 使用价值 */}
              <div className="bg-white rounded-lg shadow-sm border p-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                      {t('search.whyChooseTool')}
                    </h3>
                    <div className="space-y-3">
                      {benefitsArray.map((benefit, index) => (
                        <div key={index} className="flex items-center">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                          <span className="text-gray-700">{benefit}</span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-6">
                      <Link
                        href="/sign-up"
                        className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
                      >
                        <Users className="w-5 h-5 mr-2" />
                        {t('search.registerForMore')}
                      </Link>
                    </div>
                  </div>
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6">
                    <h4 className="text-xl font-semibold text-gray-900 mb-4">
                      {t('search.useCasesTitle')}
                    </h4>
                    <div className="space-y-3 text-sm text-gray-600">
                      <p>• <strong>{t('search.seoSpec')}</strong> {t('search.seoSpecDesc')}</p>
                      <p>• <strong>{t('search.creator')}</strong> {t('search.creatorDesc')}</p>
                      <p>• <strong>{t('search.ecommerce')}</strong> {t('search.ecommerceDesc')}</p>
                      <p>• <strong>{t('search.market')}</strong> {t('search.marketDesc')}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
}