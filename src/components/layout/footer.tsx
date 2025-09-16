'use client';

import Link from 'next/link';
import { BarChart3 } from 'lucide-react';
import { useLanguage } from '@/contexts/language-context';

export default function Footer() {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    [t('footer.product')]: [
      { name: t('footer.features'), href: '/features' },
      { name: t('footer.pricing'), href: '/pricing' },
      { name: t('footer.changelog'), href: '/changelog' },
    ],
    [t('footer.support')]: [
      { name: t('footer.help'), href: '/help' },
      { name: t('footer.contact'), href: '/contact' },
      { name: t('footer.api'), href: '/docs' },
    ],
    [t('footer.company')]: [
      { name: t('footer.about'), href: '/about' },
      { name: t('footer.privacy'), href: '/privacy' },
      { name: t('footer.terms'), href: '/terms' },
    ],
  };

  return (
    <footer className="bg-gray-900">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          {/* 品牌信息 */}
          <div className="xl:col-span-1">
            <Link href="/" className="flex items-center">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-white" />
              </div>
              <span className="ml-2 text-xl font-bold text-white">
                KeywordHub
              </span>
            </Link>
            <p className="mt-4 text-gray-400 text-base max-w-md">
              {t('footer.description')}
            </p>
            <div className="mt-6">
              <p className="text-sm text-gray-400">
                © {currentYear} KeywordHub. {t('footer.rights')}
              </p>
            </div>
          </div>

          {/* 链接列表 */}
          <div className="mt-12 xl:mt-0 xl:col-span-2">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              {Object.entries(footerLinks).map(([category, links]) => (
                <div key={category}>
                  <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase">
                    {category}
                  </h3>
                  <ul className="mt-4 space-y-4">
                    {links.map((link) => (
                      <li key={link.name}>
                        <Link
                          href={link.href}
                          className="text-base text-gray-400 hover:text-white transition-colors"
                        >
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 底部分割线和额外信息 */}
        <div className="mt-12 border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="flex space-x-6 md:order-2">
              <p className="text-xs text-gray-400">
                {t('footer.dataSource')}
              </p>
            </div>
            <p className="mt-4 md:mt-0 text-xs text-gray-400 md:order-1">
              {t('footer.mission')}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}