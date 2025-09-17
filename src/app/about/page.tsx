'use client';

import Link from 'next/link';
import { Target, Users, Award, TrendingUp, Globe, Shield } from 'lucide-react';
import { useLanguage } from '@/contexts/language-context';

export default function AboutPage() {
  const { t } = useLanguage();

  const values = [
    {
      icon: Target,
      title: '精准数据',
      description: '基于权威数据源，提供准确可靠的关键词分析结果，让每一个数据都有价值。'
    },
    {
      icon: Users,
      title: '用户至上',
      description: '始终以用户需求为中心，持续优化产品体验，让工具更加易用高效。'
    },
    {
      icon: TrendingUp,
      title: '持续创新',
      description: '紧跟SEO行业发展趋势，不断引入新技术和新功能，保持行业领先地位。'
    },
    {
      icon: Shield,
      title: '安全可靠',
      description: '采用企业级安全措施，保护用户数据隐私，确保服务稳定可靠。'
    }
  ];

  const milestones = [
    {
      year: '2024',
      title: 'KeywordHub 诞生',
      description: '项目启动，致力于为中文SEO市场提供专业工具'
    },
    {
      year: '2024 Q2',
      title: '核心功能上线',
      description: '关键词分析、趋势预测等核心功能正式发布'
    },
    {
      year: '2024 Q3',
      title: '用户突破里程碑',
      description: '用户数量快速增长，获得广泛好评'
    },
    {
      year: '未来',
      title: '持续发展',
      description: '计划推出更多高级功能，服务更多用户'
    }
  ];

  const stats = [
    { number: '10,000+', label: '注册用户', description: '活跃的SEO专员和内容创作者' },
    { number: '500,000+', label: '关键词查询', description: '每月处理的查询次数' },
    { number: '99.9%', label: '服务可用性', description: '稳定可靠的服务保障' },
    { number: '5秒', label: '平均响应时间', description: '快速获得分析结果' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 头部区域 */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              关于 KeywordHub
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              我们致力于为SEO专员和内容创作者提供最专业、最易用的关键词研究工具，
              帮助您发现更多流量机会，制定更有效的SEO策略。
            </p>
          </div>
        </div>
      </div>

      {/* 使命愿景 */}
      <div className="bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-white mb-6">
                我们的使命
              </h2>
              <p className="text-blue-100 text-lg leading-relaxed mb-6">
                KeywordHub 的使命是让关键词研究变得简单高效。我们相信，
                优秀的工具应该帮助用户节省时间，提供准确的数据洞察，
                让每个人都能掌握专业的SEO技能。
              </p>
              <p className="text-blue-100 text-lg leading-relaxed">
                我们专注于中文SEO市场，深度理解本土用户需求，
                提供最适合中文网站优化的关键词分析服务。
              </p>
            </div>
            <div className="flex justify-center">
              <div className="w-64 h-64 bg-blue-500 rounded-full flex items-center justify-center">
                <Globe className="w-32 h-32 text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 核心价值观 */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              我们的价值观
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              这些核心价值观指导着我们的产品开发和服务提供
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 数据统计 */}
      <div className="bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              用数据说话
            </h2>
            <p className="text-gray-600">
              我们的成长和用户的信任
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white rounded-lg p-6 text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-lg font-semibold text-gray-900 mb-1">
                  {stat.label}
                </div>
                <div className="text-gray-600 text-sm">
                  {stat.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 发展历程 */}
      <div className="bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              发展历程
            </h2>
            <p className="text-gray-600">
              从想法到现实，我们一直在进步
            </p>
          </div>

          <div className="space-y-8">
            {milestones.map((milestone, index) => (
              <div key={index} className="flex items-start">
                <div className="flex-shrink-0 w-24 text-right mr-8">
                  <div className="text-lg font-bold text-blue-600">
                    {milestone.year}
                  </div>
                </div>
                <div className="flex-shrink-0 w-4 h-4 bg-blue-600 rounded-full mt-2 mr-8"></div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {milestone.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {milestone.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA区域 */}
      <div className="bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              加入我们的旅程
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              成为KeywordHub用户，体验专业的关键词研究服务
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/search"
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
              >
                立即开始使用
              </Link>
              <Link
                href="/contact"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
              >
                联系我们
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}