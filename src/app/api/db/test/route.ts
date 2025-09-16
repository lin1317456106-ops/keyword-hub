import { NextResponse } from 'next/server';
import { supabase, supabaseAdmin } from '@/lib/supabase';

export async function GET() {
  try {
    // 测试基本连接
    const { error: healthError } = await supabase
      .from('users')
      .select('count')
      .limit(1);

    if (healthError) {
      console.error('Supabase connection error:', healthError);
      return NextResponse.json({
        success: false,
        error: 'Database connection failed',
        details: healthError.message
      }, { status: 500 });
    }

    // 测试表是否存在
    const { error: tableError } = await supabaseAdmin.rpc('check_table_exists', {
      table_name: 'users'
    }).select();

    return NextResponse.json({
      success: true,
      message: 'Database connection successful',
      status: {
        connection: 'healthy',
        tables_accessible: !tableError,
        table_error: tableError?.message || null
      }
    });

  } catch (error) {
    console.error('Database test error:', error);
    return NextResponse.json({
      success: false,
      error: 'Database test failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}