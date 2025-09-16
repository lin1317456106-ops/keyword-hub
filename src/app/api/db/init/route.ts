import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

// 仅在开发环境下允许访问此端点
export async function POST() {
  if (process.env.NODE_ENV !== 'development') {
    return NextResponse.json(
      { error: 'This endpoint is only available in development mode' },
      { status: 403 }
    );
  }

  try {
    console.log('Starting database initialization...');

    // 直接通过SQL创建表，分步执行
    const steps = [
      {
        name: 'Create users table',
        sql: `
          CREATE TABLE IF NOT EXISTS users (
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            email VARCHAR(255) UNIQUE NOT NULL,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
            updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
            query_count INTEGER DEFAULT 0,
            subscription_tier VARCHAR(20) DEFAULT 'free' CHECK (subscription_tier IN ('free', 'pro')),
            last_query_at TIMESTAMP WITH TIME ZONE
          );
        `
      },
      {
        name: 'Create queries table',
        sql: `
          CREATE TABLE IF NOT EXISTS queries (
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            user_id UUID REFERENCES users(id) ON DELETE CASCADE,
            keyword TEXT NOT NULL,
            status VARCHAR(20) DEFAULT 'completed' CHECK (status IN ('pending', 'processing', 'completed', 'failed')),
            results JSONB NOT NULL DEFAULT '{}',
            created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
            updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
          );
        `
      },
      {
        name: 'Create keyword_cache table',
        sql: `
          CREATE TABLE IF NOT EXISTS keyword_cache (
            keyword TEXT PRIMARY KEY,
            data JSONB NOT NULL,
            data_source VARCHAR(50) NOT NULL DEFAULT 'google_trends',
            created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
            updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
            expires_at TIMESTAMP WITH TIME ZONE DEFAULT (NOW() + INTERVAL '24 hours')
          );
        `
      }
    ];

    const results = [];

    for (const step of steps) {
      console.log(`Executing: ${step.name}`);
      try {
        // 尝试创建表 - 使用简单方法
        const { error } = await supabaseAdmin
          .rpc('exec_sql', { sql: step.sql })
          .then(res => res, err => ({ error: err }));

        if (error) {
          console.error(`Error in ${step.name}:`, error);
          results.push({ step: step.name, success: false, error: error.message });
        } else {
          console.log(`Successfully completed: ${step.name}`);
          results.push({ step: step.name, success: true });
        }
      } catch (err) {
        console.error(`Exception in ${step.name}:`, err);
        const errorMessage = err instanceof Error ? err.message : String(err);
        results.push({ step: step.name, success: false, error: errorMessage });
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Database initialization completed',
      results,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Database initialization failed:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Database initialization failed',
        details: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}