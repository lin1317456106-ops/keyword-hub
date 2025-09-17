'use client';

import { Mail, MessageCircle, Clock } from 'lucide-react';
import { useLanguage } from '@/contexts/language-context';

export default function ContactPage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 头部区域 */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              联系我们
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              有任何问题或建议？我们很乐意为您提供帮助
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* 联系方式 */}
          <div className="lg:col-span-1">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              联系方式
            </h2>

            <div className="space-y-6">
              <div className="flex items-start">
                <Mail className="w-6 h-6 text-blue-600 mr-4 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">邮箱支持</h3>
                  <p className="text-gray-600">support@keywordhub.com</p>
                  <p className="text-sm text-gray-500">24小时内回复</p>
                </div>
              </div>

              <div className="flex items-start">
                <MessageCircle className="w-6 h-6 text-blue-600 mr-4 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">在线客服</h3>
                  <p className="text-gray-600">工作日 9:00-18:00</p>
                  <p className="text-sm text-gray-500">实时在线支持</p>
                </div>
              </div>

              <div className="flex items-start">
                <Clock className="w-6 h-6 text-blue-600 mr-4 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">服务时间</h3>
                  <p className="text-gray-600">周一至周五 9:00-18:00</p>
                  <p className="text-sm text-gray-500">节假日除外</p>
                </div>
              </div>
            </div>

            <div className="mt-8 p-4 bg-blue-50 rounded-lg">
              <h3 className="font-semibold text-blue-900 mb-2">企业客户</h3>
              <p className="text-blue-700 text-sm">
                如需企业定制服务，请发邮件至
                <a href="mailto:enterprise@keywordhub.com" className="underline ml-1">
                  enterprise@keywordhub.com
                </a>
              </p>
            </div>
          </div>

          {/* 联系表单 */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                发送消息
              </h2>

              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      姓名 *
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="请输入您的姓名"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      邮箱地址 *
                    </label>
                    <input
                      type="email"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    主题 *
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    <option>请选择咨询类型</option>
                    <option>产品使用问题</option>
                    <option>技术支持</option>
                    <option>账户和订阅</option>
                    <option>功能建议</option>
                    <option>合作咨询</option>
                    <option>其他</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    详细描述 *
                  </label>
                  <textarea
                    rows={6}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="请详细描述您的问题或建议..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  发送消息
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}