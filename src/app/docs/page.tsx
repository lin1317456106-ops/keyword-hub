'use client';

import { Code, Key, Book, Zap } from 'lucide-react';
import { useLanguage } from '@/contexts/language-context';

export default function DocsPage() {
  const { t } = useLanguage();

  const endpoints = [
    {
      method: 'GET',
      path: '/api/keywords/search',
      description: '搜索关键词并获取分析数据',
      parameters: [
        { name: 'keyword', type: 'string', required: true, description: '要分析的关键词' },
        { name: 'region', type: 'string', required: false, description: '地区代码，默认为CN' },
        { name: 'lang', type: 'string', required: false, description: '语言代码，默认为zh-CN' }
      ]
    },
    {
      method: 'GET',
      path: '/api/keywords/related',
      description: '获取相关关键词推荐',
      parameters: [
        { name: 'keyword', type: 'string', required: true, description: '主关键词' },
        { name: 'limit', type: 'number', required: false, description: '返回结果数量，默认为10' }
      ]
    },
    {
      method: 'GET',
      path: '/api/trends/history',
      description: '获取关键词历史趋势数据',
      parameters: [
        { name: 'keyword', type: 'string', required: true, description: '关键词' },
        { name: 'period', type: 'string', required: false, description: '时间周期：3m, 6m, 12m' }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 头部区域 */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              API 文档
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              通过RESTful API集成KeywordHub的强大功能到您的应用中
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* 侧边导航 */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">文档导航</h3>
              <nav className="space-y-2">
                <a href="#getting-started" className="block text-blue-600 hover:text-blue-800">快速开始</a>
                <a href="#authentication" className="block text-gray-600 hover:text-gray-800">身份验证</a>
                <a href="#endpoints" className="block text-gray-600 hover:text-gray-800">API端点</a>
                <a href="#examples" className="block text-gray-600 hover:text-gray-800">代码示例</a>
                <a href="#limits" className="block text-gray-600 hover:text-gray-800">使用限制</a>
              </nav>
            </div>
          </div>

          {/* 主要内容 */}
          <div className="lg:col-span-3 space-y-8">
            {/* 快速开始 */}
            <section id="getting-started" className="bg-white rounded-lg shadow-md p-8">
              <div className="flex items-center mb-6">
                <Zap className="w-6 h-6 text-blue-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">快速开始</h2>
              </div>
              <p className="text-gray-700 mb-4">
                KeywordHub API 提供简单易用的RESTful接口，让您轻松集成关键词分析功能。
              </p>
              <div className="bg-gray-100 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-2">基础URL</h4>
                <code className="text-blue-600">https://api.keywordhub.com/v1</code>
              </div>
            </section>

            {/* 身份验证 */}
            <section id="authentication" className="bg-white rounded-lg shadow-md p-8">
              <div className="flex items-center mb-6">
                <Key className="w-6 h-6 text-blue-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">身份验证</h2>
              </div>
              <p className="text-gray-700 mb-4">
                所有API请求都需要在请求头中包含API密钥：
              </p>
              <div className="bg-gray-900 text-green-400 rounded-lg p-4 mb-4">
                <pre><code>{`curl -H "Authorization: Bearer YOUR_API_KEY" \\
     https://api.keywordhub.com/v1/keywords/search?keyword=SEO`}</code></pre>
              </div>
              <p className="text-sm text-gray-600">
                您可以在用户中心的"API设置"页面获取您的API密钥。
              </p>
            </section>

            {/* API端点 */}
            <section id="endpoints" className="bg-white rounded-lg shadow-md p-8">
              <div className="flex items-center mb-6">
                <Book className="w-6 h-6 text-blue-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">API端点</h2>
              </div>

              {endpoints.map((endpoint, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-6 mb-6">
                  <div className="flex items-center mb-4">
                    <span className={`px-3 py-1 rounded text-xs font-semibold mr-3 ${
                      endpoint.method === 'GET' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                    }`}>
                      {endpoint.method}
                    </span>
                    <code className="text-gray-800 font-mono">{endpoint.path}</code>
                  </div>
                  <p className="text-gray-700 mb-4">{endpoint.description}</p>

                  <h4 className="font-semibold text-gray-900 mb-2">参数：</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-2">参数名</th>
                          <th className="text-left py-2">类型</th>
                          <th className="text-left py-2">必需</th>
                          <th className="text-left py-2">说明</th>
                        </tr>
                      </thead>
                      <tbody>
                        {endpoint.parameters.map((param, idx) => (
                          <tr key={idx} className="border-b">
                            <td className="py-2 font-mono">{param.name}</td>
                            <td className="py-2">{param.type}</td>
                            <td className="py-2">{param.required ? '是' : '否'}</td>
                            <td className="py-2">{param.description}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
            </section>

            {/* 代码示例 */}
            <section id="examples" className="bg-white rounded-lg shadow-md p-8">
              <div className="flex items-center mb-6">
                <Code className="w-6 h-6 text-blue-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">代码示例</h2>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">JavaScript (Fetch)</h4>
                  <div className="bg-gray-900 text-green-400 rounded-lg p-4">
                    <pre><code>{`const response = await fetch('https://api.keywordhub.com/v1/keywords/search?keyword=SEO', {
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  }
});
const data = await response.json();
console.log(data);`}</code></pre>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Python (Requests)</h4>
                  <div className="bg-gray-900 text-green-400 rounded-lg p-4">
                    <pre><code>{`import requests

headers = {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
}

response = requests.get(
    'https://api.keywordhub.com/v1/keywords/search',
    params={'keyword': 'SEO'},
    headers=headers
)

data = response.json()
print(data)`}</code></pre>
                  </div>
                </div>
              </div>
            </section>

            {/* 使用限制 */}
            <section id="limits" className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">使用限制</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">免费版</h4>
                  <ul className="text-gray-700 space-y-1">
                    <li>• 每小时100次请求</li>
                    <li>• 每日1000次请求</li>
                    <li>• 基础数据访问</li>
                  </ul>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">专业版</h4>
                  <ul className="text-gray-700 space-y-1">
                    <li>• 每小时1000次请求</li>
                    <li>• 每日10000次请求</li>
                    <li>• 全功能访问</li>
                  </ul>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}