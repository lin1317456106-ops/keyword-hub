'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import MainLayout from '@/components/layout/main-layout';
import { useLanguage } from '@/contexts/language-context';
import {
  User,
  BarChart3,
  Clock,
  Settings,
  CreditCard,
  TrendingUp,
  Search,
  Download,
  Star,
  Calendar,
  Activity
} from 'lucide-react';

interface UserStats {
  dailyUsage: number;
  dailyLimit: number;
  totalQueries: number;
  lastQuery?: string;
}

export default function Dashboard() {
  const { data: session, status } = useSession();
  const { t } = useLanguage();
  const router = useRouter();
  const [userStats, setUserStats] = useState<UserStats>({
    dailyUsage: 0,
    dailyLimit: 10,
    totalQueries: 0
  });

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/sign-in');
    }
  }, [status, router]);

  useEffect(() => {
    // 模拟获取用户统计数据
    // 实际应用中这里会调用API获取真实数据
    setUserStats({
      dailyUsage: Math.floor(Math.random() * 10),
      dailyLimit: 10,
      totalQueries: Math.floor(Math.random() * 100) + 20,
      lastQuery: '人工智能'
    });
  }, []);

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!session) {
    return null; // Will redirect to sign-in
  }

  const quickActions = [
    {
      icon: Search,
      title: t('dashboard.startSearch'),
      description: t('dashboard.startSearchDesc'),
      href: '/search',
      color: 'bg-blue-500 hover:bg-blue-600'
    },
    {
      icon: Download,
      title: t('dashboard.exportHistory'),
      description: t('dashboard.exportHistoryDesc'),
      href: '#',
      color: 'bg-green-500 hover:bg-green-600'
    },
    {
      icon: Settings,
      title: t('dashboard.accountSettings'),
      description: t('dashboard.accountSettingsDesc'),
      href: '#',
      color: 'bg-gray-500 hover:bg-gray-600'
    },
    {
      icon: CreditCard,
      title: t('dashboard.upgradeAccount'),
      description: t('dashboard.upgradeAccountDesc'),
      href: '#',
      color: 'bg-orange-500 hover:bg-orange-600'
    }
  ];

  const recentQueries = [
    { keyword: '人工智能', date: '2024-01-15', results: 45 },
    { keyword: 'SEO工具', date: '2024-01-14', results: 32 },
    { keyword: '关键词研究', date: '2024-01-13', results: 28 },
    { keyword: '数字营销', date: '2024-01-12', results: 38 }
  ];

  const tips = t('dashboard.tips');
  const usageTips = Array.isArray(tips) ? tips : [];

  return (
    <MainLayout showFooter={false}>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* 用户欢迎区域 */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {t('dashboard.welcome')}，{session.user?.name || session.user?.email?.split('@')[0]}！
                </h1>
                <p className="text-gray-600">
                  {t('dashboard.manageAccount')}
                </p>
              </div>
              <div className="hidden md:block">
                <Image
                  src={session.user?.image || '/default-avatar.png'}
                  alt="用户头像"
                  width={64}
                  height={64}
                  className="h-16 w-16 rounded-full border-4 border-white shadow-lg"
                />
              </div>
            </div>
          </div>

          {/* 统计概览 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-center">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Activity className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">{t('dashboard.todayUsage')}</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {userStats.dailyUsage}/{userStats.dailyLimit}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-center">
                <div className="p-3 bg-green-100 rounded-lg">
                  <BarChart3 className="h-6 w-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">{t('dashboard.totalQueries')}</p>
                  <p className="text-2xl font-bold text-gray-900">{userStats.totalQueries}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-center">
                <div className="p-3 bg-orange-100 rounded-lg">
                  <Clock className="h-6 w-6 text-orange-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">{t('dashboard.recentQuery')}</p>
                  <p className="text-lg font-semibold text-gray-900">{userStats.lastQuery || t('common.noData')}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-center">
                <div className="p-3 bg-purple-100 rounded-lg">
                  <Star className="h-6 w-6 text-purple-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">{t('dashboard.accountType')}</p>
                  <p className="text-lg font-semibold text-gray-900">{t('dashboard.freeUser')}</p>
                </div>
              </div>
            </div>
          </div>

          {/* 快捷操作 */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">{t('dashboard.quickActions')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {quickActions.map((action, index) => {
                const Icon = action.icon;
                return (
                  <Link
                    key={index}
                    href={action.href}
                    className={`${action.color} text-white rounded-lg p-6 transition-colors block`}
                  >
                    <div className="flex items-center mb-3">
                      <Icon className="h-6 w-6 mr-3" />
                      <h3 className="font-semibold">{action.title}</h3>
                    </div>
                    <p className="text-sm opacity-90">{action.description}</p>
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* 查询历史 */}
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900">{t('dashboard.recentQueries')}</h2>
                  <Link
                    href="#"
                    className="text-sm text-blue-600 hover:text-blue-800"
                  >
                    {t('dashboard.viewAll')}
                  </Link>
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {recentQueries.map((query, index) => (
                    <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                      <div>
                        <h3 className="font-medium text-gray-900">{query.keyword}</h3>
                        <p className="text-sm text-gray-500 flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {query.date}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-900">{query.results} {t('dashboard.results')}</p>
                        <Link
                          href="#"
                          className="text-sm text-blue-600 hover:text-blue-800"
                        >
                          {t('dashboard.viewDetails')}
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 账户信息 */}
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">{t('dashboard.accountInfo')}</h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center">
                    <User className="h-5 w-5 text-gray-400 mr-3" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">{t('dashboard.username')}</p>
                      <p className="text-sm text-gray-500">{session.user?.name || t('dashboard.notSet')}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <User className="h-5 w-5 text-gray-400 mr-3" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">{t('dashboard.email')}</p>
                      <p className="text-sm text-gray-500">{session.user?.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 text-gray-400 mr-3" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">{t('dashboard.registerTime')}</p>
                      <p className="text-sm text-gray-500">2024年1月</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4">
                    <h3 className="text-sm font-semibold text-gray-900 mb-2">{t('dashboard.upgradePremium')}</h3>
                    <p className="text-sm text-gray-600 mb-3">
                      {t('dashboard.premiumFeatures')}
                    </p>
                    <Link
                      href="#"
                      className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors"
                    >
                      <Star className="h-4 w-4 mr-2" />
                      {t('dashboard.upgradeNow')}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 使用提示 */}
          <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
            <div className="flex">
              <TrendingUp className="h-6 w-6 text-blue-600 mr-3 mt-1" />
              <div>
                <h3 className="text-lg font-semibold text-blue-900 mb-2">{t('dashboard.usageTips')}</h3>
                <div className="text-sm text-blue-800 space-y-1">
                  {usageTips.map((tip, index) => (
                    <p key={index}>• {tip}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}