'use client';

import { Calendar, Plus, Bug, Star } from 'lucide-react';
import { useLanguage } from '@/contexts/language-context';

export default function ChangelogPage() {
  const { t } = useLanguage();

  const releases = [
    {
      version: 'v1.2.0',
      date: '2024-01-15',
      type: 'feature',
      title: '批量关键词查询功能',
      description: '用户现在可以一次性查询多个关键词，提高工作效率。',
      changes: [
        '新增批量关键词导入功能',
        '支持CSV格式文件上传',
        '批量结果导出优化',
        '查询进度实时显示'
      ]
    },
    {
      version: 'v1.1.5',
      date: '2024-01-08',
      type: 'improvement',
      title: '性能优化和体验改进',
      description: '提升了系统响应速度和用户界面体验。',
      changes: [
        '搜索响应时间优化至3秒',
        '图表渲染性能提升50%',
        '移动端适配改进',
        '错误提示信息优化'
      ]
    },
    {
      version: 'v1.1.0',
      date: '2024-01-01',
      type: 'feature',
      title: '高级分析功能上线',
      description: '为专业用户提供更深入的关键词分析能力。',
      changes: [
        '新增竞争对手关键词分析',
        '历史趋势对比功能',
        '关键词难度评分系统',
        '智能关键词推荐算法'
      ]
    },
    {
      version: 'v1.0.5',
      date: '2023-12-25',
      type: 'bugfix',
      title: '问题修复和稳定性改进',
      description: '修复了用户反馈的多个问题，提升系统稳定性。',
      changes: [
        '修复导出功能偶发失败问题',
        '解决特殊字符搜索异常',
        '优化数据库查询性能',
        '修复用户登录状态丢失问题'
      ]
    },
    {
      version: 'v1.0.0',
      date: '2023-12-01',
      type: 'release',
      title: 'KeywordHub 正式发布',
      description: 'KeywordHub 1.0版本正式上线，提供专业的关键词研究服务。',
      changes: [
        '关键词搜索和分析功能',
        '趋势图表可视化',
        '相关关键词推荐',
        '用户账户系统',
        '免费和付费方案'
      ]
    }
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'feature':
        return <Plus className="w-4 h-4" />;
      case 'improvement':
        return <Star className="w-4 h-4" />;
      case 'bugfix':
        return <Bug className="w-4 h-4" />;
      default:
        return <Calendar className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'feature':
        return 'bg-green-100 text-green-800';
      case 'improvement':
        return 'bg-blue-100 text-blue-800';
      case 'bugfix':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-purple-100 text-purple-800';
    }
  };

  const getTypeName = (type: string) => {
    switch (type) {
      case 'feature':
        return '新功能';
      case 'improvement':
        return '改进';
      case 'bugfix':
        return '修复';
      case 'release':
        return '发布';
      default:
        return '更新';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 头部区域 */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              更新日志
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              了解KeywordHub的最新功能和改进
            </p>
          </div>
        </div>
      </div>

      {/* 更新列表 */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="space-y-8">
          {releases.map((release, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <span className="text-2xl font-bold text-gray-900 mr-4">
                    {release.version}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center ${getTypeColor(release.type)}`}>
                    {getTypeIcon(release.type)}
                    <span className="ml-1">{getTypeName(release.type)}</span>
                  </span>
                </div>
                <div className="flex items-center text-gray-500">
                  <Calendar className="w-4 h-4 mr-2" />
                  {release.date}
                </div>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {release.title}
              </h3>
              <p className="text-gray-600 mb-4">
                {release.description}
              </p>

              <div className="border-l-4 border-blue-500 pl-4">
                <h4 className="font-medium text-gray-900 mb-2">更新内容：</h4>
                <ul className="space-y-1">
                  {release.changes.map((change, idx) => (
                    <li key={idx} className="text-gray-700 text-sm">
                      • {change}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 订阅更新 */}
      <div className="bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              订阅更新通知
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              及时了解KeywordHub的最新功能和改进
            </p>
            <div className="max-w-md mx-auto flex">
              <input
                type="email"
                placeholder="输入您的邮箱地址"
                className="flex-1 px-4 py-3 rounded-l-lg border-0 focus:ring-2 focus:ring-blue-300"
              />
              <button className="bg-white text-blue-600 px-6 py-3 rounded-r-lg font-semibold hover:bg-gray-50 transition-colors">
                订阅
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}