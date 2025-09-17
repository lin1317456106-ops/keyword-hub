'use client';

import Link from 'next/link';
import { Check, Star } from 'lucide-react';
import { useLanguage } from '@/contexts/language-context';

export default function PricingPage() {
  const { t } = useLanguage();

  const plans = [
    {
      name: '免费版',
      price: '¥0',
      period: '永久免费',
      description: '适合个人用户和小型项目',
      features: [
        '每日10次关键词查询',
        '基础趋势分析',
        '相关关键词推荐',
        '导出CSV功能',
        '邮箱客服支持'
      ],
      limitations: [
        '查询次数限制',
        '不支持批量查询',
        '基础数据源'
      ],
      buttonText: '立即开始',
      buttonVariant: 'outline',
      popular: false
    },
    {
      name: '专业版',
      price: '¥99',
      period: '每月',
      description: '适合SEO专员和内容创作者',
      features: [
        '每日500次关键词查询',
        '高级趋势分析和预测',
        '竞争对手关键词分析',
        '批量关键词查询',
        '详细分析报告',
        '优先客服支持',
        '数据导出无限制',
        '历史数据查看'
      ],
      buttonText: '选择专业版',
      buttonVariant: 'primary',
      popular: true
    },
    {
      name: '企业版',
      price: '联系我们',
      period: '定制方案',
      description: '适合大型团队和企业',
      features: [
        '无限制关键词查询',
        '全功能API访问',
        '自定义数据源集成',
        '团队协作功能',
        '白标解决方案',
        '专属客户经理',
        '定制化报告',
        '数据安全保障',
        'SLA服务承诺'
      ],
      buttonText: '联系销售',
      buttonVariant: 'outline',
      popular: false
    }
  ];

  const faqs = [
    {
      question: '免费版有什么限制？',
      answer: '免费版每日提供10次关键词查询机会，支持基本的趋势分析和相关词推荐。适合个人用户了解和试用我们的服务。'
    },
    {
      question: '专业版和免费版有什么区别？',
      answer: '专业版提供更高的查询额度（每日500次）、高级分析功能、批量查询、竞争对手分析等功能，适合专业SEO工作。'
    },
    {
      question: '企业版包含哪些定制服务？',
      answer: '企业版提供API访问、团队协作、白标解决方案、专属客户经理等服务，可根据企业需求定制功能和服务。'
    },
    {
      question: '支持哪些支付方式？',
      answer: '我们支持支付宝、微信支付、银行卡等多种支付方式，企业用户还可以申请对公转账。'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 头部区域 */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              选择适合您的方案
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              从免费版开始，随着业务发展升级到专业版或企业版
            </p>
          </div>
        </div>
      </div>

      {/* 价格方案 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div key={index} className={`bg-white rounded-lg shadow-md p-8 relative ${plan.popular ? 'ring-2 ring-blue-500' : ''}`}>
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium flex items-center">
                    <Star className="w-4 h-4 mr-1" />
                    推荐方案
                  </div>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <div className="mb-2">
                  <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                  {plan.period !== '定制方案' && <span className="text-gray-500">/{plan.period}</span>}
                </div>
                <p className="text-gray-600">{plan.description}</p>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start">
                    <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              {plan.limitations && (
                <div className="mb-8">
                  <p className="text-sm text-gray-500 mb-2">限制说明：</p>
                  <ul className="space-y-1">
                    {plan.limitations.map((limitation, idx) => (
                      <li key={idx} className="text-sm text-gray-400">• {limitation}</li>
                    ))}
                  </ul>
                </div>
              )}

              <button
                className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors ${
                  plan.buttonVariant === 'primary'
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'border-2 border-gray-300 text-gray-700 hover:border-blue-500 hover:text-blue-600'
                }`}
              >
                {plan.buttonText}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ区域 */}
      <div className="bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              常见问题
            </h2>
            <p className="text-gray-600">
              关于我们的定价方案，您可能想了解的问题
            </p>
          </div>

          <div className="space-y-8">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-gray-200 pb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {faq.question}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {faq.answer}
                </p>
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
              还有疑问？
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              联系我们的销售团队，获得专业建议
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
              >
                联系销售
              </Link>
              <Link
                href="/search"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
              >
                免费试用
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}