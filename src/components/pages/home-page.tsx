'use client';

import Link from 'next/link';
import { Search, BarChart3, Zap, Shield, Users, TrendingUp } from 'lucide-react';
import { useLanguage } from '@/contexts/language-context';

export default function HomePage() {
  const { t } = useLanguage();

  const features = [
    {
      icon: Search,
      title: t('home.multiSource'),
      description: t('home.multiSourceDesc')
    },
    {
      icon: BarChart3,
      title: t('home.smartAnalysis'),
      description: t('home.smartAnalysisDesc')
    },
    {
      icon: Zap,
      title: t('home.fastQuery'),
      description: t('home.fastQueryDesc')
    },
    {
      icon: Shield,
      title: t('home.dataSecurity'),
      description: t('home.dataSecurityDesc')
    }
  ];

  const stats = [
    { label: t('home.dailyQueries'), value: '10+', description: t('home.dailyQueriesDesc') },
    { label: t('home.dataSources'), value: '3+', description: t('home.dataSourcesDesc') },
    { label: t('home.responseTime'), value: '<5s', description: t('home.responseTimeDesc') },
    { label: t('home.accuracy'), value: '95%+', description: t('home.accuracyDesc') }
  ];

  return (
    <>
      {/* Hero 区域 */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
              <span className="block">{t('home.title1')}</span>
              <span className="block text-blue-600">{t('home.title2')}</span>
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-500">
              {t('home.subtitle')}
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/search"
                className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
              >
                <Search className="w-5 h-5 mr-2" />
                {t('home.startAnalysis')}
              </Link>
              <Link
                href="/dashboard"
                className="inline-flex items-center px-8 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors"
              >
                <BarChart3 className="w-5 h-5 mr-2" />
                {t('home.userCenter')}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 统计数据 */}
      <section className="bg-blue-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl font-bold text-blue-600">{stat.value}</div>
                <div className="text-sm font-medium text-gray-900 mt-2">{stat.label}</div>
                <div className="text-xs text-gray-500 mt-1">{stat.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 功能特性 */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              {t('home.whyChoose')}
            </h2>
            <p className="mt-4 max-w-3xl mx-auto text-xl text-gray-500">
              {t('home.whyChooseDesc')}
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div key={feature.title} className="text-center">
                  <div className="flex justify-center">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                      <Icon className="h-6 w-6" />
                    </div>
                  </div>
                  <h3 className="mt-6 text-lg font-medium text-gray-900">{feature.title}</h3>
                  <p className="mt-2 text-base text-gray-500">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 使用场景 */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              {t('home.useCases')}
            </h2>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center">
                <Users className="h-8 w-8 text-blue-500" />
                <h3 className="ml-3 text-lg font-medium text-gray-900">{t('home.seoSpecialist')}</h3>
              </div>
              <p className="mt-4 text-gray-500">
                {t('home.seoSpecialistDesc')}
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center">
                <TrendingUp className="h-8 w-8 text-blue-500" />
                <h3 className="ml-3 text-lg font-medium text-gray-900">{t('home.contentCreator')}</h3>
              </div>
              <p className="mt-4 text-gray-500">
                {t('home.contentCreatorDesc')}
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center">
                <BarChart3 className="h-8 w-8 text-blue-500" />
                <h3 className="ml-3 text-lg font-medium text-gray-900">{t('home.ecommerceOps')}</h3>
              </div>
              <p className="mt-4 text-gray-500">
                {t('home.ecommerceOpsDesc')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA 区域 */}
      <section className="bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
              {t('home.startJourney')}
            </h2>
            <p className="mt-4 text-xl text-blue-100">
              {t('home.startJourneyDesc')}
            </p>
            <div className="mt-8">
              <Link
                href="/sign-up"
                className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-gray-50 transition-colors"
              >
                {t('home.startFree')}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}