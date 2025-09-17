'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'zh' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// 翻译数据
const translations = {
  zh: {
    // 导航栏
    'nav.home': '首页',
    'nav.search': '关键词搜索',
    'nav.dashboard': '用户中心',
    'nav.login': '登录',
    'nav.register': '注册',
    'nav.logout': '退出',
    'nav.welcome': '欢迎',
    'nav.freeAccount': '免费账户 - 每日10次查询',

    // 首页
    'home.title1': '一站式',
    'home.title2': '关键词研究平台',
    'home.subtitle': '聚合多个数据源，为SEO专员和内容创作者提供智能化的关键词分析服务。免费试用，每日10次查询额度。',
    'home.startAnalysis': '免费开始分析',
    'home.userCenter': '用户中心',
    'home.dailyQueries': '每日查询',
    'home.dailyQueriesDesc': '免费用户每日查询额度',
    'home.dataSources': '数据源',
    'home.dataSourcesDesc': '聚合多个主流数据源',
    'home.responseTime': '响应时间',
    'home.responseTimeDesc': '平均查询响应时间',
    'home.accuracy': '准确率',
    'home.accuracyDesc': '数据准确率保证',
    'home.whyChoose': '为什么选择 KeywordHub？',
    'home.whyChooseDesc': '我们专注解决SEO从业者在关键词研究中遇到的核心痛点',
    'home.multiSource': '多数据源聚合',
    'home.multiSourceDesc': '整合Google Trends、Google Ads等多个数据源，提供全面的关键词分析',
    'home.smartAnalysis': '智能数据分析',
    'home.smartAnalysisDesc': '自动去重、排序和聚类，提供清晰的数据洞察和趋势分析',
    'home.fastQuery': '快速查询',
    'home.fastQueryDesc': '5秒内获得完整的关键词分析报告，提高您的工作效率',
    'home.dataSecurity': '数据安全',
    'home.dataSecurityDesc': '企业级数据加密，保护您的查询历史和敏感信息',
    'home.useCases': '适用场景',
    'home.seoSpecialist': 'SEO 专员',
    'home.seoSpecialistDesc': '为客户制定SEO策略，需要快速找到低竞争高价值的关键词，提升网站排名和流量。',
    'home.contentCreator': '内容创作者',
    'home.contentCreatorDesc': '寻找热门话题和长尾关键词，制定内容日历，提高文章的搜索曝光度。',
    'home.ecommerceOps': '电商运营',
    'home.ecommerceOpsDesc': '分析产品相关关键词，优化商品标题和描述，指导广告投放策略。',
    'home.startJourney': '开始您的关键词研究之旅',
    'home.startJourneyDesc': '免费注册，立即获得每日10次查询额度',
    'home.startFree': '立即开始 - 完全免费',

    // 搜索页面
    'search.title1': '免费关键词',
    'search.title2': '分析工具',
    'search.subtitle': '基于Google Trends数据，为您提供专业的关键词分析服务。支持中英文关键词，实时获取搜索趋势和相关建议。',
    'search.placeholder': '输入关键词开始分析（如：SEO工具、人工智能、电商运营）...',
    'search.tryKeywords': '试试这些热门关键词：',
    'search.examples': ['SEO工具', 'AI', '电商运营', '短视频', '数字营销'],
    'search.error': '搜索出错',
    'search.networkError': '网络错误，请检查网络连接',
    'search.searchFailed': '搜索失败，请重试',
    'search.powerfulFeatures': '强大的功能特性',
    'search.professionalTool': '专业级关键词分析工具，完全免费使用',
    'search.smartSearch': '智能搜索',
    'search.smartSearchDesc': '输入关键词，立即获取全面分析报告',
    'search.trendAnalysis': '趋势分析',
    'search.trendAnalysisDesc': '12个月历史趋势数据可视化',
    'search.fastResponse': '快速响应',
    'search.fastResponseDesc': '5秒内获得分析结果',
    'search.relatedKeywords': '相关关键词',
    'search.relatedKeywordsDesc': '发现更多相关搜索机会',
    'search.whyChooseTool': '为什么选择我们的工具？',
    'search.benefits': [
      '免费使用，无需注册',
      '实时Google Trends数据',
      '智能趋势分析',
      'CSV导出功能',
      '相关关键词推荐',
      '竞争度评估'
    ],
    'search.registerForMore': '注册获取更多功能',
    'search.useCasesTitle': '适用场景',
    'search.seoSpec': 'SEO专员：',
    'search.seoSpecDesc': '发现低竞争高价值关键词',
    'search.creator': '内容创作者：',
    'search.creatorDesc': '寻找热门话题和长尾词',
    'search.ecommerce': '电商运营：',
    'search.ecommerceDesc': '优化产品标题和广告投放',
    'search.market': '市场研究：',
    'search.marketDesc': '了解行业趋势和用户需求',

    // 用户中心
    'dashboard.welcome': '欢迎回来',
    'dashboard.manageAccount': '管理您的账户和查询历史',
    'dashboard.todayUsage': '今日使用',
    'dashboard.totalQueries': '总查询数',
    'dashboard.recentQuery': '最近查询',
    'dashboard.accountType': '账户类型',
    'dashboard.freeUser': '免费用户',
    'dashboard.quickActions': '快捷操作',
    'dashboard.startSearch': '开始搜索',
    'dashboard.startSearchDesc': '搜索新的关键词',
    'dashboard.exportHistory': '导出历史',
    'dashboard.exportHistoryDesc': '下载查询历史',
    'dashboard.accountSettings': '账户设置',
    'dashboard.accountSettingsDesc': '管理个人信息',
    'dashboard.upgradeAccount': '升级账户',
    'dashboard.upgradeAccountDesc': '解锁高级功能',
    'dashboard.recentQueries': '最近查询',
    'dashboard.viewAll': '查看全部',
    'dashboard.results': '个结果',
    'dashboard.viewDetails': '查看详情',
    'dashboard.accountInfo': '账户信息',
    'dashboard.username': '用户名',
    'dashboard.notSet': '未设置',
    'dashboard.email': '邮箱地址',
    'dashboard.registerTime': '注册时间',
    'dashboard.upgradePremium': '升级到高级版',
    'dashboard.premiumFeatures': '解锁更多功能：无限查询、高级分析、导出功能等',
    'dashboard.upgradeNow': '立即升级',
    'dashboard.usageTips': '使用提示',
    'dashboard.tips': [
      '每日免费查询次数为 10 次，重置时间为每日午夜',
      '使用关键词搜索工具开始分析您感兴趣的关键词',
      '所有查询历史都会自动保存，方便您随时回顾和对比',
      '升级到高级版可获得无限查询次数和更多分析功能'
    ],

    // 结果显示
    'results.dataSource': '数据来源',
    'results.queryTime': '查询时间',
    'results.queryId': '查询ID',
    'results.exportCsv': '导出 CSV',
    'results.monthlySearch': '月搜索量',
    'results.competition': '竞争强度',
    'results.trendDirection': '趋势方向',
    'results.trending': {
      'up': '上升',
      'down': '下降',
      'stable': '稳定'
    },
    'results.trendChart': '12个月趋势变化',
    'results.interest': '兴趣度',
    'results.relatedQueries': '相关关键词',
    'results.analysisAdvice': '分析建议',
    'results.advice': [
      '该关键词搜索量较高，竞争可能激烈，建议结合长尾词策略',
      '竞争强度较高，建议优化网站内容质量和权威性',
      '关键词热度呈上升趋势，是不错的目标词选择',
      '关键词热度下降，建议关注相关热门词汇',
      '可考虑结合相关关键词制定内容策略，提升覆盖面'
    ],

    // 通用
    'common.noData': '暂无',
    'common.loading': '加载中...',
    'common.error': '错误',
    'common.success': '成功',
    'common.confirm': '确认',
    'common.cancel': '取消',
    'common.save': '保存',
    'common.edit': '编辑',
    'common.delete': '删除',
    'common.search': '搜索',
    'common.export': '导出',
    'common.import': '导入',
    'common.refresh': '刷新',

    // 页脚
    'footer.product': '产品',
    'footer.features': '功能介绍',
    'footer.pricing': '定价方案',
    'footer.changelog': '更新日志',
    'footer.integrations': '集成工具',
    'footer.mobile': '移动应用',
    'footer.enterprise': '企业版',
    'footer.support': '支持',
    'footer.help': '帮助中心',
    'footer.contact': '联系我们',
    'footer.api': 'API 文档',
    'footer.tutorials': '使用教程',
    'footer.community': '用户社区',
    'footer.status': '服务状态',
    'footer.company': '公司',
    'footer.about': '关于我们',
    'footer.privacy': '隐私政策',
    'footer.terms': '服务条款',
    'footer.careers': '招聘信息',
    'footer.blog': '官方博客',
    'footer.press': '媒体中心',
    'footer.investors': '投资者关系',
    'footer.description': '一站式关键词研究工具，聚合多个数据源，为SEO专员和内容创作者提供智能化的关键词分析服务。',
    'footer.rights': '保留所有权利。',
    'footer.dataSource': '数据来源：Google Trends、Google Ads等',
    'footer.mission': 'KeywordHub 致力于为中文SEO市场提供专业的关键词分析服务',
    'footer.socialTitle': '关注我们',
    'footer.newsletter': '订阅我们的资讯',
    'footer.newsletterDesc': '获取最新的SEO技巧和产品更新',
    'footer.emailPlaceholder': '输入您的邮箱地址',
    'footer.subscribe': '订阅'
  },
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.search': 'Keyword Search',
    'nav.dashboard': 'Dashboard',
    'nav.login': 'Sign In',
    'nav.register': 'Sign Up',
    'nav.logout': 'Sign Out',
    'nav.welcome': 'Welcome',
    'nav.freeAccount': 'Free Account - 10 daily queries',

    // Home page
    'home.title1': 'All-in-One',
    'home.title2': 'Keyword Research Platform',
    'home.subtitle': 'Aggregate multiple data sources to provide intelligent keyword analysis services for SEO specialists and content creators. Free trial with 10 daily query credits.',
    'home.startAnalysis': 'Start Free Analysis',
    'home.userCenter': 'User Center',
    'home.dailyQueries': 'Daily Queries',
    'home.dailyQueriesDesc': 'Free user daily query quota',
    'home.dataSources': 'Data Sources',
    'home.dataSourcesDesc': 'Aggregate multiple mainstream data sources',
    'home.responseTime': 'Response Time',
    'home.responseTimeDesc': 'Average query response time',
    'home.accuracy': 'Accuracy',
    'home.accuracyDesc': 'Data accuracy guarantee',
    'home.whyChoose': 'Why Choose KeywordHub?',
    'home.whyChooseDesc': 'We focus on solving core pain points encountered by SEO practitioners in keyword research',
    'home.multiSource': 'Multi-Source Aggregation',
    'home.multiSourceDesc': 'Integrate Google Trends, Google Ads and other data sources for comprehensive keyword analysis',
    'home.smartAnalysis': 'Smart Data Analysis',
    'home.smartAnalysisDesc': 'Automatic deduplication, sorting and clustering for clear data insights and trend analysis',
    'home.fastQuery': 'Fast Query',
    'home.fastQueryDesc': 'Get complete keyword analysis reports within 5 seconds to improve your work efficiency',
    'home.dataSecurity': 'Data Security',
    'home.dataSecurityDesc': 'Enterprise-grade data encryption protects your query history and sensitive information',
    'home.useCases': 'Use Cases',
    'home.seoSpecialist': 'SEO Specialist',
    'home.seoSpecialistDesc': 'Develop SEO strategies for clients, quickly find low-competition high-value keywords to improve website rankings and traffic.',
    'home.contentCreator': 'Content Creator',
    'home.contentCreatorDesc': 'Find trending topics and long-tail keywords, develop content calendars, and improve article search exposure.',
    'home.ecommerceOps': 'E-commerce Operations',
    'home.ecommerceOpsDesc': 'Analyze product-related keywords, optimize product titles and descriptions, and guide advertising strategies.',
    'home.startJourney': 'Start Your Keyword Research Journey',
    'home.startJourneyDesc': 'Free registration, get 10 daily query credits immediately',
    'home.startFree': 'Get Started - Completely Free',

    // Search page
    'search.title1': 'Free Keyword',
    'search.title2': 'Analysis Tool',
    'search.subtitle': 'Based on Google Trends data, providing professional keyword analysis services. Supports Chinese and English keywords with real-time search trends and related suggestions.',
    'search.placeholder': 'Enter keywords to start analysis (e.g., SEO tools, artificial intelligence, e-commerce operations)...',
    'search.tryKeywords': 'Try these popular keywords:',
    'search.examples': ['SEO Tools', 'AI', 'E-commerce', 'Short Video', 'Digital Marketing'],
    'search.error': 'Search Error',
    'search.networkError': 'Network error, please check your connection',
    'search.searchFailed': 'Search failed, please try again',
    'search.powerfulFeatures': 'Powerful Features',
    'search.professionalTool': 'Professional keyword analysis tool, completely free to use',
    'search.smartSearch': 'Smart Search',
    'search.smartSearchDesc': 'Enter keywords and get comprehensive analysis reports instantly',
    'search.trendAnalysis': 'Trend Analysis',
    'search.trendAnalysisDesc': '12-month historical trend data visualization',
    'search.fastResponse': 'Fast Response',
    'search.fastResponseDesc': 'Get analysis results within 5 seconds',
    'search.relatedKeywords': 'Related Keywords',
    'search.relatedKeywordsDesc': 'Discover more related search opportunities',
    'search.whyChooseTool': 'Why Choose Our Tool?',
    'search.benefits': [
      'Free to use, no registration required',
      'Real-time Google Trends data',
      'Smart trend analysis',
      'CSV export functionality',
      'Related keyword recommendations',
      'Competition assessment'
    ],
    'search.registerForMore': 'Register for More Features',
    'search.useCasesTitle': 'Use Cases',
    'search.seoSpec': 'SEO Specialists:',
    'search.seoSpecDesc': 'Discover low-competition high-value keywords',
    'search.creator': 'Content Creators:',
    'search.creatorDesc': 'Find trending topics and long-tail keywords',
    'search.ecommerce': 'E-commerce Operations:',
    'search.ecommerceDesc': 'Optimize product titles and ad placements',
    'search.market': 'Market Research:',
    'search.marketDesc': 'Understand industry trends and user needs',

    // Dashboard
    'dashboard.welcome': 'Welcome back',
    'dashboard.manageAccount': 'Manage your account and query history',
    'dashboard.todayUsage': 'Today\'s Usage',
    'dashboard.totalQueries': 'Total Queries',
    'dashboard.recentQuery': 'Recent Query',
    'dashboard.accountType': 'Account Type',
    'dashboard.freeUser': 'Free User',
    'dashboard.quickActions': 'Quick Actions',
    'dashboard.startSearch': 'Start Search',
    'dashboard.startSearchDesc': 'Search new keywords',
    'dashboard.exportHistory': 'Export History',
    'dashboard.exportHistoryDesc': 'Download query history',
    'dashboard.accountSettings': 'Account Settings',
    'dashboard.accountSettingsDesc': 'Manage personal information',
    'dashboard.upgradeAccount': 'Upgrade Account',
    'dashboard.upgradeAccountDesc': 'Unlock advanced features',
    'dashboard.recentQueries': 'Recent Queries',
    'dashboard.viewAll': 'View All',
    'dashboard.results': ' results',
    'dashboard.viewDetails': 'View Details',
    'dashboard.accountInfo': 'Account Information',
    'dashboard.username': 'Username',
    'dashboard.notSet': 'Not Set',
    'dashboard.email': 'Email Address',
    'dashboard.registerTime': 'Registration Time',
    'dashboard.upgradePremium': 'Upgrade to Premium',
    'dashboard.premiumFeatures': 'Unlock more features: unlimited queries, advanced analysis, export functions, etc.',
    'dashboard.upgradeNow': 'Upgrade Now',
    'dashboard.usageTips': 'Usage Tips',
    'dashboard.tips': [
      'Daily free query limit is 10, resets at midnight',
      'Use the keyword search tool to start analyzing keywords of interest',
      'All query history is automatically saved for easy review and comparison',
      'Upgrade to premium for unlimited queries and more analysis features'
    ],

    // Results display
    'results.dataSource': 'Data Source',
    'results.queryTime': 'Query Time',
    'results.queryId': 'Query ID',
    'results.exportCsv': 'Export CSV',
    'results.monthlySearch': 'Monthly Search Volume',
    'results.competition': 'Competition Intensity',
    'results.trendDirection': 'Trend Direction',
    'results.trending': {
      'up': 'Rising',
      'down': 'Declining',
      'stable': 'Stable'
    },
    'results.trendChart': '12-Month Trend Changes',
    'results.interest': 'Interest Level',
    'results.relatedQueries': 'Related Keywords',
    'results.analysisAdvice': 'Analysis Advice',
    'results.advice': [
      'This keyword has high search volume, competition may be fierce, consider long-tail keyword strategies',
      'High competition intensity, recommend optimizing website content quality and authority',
      'Keyword popularity is rising, a good target keyword choice',
      'Keyword popularity is declining, consider focusing on related trending keywords',
      'Consider combining related keywords to develop content strategies and improve coverage'
    ],

    // Common
    'common.noData': 'No Data',
    'common.loading': 'Loading...',
    'common.error': 'Error',
    'common.success': 'Success',
    'common.confirm': 'Confirm',
    'common.cancel': 'Cancel',
    'common.save': 'Save',
    'common.edit': 'Edit',
    'common.delete': 'Delete',
    'common.search': 'Search',
    'common.export': 'Export',
    'common.import': 'Import',
    'common.refresh': 'Refresh',

    // Footer
    'footer.product': 'Product',
    'footer.features': 'Features',
    'footer.pricing': 'Pricing',
    'footer.changelog': 'Changelog',
    'footer.integrations': 'Integrations',
    'footer.mobile': 'Mobile App',
    'footer.enterprise': 'Enterprise',
    'footer.support': 'Support',
    'footer.help': 'Help Center',
    'footer.contact': 'Contact Us',
    'footer.api': 'API Documentation',
    'footer.tutorials': 'Tutorials',
    'footer.community': 'Community',
    'footer.status': 'Service Status',
    'footer.company': 'Company',
    'footer.about': 'About Us',
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Terms of Service',
    'footer.careers': 'Careers',
    'footer.blog': 'Blog',
    'footer.press': 'Press Center',
    'footer.investors': 'Investors',
    'footer.description': 'All-in-one keyword research tool that aggregates multiple data sources to provide intelligent keyword analysis services for SEO specialists and content creators.',
    'footer.rights': 'All rights reserved.',
    'footer.dataSource': 'Data sources: Google Trends, Google Ads, etc.',
    'footer.mission': 'KeywordHub is dedicated to providing professional keyword analysis services for the Chinese SEO market',
    'footer.socialTitle': 'Follow Us',
    'footer.newsletter': 'Subscribe to Our Newsletter',
    'footer.newsletterDesc': 'Get the latest SEO tips and product updates',
    'footer.emailPlaceholder': 'Enter your email address',
    'footer.subscribe': 'Subscribe'
  }
};

interface LanguageProviderProps {
  children: React.ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguageState] = useState<Language>('zh');

  // 从localStorage加载语言设置
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedLanguage = localStorage.getItem('language') as Language;
      if (savedLanguage && (savedLanguage === 'zh' || savedLanguage === 'en')) {
        setLanguageState(savedLanguage);
      }
    }
  }, []);

  // 切换语言并保存到localStorage
  const setLanguage = (lang: Language) => {
    console.log('Setting language to:', lang);
    setLanguageState(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('language', lang);
      console.log('Language saved to localStorage:', lang);
    }
  };

  // 翻译函数
  const t = (key: string): string => {
    // 直接查找完整的键（扁平化结构）
    const currentLangTranslations = translations[language] as Record<string, string>;

    if (currentLangTranslations && currentLangTranslations[key]) {
      return currentLangTranslations[key];
    }

    // 如果当前语言找不到，尝试fallback
    const fallbackLang = language === 'zh' ? 'en' : 'zh';
    const fallbackTranslations = translations[fallbackLang] as Record<string, string>;

    if (fallbackTranslations && fallbackTranslations[key]) {
      return fallbackTranslations[key];
    }

    // 如果都找不到，返回key的最后一部分
    const keyParts = key.split('.');
    const lastKey = keyParts[keyParts.length - 1];
    return lastKey.charAt(0).toUpperCase() + lastKey.slice(1);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}