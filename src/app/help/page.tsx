'use client';

import Link from 'next/link';
import { Search, Book, MessageCircle, FileText, Video, Users } from 'lucide-react';
import { useLanguage } from '@/contexts/language-context';

export default function HelpPage() {
  const { t } = useLanguage();

  const helpCategories = [
    {
      icon: Search,
      title: '快速开始',
      description: '了解如何使用KeywordHub进行关键词分析',
      articles: [
        { title: '如何进行第一次关键词搜索', url: '#' },
        { title: '理解搜索结果和数据指标', url: '#' },
        { title: '如何导出分析结果', url: '#' },
        { title: '账户注册和登录指南', url: '#' }
      ]
    },
    {
      icon: Book,
      title: '功能详解',
      description: '深入了解KeywordHub的各项强大功能',
      articles: [
        { title: '趋势分析功能详解', url: '#' },
        { title: '相关关键词发现技巧', url: '#' },
        { title: '竞争度分析方法', url: '#' },
        { title: '批量查询使用指南', url: '#' }
      ]
    },
    {
      icon: FileText,
      title: 'SEO策略',
      description: '学习如何将数据转化为有效的SEO策略',
      articles: [
        { title: '如何选择高价值关键词', url: '#' },
        { title: '长尾关键词挖掘策略', url: '#' },
        { title: '季节性关键词分析', url: '#' },
        { title: '内容营销关键词规划', url: '#' }
      ]
    },
    {
      icon: Video,
      title: '视频教程',
      description: '通过视频快速掌握工具使用方法',
      articles: [
        { title: '关键词搜索基础教程', url: '#' },
        { title: '数据分析实战案例', url: '#' },
        { title: 'SEO策略制定流程', url: '#' },
        { title: '高级功能使用技巧', url: '#' }
      ]
    },
    {
      icon: MessageCircle,
      title: '常见问题',
      description: '查找常见问题的解答',
      articles: [
        { title: '为什么查询次数有限制？', url: '#' },
        { title: '数据更新频率说明', url: '#' },
        { title: '如何联系客服支持？', url: '#' },
        { title: '账户安全设置指南', url: '#' }
      ]
    },
    {
      icon: Users,
      title: '社区支持',
      description: '加入用户社区，获得更多帮助',
      articles: [
        { title: '用户社区讨论区', url: '#' },
        { title: '提交功能建议', url: '#' },
        { title: '报告问题和Bug', url: '#' },
        { title: '分享使用心得', url: '#' }
      ]
    }
  ];

  const quickAnswers = [
    {
      question: '如何开始使用KeywordHub？',
      answer: '您可以直接在搜索页面输入关键词开始分析，或者注册账户获得更多功能和查询次数。'
    },
    {
      question: '免费版有什么限制？',
      answer: '免费版每日提供10次查询机会，包含基础的趋势分析和相关词推荐功能。'
    },
    {
      question: '数据来源是什么？',
      answer: '我们主要使用Google Trends数据，确保数据的权威性和准确性。'
    },
    {
      question: '如何导出分析结果？',
      answer: '在搜索结果页面点击"导出CSV"按钮，即可下载包含所有分析数据的文件。'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 头部区域 */}
      <div className="bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-4">
              帮助中心
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
              找到您需要的答案，快速上手KeywordHub
            </p>

            {/* 搜索框 */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="搜索帮助文档..."
                  className="w-full pl-10 pr-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-blue-300 text-gray-900"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 帮助分类 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {helpCategories.map((category, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <category.icon className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {category.title}
              </h3>
              <p className="text-gray-600 mb-4">
                {category.description}
              </p>
              <ul className="space-y-2">
                {category.articles.map((article, idx) => (
                  <li key={idx}>
                    <Link
                      href={article.url}
                      className="text-blue-600 hover:text-blue-800 text-sm transition-colors"
                    >
                      {article.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* 快速解答区域 */}
      <div className="bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              快速解答
            </h2>
            <p className="text-gray-600">
              最常见问题的快速解答
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {quickAnswers.map((qa, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {qa.question}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {qa.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 联系支持区域 */}
      <div className="bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              还需要帮助？
            </h2>
            <p className="text-gray-600 mb-8">
              我们的客服团队随时为您提供支持
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                联系客服
              </Link>
              <Link
                href="/docs"
                className="border-2 border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:border-blue-500 hover:text-blue-600 transition-colors"
              >
                查看API文档
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}