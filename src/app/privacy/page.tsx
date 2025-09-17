'use client';

import { useLanguage } from '@/contexts/language-context';

export default function PrivacyPage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">隐私政策</h1>

          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-6">
              最后更新时间：2024年1月1日
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. 信息收集</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                KeywordHub（"我们"、"本平台"）致力于保护用户隐私。本隐私政策说明我们如何收集、使用和保护您的个人信息。
              </p>
              <p className="text-gray-700 leading-relaxed">
                我们收集的信息类型包括：
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1 text-gray-700">
                <li>注册时提供的邮箱地址和用户名</li>
                <li>您的关键词搜索查询记录</li>
                <li>设备信息和浏览器类型</li>
                <li>IP地址和访问时间</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. 信息使用</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                我们使用收集的信息用于：
              </p>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                <li>提供关键词分析服务</li>
                <li>改进产品功能和用户体验</li>
                <li>发送服务相关通知</li>
                <li>防范欺诈和滥用行为</li>
                <li>遵守法律法规要求</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. 信息保护</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                我们采取以下措施保护您的个人信息：
              </p>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                <li>使用SSL加密传输技术</li>
                <li>定期进行安全审计和漏洞扫描</li>
                <li>限制员工对个人信息的访问权限</li>
                <li>建立数据备份和恢复机制</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. 信息共享</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                我们不会向第三方出售、交易或转让您的个人信息，除非：
              </p>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                <li>获得您的明确同意</li>
                <li>为提供服务所必需（如支付处理）</li>
                <li>遵守法律法规或政府要求</li>
                <li>保护我们的权利和安全</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Cookie政策</h2>
              <p className="text-gray-700 leading-relaxed">
                我们使用Cookie来改善用户体验，包括记住登录状态、个性化设置等。
                您可以通过浏览器设置禁用Cookie，但这可能影响网站功能的正常使用。
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. 用户权利</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                您拥有以下权利：
              </p>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                <li>访问和更新您的个人信息</li>
                <li>删除您的账户和相关数据</li>
                <li>导出您的查询历史数据</li>
                <li>拒绝特定的数据处理活动</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. 联系我们</h2>
              <p className="text-gray-700 leading-relaxed">
                如果您对本隐私政策有任何疑问或需要行使您的权利，请通过以下方式联系我们：
              </p>
              <p className="text-gray-700 mt-2">
                邮箱：privacy@keywordhub.com<br />
                地址：KeywordHub隐私保护部门
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. 政策更新</h2>
              <p className="text-gray-700 leading-relaxed">
                我们可能会不时更新本隐私政策。重大变更时，我们会通过邮件或网站通知您。
                建议您定期查看本页面以了解最新的隐私政策。
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}