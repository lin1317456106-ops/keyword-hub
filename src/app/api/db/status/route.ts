import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
  try {
    // 检查用户表
    const { data: users, error: usersError } = await supabase
      .from('users')
      .select('id, email, query_count, subscription_tier, created_at')
      .limit(5);

    // 检查查询表
    const { data: queries, error: queriesError } = await supabase
      .from('queries')
      .select('id, keyword, status, created_at')
      .limit(5);

    // 检查缓存表
    const { data: cache, error: cacheError } = await supabase
      .from('keyword_cache')
      .select('keyword, data_source, created_at, expires_at')
      .limit(5);

    // 统计数据
    const { count: usersCount } = await supabase
      .from('users')
      .select('*', { count: 'exact', head: true });

    const { count: queriesCount } = await supabase
      .from('queries')
      .select('*', { count: 'exact', head: true });

    const { count: cacheCount } = await supabase
      .from('keyword_cache')
      .select('*', { count: 'exact', head: true });

    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      tables: {
        users: {
          count: usersCount,
          error: usersError?.message || null,
          sample: users || []
        },
        queries: {
          count: queriesCount,
          error: queriesError?.message || null,
          sample: queries || []
        },
        cache: {
          count: cacheCount,
          error: cacheError?.message || null,
          sample: cache || []
        }
      },
      connection: {
        status: 'connected',
        url: process.env.NEXT_PUBLIC_SUPABASE_URL
      }
    });

  } catch (error) {
    console.error('Database status check error:', error);
    return NextResponse.json({
      success: false,
      error: 'Database status check failed',
      details: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}