// 数据库功能测试脚本
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// 获取当前文件目录
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 手动读取 .env.local 文件
const envPath = path.join(__dirname, '.env.local');
const envContent = fs.readFileSync(envPath, 'utf8');
const envLines = envContent.split('\n');

const env = {};
envLines.forEach(line => {
  const [key, ...valueParts] = line.split('=');
  if (key && valueParts.length > 0) {
    env[key.trim()] = valueParts.join('=').trim();
  }
});

const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('缺少 Supabase 配置');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function testDatabase() {
  console.log('🔍 开始测试数据库功能...\n');

  try {
    // 1. 测试连接
    console.log('1. 测试数据库连接...');
    const { error: connectionError } = await supabase
      .from('users')
      .select('count', { count: 'exact', head: true });

    if (connectionError) {
      console.error('❌ 连接失败:', connectionError.message);
      return;
    }
    console.log('✅ 数据库连接成功\n');

    // 2. 测试用户表
    console.log('2. 测试用户表...');
    const { data: users, error: usersError } = await supabase
      .from('users')
      .select('*')
      .limit(5);

    if (usersError) {
      console.error('❌ 用户表查询失败:', usersError.message);
    } else {
      console.log(`✅ 用户表正常，当前有 ${users.length} 条记录`);
      if (users.length > 0) {
        console.log('最新用户示例:', users[0]);
      }
    }

    // 3. 测试查询表
    console.log('\n3. 测试查询表...');
    const { data: queries, error: queriesError } = await supabase
      .from('queries')
      .select('*')
      .limit(5);

    if (queriesError) {
      console.error('❌ 查询表访问失败:', queriesError.message);
    } else {
      console.log(`✅ 查询表正常，当前有 ${queries.length} 条记录`);
      if (queries.length > 0) {
        console.log('最新查询示例:', queries[0]);
      }
    }

    // 4. 测试缓存表
    console.log('\n4. 测试缓存表...');
    const { data: cache, error: cacheError } = await supabase
      .from('keyword_cache')
      .select('*')
      .limit(5);

    if (cacheError) {
      console.error('❌ 缓存表访问失败:', cacheError.message);
    } else {
      console.log(`✅ 缓存表正常，当前有 ${cache.length} 条记录`);
      if (cache.length > 0) {
        console.log('最新缓存示例:', cache[0]);
      }
    }

    // 5. 创建测试用户（如果不存在）
    console.log('\n5. 测试用户创建功能...');
    const testEmail = 'test@example.com';

    // 先检查是否存在
    const { data: existingUser } = await supabase
      .from('users')
      .select('*')
      .eq('email', testEmail)
      .single();

    if (existingUser) {
      console.log('✅ 测试用户已存在:', existingUser);
    } else {
      // 创建测试用户
      const { data: newUser, error: createError } = await supabase
        .from('users')
        .insert([{
          email: testEmail,
          query_count: 0,
          subscription_tier: 'free'
        }])
        .select()
        .single();

      if (createError) {
        console.error('❌ 用户创建失败:', createError.message);
      } else {
        console.log('✅ 测试用户创建成功:', newUser);
      }
    }

    // 6. 测试查询记录创建
    console.log('\n6. 测试查询记录创建...');
    const { data: testUser } = await supabase
      .from('users')
      .select('*')
      .eq('email', testEmail)
      .single();

    if (testUser) {
      const testResults = [{
        keyword: 'test-keyword',
        search_volume: 1000,
        competition: 'low',
        trends: [50, 60, 70, 80, 90],
        related_keywords: ['keyword1', 'keyword2'],
        data_source: 'test'
      }];

      const { data: queryRecord, error: queryError } = await supabase
        .from('queries')
        .insert([{
          user_id: testUser.id,
          keyword: 'test-keyword',
          results: JSON.stringify(testResults),
          status: 'completed'
        }])
        .select()
        .single();

      if (queryError) {
        console.error('❌ 查询记录创建失败:', queryError.message);
      } else {
        console.log('✅ 查询记录创建成功:', queryRecord);
      }
    }

    // 7. 测试缓存功能
    console.log('\n7. 测试缓存功能...');
    const testKeyword = 'test-cache-keyword';
    const testData = {
      keyword: testKeyword,
      search_volume: 2000,
      competition: 'medium',
      trends: [40, 50, 60, 70, 80],
      related_keywords: ['cache1', 'cache2'],
      data_source: 'test'
    };

    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 24);

    const { data: cacheRecord, error: cacheInsertError } = await supabase
      .from('keyword_cache')
      .upsert([{
        keyword: testKeyword.toLowerCase(),
        data: JSON.stringify(testData),
        data_source: 'test',
        expires_at: expiresAt.toISOString()
      }])
      .select()
      .single();

    if (cacheInsertError) {
      console.error('❌ 缓存创建失败:', cacheInsertError.message);
    } else {
      console.log('✅ 缓存创建成功:', cacheRecord);
    }

    console.log('\n🎉 数据库功能测试完成！');

  } catch (error) {
    console.error('💥 测试过程中发生错误:', error);
  }
}

testDatabase().then(() => {
  console.log('\n测试结束');
  process.exit(0);
}).catch(error => {
  console.error('测试失败:', error);
  process.exit(1);
});