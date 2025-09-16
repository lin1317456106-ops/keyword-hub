// 用户类型
export interface User {
  id: string;
  email: string;
  created_at: string;
  query_count: number;
  subscription_tier: 'free' | 'pro';
}

// 关键词查询类型
export interface KeywordQuery {
  id: string;
  user_id: string;
  keyword: string;
  results: KeywordResult[];
  created_at: string;
}

// 关键词结果类型
export interface KeywordResult {
  keyword: string;
  search_volume?: number;
  competition_score?: number;
  cpc?: number;
  trend_data?: TrendDataPoint[];
  related_queries?: string[];
  data_source: 'google_trends' | 'google_ads' | 'cached';
}

// 趋势数据点
export interface TrendDataPoint {
  date: string;
  value: number;
}

// API响应类型
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// 搜索请求类型
export interface SearchRequest {
  keyword: string;
  user_id?: string;
}

// 查询历史类型
export interface QueryHistory {
  id: string;
  keyword: string;
  created_at: string;
  result_count: number;
}