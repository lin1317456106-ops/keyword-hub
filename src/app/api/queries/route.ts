import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { queryService, userService } from '@/lib/database';

// 获取用户查询历史
export async function GET(request: NextRequest) {
  try {
    console.log('GET /api/queries - Starting request');
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      console.log('GET /api/queries - No session found');
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    console.log('GET /api/queries - User email:', session.user.email);

    // 获取或创建用户
    const user = await userService.getOrCreateUser(session.user.email);
    if (!user) {
      console.log('GET /api/queries - User not found in database');
      return NextResponse.json(
        { error: '用户不存在' },
        { status: 404 }
      );
    }

    console.log('GET /api/queries - User found:', user.id);

    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '20');
    const page = parseInt(searchParams.get('page') || '1');

    // 获取查询历史
    const queries = await queryService.getUserQueryHistory(user.id, limit);
    console.log('GET /api/queries - Found queries:', queries.length);

    // 转换数据格式，用于前端显示
    const queryHistory = queries.map(query => ({
      id: query.id,
      keyword: query.keyword,
      created_at: query.created_at,
      result_count: Array.isArray(query.results) ? query.results.length : 0
    }));

    return NextResponse.json({
      success: true,
      data: queryHistory,
      pagination: {
        page,
        limit,
        total: queryHistory.length
      }
    });

  } catch (error) {
    console.error('Error in GET /api/queries:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// 根据ID获取单个查询详情
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // 获取或创建用户
    const user = await userService.getOrCreateUser(session.user.email);
    if (!user) {
      return NextResponse.json(
        { error: '用户不存在' },
        { status: 404 }
      );
    }

    const { queryId } = await request.json();

    if (!queryId) {
      return NextResponse.json(
        { error: 'Query ID is required' },
        { status: 400 }
      );
    }

    const query = await queryService.getQueryById(queryId, user.id);

    if (!query) {
      return NextResponse.json(
        { error: 'Query not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: query
    });

  } catch (error) {
    console.error('Error in POST /api/queries:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}