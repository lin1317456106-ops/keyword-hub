'use client';

import { useLanguage } from '@/contexts/language-context';

export default function TermsPage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">服务条款</h1>

          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-6">
              最后更新时间：2024年1月1日
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. 服务介绍</h2>
              <p className="text-gray-700 leading-relaxed">
                KeywordHub是一个专业的关键词研究平台，为用户提供关键词分析、趋势预测、
                竞争度评估等SEO相关服务。使用本服务即表示您同意遵守本服务条款。
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. 用户义务</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                使用我们的服务时，您需要：
              </p>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                <li>提供真实、准确的注册信息</li>
                <li>保护账户安全，不得与他人共享登录凭据</li>
                <li>合法合规地使用服务，不得用于违法目的</li>
                <li>尊重知识产权，不得逆向工程或破解服务</li>
                <li>不得进行可能损害服务稳定性的行为</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. 服务限制</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                我们的服务存在以下限制：
              </p>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                <li>免费用户每日查询次数限制为10次</li>
                <li>服务可用性目标为99.9%，但不保证100%</li>
                <li>我们保留暂停或终止滥用账户的权利</li>
                <li>数据准确性基于第三方数据源，可能存在偏差</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. 付费服务</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                关于付费订阅服务：
              </p>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                <li>订阅费用按月或年收取，到期自动续费</li>
                <li>可随时取消订阅，但已付费用不予退还</li>
                <li>价格可能调整，会提前30天通知现有用户</li>
                <li>付费功能仅限订阅期间使用</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. 知识产权</h2>
              <p className="text-gray-700 leading-relaxed">
                KeywordHub平台的所有内容、功能、代码、设计等均受知识产权法保护。
                用户可以使用服务获取数据分析结果，但不得复制、修改或分发平台本身的任何部分。
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. 免责声明</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                使用本服务时：
              </p>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                <li>我们不保证数据的绝对准确性</li>
                <li>SEO效果因多种因素影响，我们不承诺具体结果</li>
                <li>用户需自行判断数据的适用性</li>
                <li>因使用服务产生的任何损失，我们不承担责任</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. 服务变更</h2>
              <p className="text-gray-700 leading-relaxed">
                我们保留随时修改、暂停或终止服务的权利。重大变更会提前通知用户。
                如果您不同意变更内容，可以停止使用服务。
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. 争议解决</h2>
              <p className="text-gray-700 leading-relaxed">
                因使用本服务产生的任何争议，双方应首先通过友好协商解决。
                协商不成的，提交至KeywordHub所在地有管辖权的人民法院解决。
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. 联系方式</h2>
              <p className="text-gray-700 leading-relaxed">
                如对本服务条款有任何疑问，请联系我们：
              </p>
              <p className="text-gray-700 mt-2">
                邮箱：legal@keywordhub.com<br />
                客服：support@keywordhub.com
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}