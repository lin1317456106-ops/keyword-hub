'use client';

import Link from 'next/link';
import { BarChart3, Search, TrendingUp, Zap, Shield, Users } from 'lucide-react';
import { useLanguage } from '@/contexts/language-context';

export default function FeaturesPage() {
  const { t } = useLanguage();

  const features = [
    {
      icon: Search,
      title: '智能关键词分析',
      description: '基于Google Trends数据，提供准确的关键词搜索量、竞争度和趋势分析，帮助您发现最有价值的关键词机会。',
      benefits: ['实时数据更新', '多维度分析', '竞争度评估']
    },
    {
      icon: TrendingUp,
      title: '趋势预测分析',
      description: '12个月历史数据可视化，智能预测关键词未来趋势，让您抢占先机，制定前瞻性的SEO策略。',
      benefits: ['趋势图表', '季节性分析', '增长预测']
    },
    {
      icon: Zap,
      title: '快速批量查询',
      description: '5秒内完成关键词分析，支持批量导入查询，大幅提升工作效率，让您专注于策略制定而非数据收集。',
      benefits: ['秒级响应', '批量处理', 'CSV导出']
    },
    {
      icon: Users,
      title: '相关词挖掘',
      description: '智能发现长尾关键词和相关搜索词，扩大您的关键词库，发现更多流量机会和内容创作灵感。',
      benefits: ['长尾词发现', '语义关联', '搜索建议']
    },
    {
      icon: Shield,
      title: '数据安全保障',
      description: '企业级数据加密和隐私保护，您的搜索历史和敏感信息得到全方位保护，安心使用无忧虑。',
      benefits: ['加密传输', '隐私保护', '数据安全']
    },
    {
      icon: BarChart3,
      title: '专业分析报告',
      description: '生成详细的关键词分析报告，包含竞争分析、优化建议和执行策略，为您的SEO决策提供专业指导。',
      benefits: ['详细报告', '优化建议', '策略指导']
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 头部区域 */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              强大的功能特性
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              KeywordHub 提供专业级的关键词研究工具，助力您的SEO成功
            </p>
          </div>
        </div>
      </div>

      {/* 功能列表 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 mb-4">
                {feature.description}
              </p>
              <ul className="space-y-2">
                {feature.benefits.map((benefit, idx) => (
                  <li key={idx} className="flex items-center text-sm text-gray-500">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></div>
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* CTA区域 */}
      <div className="bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              立即体验这些强大功能
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              免费注册，获得每日10次查询额度
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/search"
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
              >
                免费开始使用
              </Link>
              <Link
                href="/pricing"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
              >
                查看定价方案
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}