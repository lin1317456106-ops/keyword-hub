'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Download, TrendingUp, TrendingDown, BarChart3, ExternalLink } from 'lucide-react';
import { formatNumber, formatDate } from '@/lib/utils';
import { useLanguage } from '@/contexts/language-context';
import type { KeywordResult } from '@/types';

interface ResultsDisplayProps {
  keyword: string;
  results: KeywordResult[];
  queryId?: string;
  onExport?: () => void;
}

export default function ResultsDisplay({ keyword, results, queryId, onExport }: ResultsDisplayProps) {
  const { t } = useLanguage();

  if (!results || results.length === 0) {
    return null;
  }

  const primaryResult = results[0];
  const { trend_data, related_queries, search_volume, competition_score, data_source } = primaryResult;

  // 计算趋势方向
  const getTrendDirection = () => {
    if (!trend_data || trend_data.length < 2) return null;
    const recent = trend_data.slice(-3).map(d => d.value);
    const average = recent.reduce((sum, val) => sum + val, 0) / recent.length;
    const earlier = trend_data.slice(0, -3).map(d => d.value);
    const earlierAvg = earlier.reduce((sum, val) => sum + val, 0) / earlier.length;

    if (average > earlierAvg * 1.1) return 'up';
    if (average < earlierAvg * 0.9) return 'down';
    return 'stable';
  };

  const trendDirection = getTrendDirection();

  // 准备图表数据
  const chartData = trend_data?.map(point => ({
    date: formatDate(point.date),
    value: point.value,
    fullDate: point.date
  })) || [];

  // 获取分析建议
  const getAnalysisAdvice = () => {
    const advice = [];
    const adviceList = t('results.advice');

    if (search_volume && search_volume > 10000) {
      advice.push(Array.isArray(adviceList) ? adviceList[0] : '该关键词搜索量较高，竞争可能激烈，建议结合长尾词策略');
    }
    if (competition_score && competition_score > 0.7) {
      advice.push(Array.isArray(adviceList) ? adviceList[1] : '竞争强度较高，建议优化网站内容质量和权威性');
    }
    if (trendDirection === 'up') {
      advice.push(Array.isArray(adviceList) ? adviceList[2] : '关键词热度呈上升趋势，是不错的目标词选择');
    }
    if (trendDirection === 'down') {
      advice.push(Array.isArray(adviceList) ? adviceList[3] : '关键词热度下降，建议关注相关热门词汇');
    }
    if (related_queries && related_queries.length > 0) {
      advice.push(Array.isArray(adviceList) ? adviceList[4] : '可考虑结合相关关键词制定内容策略，提升覆盖面');
    }
    return advice;
  };

  const analysisAdvice = getAnalysisAdvice();

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* 关键词概览 */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{keyword}</h2>
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <span>{t('results.dataSource')}: {data_source === 'google_trends' ? 'Google Trends' : data_source}</span>
              <span>•</span>
              <span>{t('results.queryTime')}: {new Date().toLocaleString('zh-CN')}</span>
              {queryId && (
                <>
                  <span>•</span>
                  <span>{t('results.queryId')}: {queryId.slice(0, 8)}</span>
                </>
              )}
            </div>
          </div>
          {onExport && (
            <button
              onClick={onExport}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
            >
              <Download className="w-4 h-4 mr-2" />
              {t('results.exportCsv')}
            </button>
          )}
        </div>

        {/* 关键指标 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {search_volume && (
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-1">
                {formatNumber(search_volume)}
              </div>
              <div className="text-sm text-gray-500">{t('results.monthlySearch')}</div>
            </div>
          )}

          {competition_score !== undefined && (
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600 mb-1">
                {(competition_score * 100).toFixed(0)}%
              </div>
              <div className="text-sm text-gray-500">{t('results.competition')}</div>
            </div>
          )}

          {trend_data && (
            <div className="text-center">
              <div className="flex items-center justify-center mb-1">
                {trendDirection === 'up' && (
                  <>
                    <TrendingUp className="w-8 h-8 text-green-600 mr-2" />
                    <span className="text-3xl font-bold text-green-600">{t('results.trending.up')}</span>
                  </>
                )}
                {trendDirection === 'down' && (
                  <>
                    <TrendingDown className="w-8 h-8 text-red-600 mr-2" />
                    <span className="text-3xl font-bold text-red-600">{t('results.trending.down')}</span>
                  </>
                )}
                {trendDirection === 'stable' && (
                  <>
                    <BarChart3 className="w-8 h-8 text-gray-600 mr-2" />
                    <span className="text-3xl font-bold text-gray-600">{t('results.trending.stable')}</span>
                  </>
                )}
              </div>
              <div className="text-sm text-gray-500">{t('results.trendDirection')}</div>
            </div>
          )}
        </div>

        {/* 趋势图表 */}
        {trend_data && trend_data.length > 0 && (
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('results.trendChart')}</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="date"
                    tick={{ fontSize: 12 }}
                    tickFormatter={(value) => value.split(' ')[0]}
                  />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip
                    labelFormatter={(value, payload) => {
                      const dataPoint = payload?.[0]?.payload;
                      return dataPoint?.fullDate ? formatDate(dataPoint.fullDate) : value;
                    }}
                    formatter={(value) => [`${value}`, t('results.interest')]}
                  />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#3B82F6"
                    strokeWidth={2}
                    dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </div>

      {/* 相关查询 */}
      {related_queries && related_queries.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('results.relatedQueries')}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {related_queries.map((query, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors"
              >
                <span className="text-sm font-medium text-gray-900">{query}</span>
                <ExternalLink className="w-4 h-4 text-gray-400" />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 分析建议 */}
      {analysisAdvice.length > 0 && (
        <div className="bg-blue-50 rounded-lg border border-blue-200 p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-3">{t('results.analysisAdvice')}</h3>
          <div className="space-y-2 text-sm text-blue-800">
            {analysisAdvice.map((advice, index) => (
              <p key={index}>• {advice}</p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}