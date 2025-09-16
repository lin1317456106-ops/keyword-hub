import { supabase, supabaseAdmin } from './supabase';
import type { User, KeywordQuery, KeywordResult } from '@/types';

// 用户相关操作
export const userService = {
  // 根据邮箱获取或创建用户
  async getOrCreateUser(email: string): Promise<User | null> {
    try {
      console.log('Attempting to get or create user:', email);

      // 首先尝试获取用户
      const { data: existingUser, error: fetchError } = await supabase
        .from('users')
        .select('*')
        .eq('email', email)
        .single();

      if (existingUser && !fetchError) {
        console.log('User found:', existingUser);
        return existingUser;
      }

      // 只有在确实没有找到用户时才创建新用户（PGRST116 表示没有行返回）
      if (fetchError && fetchError.code === 'PGRST116') {
        console.log('User not found, creating new user');

        // 如果用户不存在，使用admin client创建新用户
        const { data: newUser, error: createError } = await supabaseAdmin
          .from('users')
          .insert([{
            email,
            query_count: 0,
            subscription_tier: 'free'
          }])
          .select()
          .single();

        if (createError) {
          // 如果是因为用户已存在（并发创建导致），再次尝试获取
          if (createError.code === '23505') {
            console.log('User already exists (concurrent creation), fetching existing user');
            const { data: existingUser, error: refetchError } = await supabase
              .from('users')
              .select('*')
              .eq('email', email)
              .single();

            if (existingUser && !refetchError) {
              console.log('Successfully fetched existing user:', existingUser);
              return existingUser;
            }
          }

          console.error('Error creating user:', createError);

          // 如果是因为表不存在，尝试初始化数据库
          if (createError.code === '42P01') {
            console.log('Table does not exist, need to initialize database');
          }

          return null;
        }

        console.log('User created successfully:', newUser);
        return newUser;
      }

      // 其他类型的错误
      console.error('Unexpected error fetching user:', fetchError);
      return null;
    } catch (error) {
      console.error('Error in getOrCreateUser:', error);
      return null;
    }
  },

  // 更新用户查询计数
  async incrementQueryCount(userId: string): Promise<boolean> {
    try {
      console.log('Incrementing query count for user:', userId);

      // 使用 rpc 调用来递增计数器
      const { error } = await supabaseAdmin
        .rpc('increment_query_count', { user_id: userId });

      if (error) {
        console.error('Error incrementing query count:', error);
        return false;
      }

      console.log('Successfully incremented query count for user:', userId);
      return true;
    } catch (error) {
      console.error('Error incrementing query count:', error);
      return false;
    }
  },

  // 检查用户查询限制
  async checkUserQueryLimit(userId: string): Promise<{ canQuery: boolean; currentCount: number }> {
    try {
      const { data: user, error } = await supabase
        .from('users')
        .select('query_count, subscription_tier, last_query_at')
        .eq('id', userId)
        .single();

      if (error || !user) {
        console.error('Error checking query limit:', error);
        return { canQuery: false, currentCount: 0 };
      }

      const today = new Date().toDateString();
      const lastQueryDate = user.last_query_at ? new Date(user.last_query_at).toDateString() : null;

      // 如果是新的一天，重置计数
      let currentCount = user.query_count || 0;
      if (lastQueryDate !== today) {
        currentCount = 0;
        // 重置数据库中的计数
        await supabaseAdmin
          .from('users')
          .update({ query_count: 0 })
          .eq('id', userId);
      }

      const limit = user.subscription_tier === 'pro' ? 1000 : 10;
      const canQuery = currentCount < limit;

      return { canQuery, currentCount };
    } catch (error) {
      console.error('Error checking query limit:', error);
      return { canQuery: false, currentCount: 0 };
    }
  }
};

// 查询相关操作
export const queryService = {
  // 创建新查询记录
  async createQuery(userId: string, keyword: string, results: KeywordResult[]): Promise<KeywordQuery | null> {
    try {
      console.log('Creating query record:', { userId, keyword, resultsCount: results.length });

      const { data, error } = await supabaseAdmin
        .from('queries')
        .insert([{
          user_id: userId,
          keyword,
          results: JSON.stringify(results),
          status: 'completed'
        }])
        .select()
        .single();

      if (error) {
        console.error('Error creating query:', error);
        return null;
      }

      console.log('Successfully created query record:', data.id);
      return {
        ...data,
        results: JSON.parse(data.results)
      };
    } catch (error) {
      console.error('Error in createQuery:', error);
      return null;
    }
  },

  // 获取用户查询历史
  async getUserQueryHistory(userId: string, limit: number = 20): Promise<KeywordQuery[]> {
    try {
      const { data, error } = await supabase
        .from('queries')
        .select('*')
        .eq('user_id', userId)
        .eq('status', 'completed')
        .order('created_at', { ascending: false })
        .limit(limit);

      if (error) {
        console.error('Error fetching query history:', error);
        return [];
      }

      return data.map(query => ({
        ...query,
        results: JSON.parse(query.results)
      }));
    } catch (error) {
      console.error('Error in getUserQueryHistory:', error);
      return [];
    }
  },

  // 根据ID获取查询
  async getQueryById(queryId: string, userId: string): Promise<KeywordQuery | null> {
    try {
      const { data, error } = await supabase
        .from('queries')
        .select('*')
        .eq('id', queryId)
        .eq('user_id', userId)
        .single();

      if (error) {
        console.error('Error fetching query:', error);
        return null;
      }

      return {
        ...data,
        results: JSON.parse(data.results)
      };
    } catch (error) {
      console.error('Error in getQueryById:', error);
      return null;
    }
  }
};

// 缓存相关操作
export const cacheService = {
  // 获取缓存的关键词数据
  async getCachedKeywordData(keyword: string): Promise<KeywordResult | null> {
    try {
      console.log('Checking cache for keyword:', keyword);

      const { data, error } = await supabase
        .from('keyword_cache')
        .select('*')
        .eq('keyword', keyword.toLowerCase())
        .gt('expires_at', new Date().toISOString())
        .single();

      if (error || !data) {
        console.log('No cache found for keyword:', keyword);
        return null;
      }

      console.log('Cache hit for keyword:', keyword);
      return JSON.parse(data.data);
    } catch (error) {
      console.error('Error getting cached data:', error);
      return null;
    }
  },

  // 缓存关键词数据
  async cacheKeywordData(keyword: string, data: KeywordResult, dataSource: string = 'google_trends'): Promise<boolean> {
    try {
      console.log('Caching keyword data:', keyword);

      const expiresAt = new Date();
      expiresAt.setHours(expiresAt.getHours() + 24); // 24小时过期

      const { error } = await supabaseAdmin
        .from('keyword_cache')
        .upsert([{
          keyword: keyword.toLowerCase(),
          data: JSON.stringify(data),
          data_source: dataSource,
          expires_at: expiresAt.toISOString()
        }]);

      if (error) {
        console.error('Error caching keyword data:', error);
        return false;
      }

      console.log('Successfully cached keyword data:', keyword);
      return true;
    } catch (error) {
      console.error('Error caching keyword data:', error);
      return false;
    }
  },

  // 清理过期缓存
  async cleanupExpiredCache(): Promise<void> {
    try {
      await supabaseAdmin.rpc('cleanup_expired_cache');
    } catch (error) {
      console.error('Error cleaning up cache:', error);
    }
  }
};