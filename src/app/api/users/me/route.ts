import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { userService } from '@/lib/database';

// 获取当前用户信息
export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const user = await userService.getOrCreateUser(session.user.email);

    if (!user) {
      return NextResponse.json(
        { error: 'Failed to get user information' },
        { status: 500 }
      );
    }

    // 检查用户查询限制信息
    const { canQuery, currentCount } = await userService.checkUserQueryLimit(user.id);

    return NextResponse.json({
      success: true,
      user: {
        ...user,
        usage: {
          current_count: currentCount,
          daily_limit: user.subscription_tier === 'pro' ? 1000 : 10,
          can_query: canQuery
        }
      }
    });

  } catch (error) {
    console.error('Error in GET /api/users/me:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// 更新用户信息
export async function PATCH(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { subscription_tier } = body;

    // 验证输入
    if (subscription_tier && !['free', 'pro'].includes(subscription_tier)) {
      return NextResponse.json(
        { error: 'Invalid subscription tier' },
        { status: 400 }
      );
    }

    // TODO: 实现用户信息更新逻辑
    // 这里需要实现用户信息的更新功能

    return NextResponse.json({
      success: true,
      message: 'User updated successfully'
    });

  } catch (error) {
    console.error('Error in PATCH /api/users/me:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}