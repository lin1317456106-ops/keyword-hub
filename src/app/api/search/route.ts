import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { userService, queryService, cacheService } from '@/lib/database';
import { googleTrendsService } from '@/lib/google-trends';
import { validateKeyword, cleanKeyword } from '@/lib/utils';

export async function POST(request: NextRequest) {
  try {
    console.log('Search API called');

    const { keyword } = await request.json();

    // 验证输入
    const validation = validateKeyword(keyword);
    if (!validation.isValid) {
      return NextResponse.json(
        { error: validation.error },
        { status: 400 }
      );
    }

    // 清理关键词
    const cleanedKeyword = cleanKeyword(keyword);
    console.log(`Searching for keyword: ${cleanedKeyword}`);

    // 检查用户认证（可选）
    const session = await getServerSession(authOptions);
    console.log('Session:', session?.user?.email || 'No session');

    let user = null;
    let currentCount = 1;
    let canQuery = true;

    if (session?.user?.email) {
      try {
        // 获取或创建用户
        user = await userService.getOrCreateUser(session.user.email);
        console.log('User retrieved/created:', user?.id || 'Failed');

        if (user) {
          // 检查用户查询限制
          const queryCheck = await userService.checkUserQueryLimit(user.id);
          currentCount = queryCheck.currentCount;
          canQuery = queryCheck.canQuery;
          console.log(`Query limit check: ${currentCount}/10, canQuery: ${canQuery}`);

          if (!canQuery) {
            return NextResponse.json(
              {
                error: '已达到每日查询限制',
                details: `免费用户每日限制10次查询，当前已使用 ${currentCount} 次`
              },
              { status: 429 }
            );
          }
        }
      } catch (dbError) {
        console.error('Database operation failed, but continuing without user tracking:', dbError);
        // 继续执行，不因为数据库错误而中断搜索
      }
    }

    // 首先检查缓存
    let keywordData = null;
    if (user) {
      try {
        keywordData = await cacheService.getCachedKeywordData(cleanedKeyword);
        console.log('Cache check result:', keywordData ? 'Hit' : 'Miss');
      } catch (cacheError) {
        console.error('Cache check failed:', cacheError);
      }
    }

    if (!keywordData) {
      // 缓存中没有数据，调用Google Trends API
      console.log('Fetching data from Google Trends API...');
      keywordData = await googleTrendsService.getKeywordData(cleanedKeyword);

      if (!keywordData) {
        return NextResponse.json(
          { error: '无法获取关键词数据，请稍后重试' },
          { status: 503 }
        );
      }

      console.log('Successfully got data from Google Trends');

      // 缓存结果（如果有用户）
      if (user) {
        try {
          await cacheService.cacheKeywordData(cleanedKeyword, keywordData, 'google_trends');
          console.log('Data cached successfully');
        } catch (cacheError) {
          console.error('Failed to cache data:', cacheError);
        }
      }
    }

    // 增加用户查询计数（如果有用户）
    let queryRecord = null;
    if (user) {
      try {
        await userService.incrementQueryCount(user.id);
        // 保存查询记录
        queryRecord = await queryService.createQuery(user.id, cleanedKeyword, [keywordData]);
        console.log('Query record created:', queryRecord?.id || 'Failed');
      } catch (dbError) {
        console.error('Failed to save query record:', dbError);
      }
    }

    console.log(`Search completed successfully for: ${cleanedKeyword}`);

    return NextResponse.json({
      success: true,
      data: {
        keyword: cleanedKeyword,
        results: [keywordData],
        query_id: queryRecord?.id || `temp_${Date.now()}`,
        from_cache: keywordData.data_source === 'cached',
        usage: {
          current_count: user ? currentCount + 1 : 1,
          daily_limit: 10
        }
      }
    });

  } catch (error) {
    console.error('Error in POST /api/search:', error);
    return NextResponse.json(
      {
        error: '服务器内部错误',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// 获取搜索建议
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');

    if (!query || query.length < 2) {
      return NextResponse.json({
        success: true,
        suggestions: []
      });
    }

    // 生成简单的搜索建议
    const suggestions = generateSearchSuggestions(query);

    return NextResponse.json({
      success: true,
      suggestions
    });

  } catch (error) {
    console.error('Error in GET /api/search:', error);
    return NextResponse.json(
      { error: 'Failed to get search suggestions' },
      { status: 500 }
    );
  }
}

// 生成搜索建议的辅助函数
function generateSearchSuggestions(query: string): string[] {
  const suggestions: string[] = [];
  const commonSuffixes = ['工具', '教程', '技巧', '方法', '平台', '软件', '免费', '在线'];
  const commonPrefixes = ['如何', '什么是', '怎么', '最好的', '免费的'];

  // 添加原始查询
  suggestions.push(query);

  // 添加后缀建议
  commonSuffixes.slice(0, 3).forEach(suffix => {
    suggestions.push(`${query}${suffix}`);
  });

  // 添加前缀建议
  commonPrefixes.slice(0, 2).forEach(prefix => {
    suggestions.push(`${prefix}${query}`);
  });

  return suggestions.filter(s => s.length <= 30).slice(0, 8);
}