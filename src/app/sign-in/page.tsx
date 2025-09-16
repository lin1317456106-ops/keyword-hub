'use client';

import { signIn, getSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function SignIn() {
  const [isLoading, setIsLoading] = useState(false);
  const [networkStatus, setNetworkStatus] = useState<'checking' | 'online' | 'offline'>('checking');
  const [showNetworkWarning, setShowNetworkWarning] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const error = searchParams.get('error');

  useEffect(() => {
    // Check if user is already signed in
    getSession().then((session) => {
      if (session) {
        router.push('/dashboard');
      }
    });

    // Check network connectivity
    checkNetworkConnectivity();
  }, [router]);

  const checkNetworkConnectivity = async () => {
    try {
      // Try to fetch a simple endpoint to check connectivity
      const response = await fetch('/api/auth/providers', {
        method: 'HEAD',
        cache: 'no-cache'
      });

      if (response.ok) {
        setNetworkStatus('online');
      } else {
        setNetworkStatus('offline');
      }
    } catch (error) {
      console.warn('Network connectivity check failed:', error);
      setNetworkStatus('offline');
      setShowNetworkWarning(true);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    setShowNetworkWarning(false);

    try {
      const result = await signIn('google', {
        callbackUrl: '/dashboard',
        redirect: false // 不立即重定向，以便处理错误
      });

      if (result?.error) {
        console.error('Sign in error:', result.error);
        if (result.error === 'OAuthSignin') {
          setShowNetworkWarning(true);
        }
        setIsLoading(false);
      } else if (result?.url) {
        // 成功时重定向
        window.location.href = result.url;
      }
    } catch (error) {
      console.error('Sign in error:', error);
      setIsLoading(false);
      setShowNetworkWarning(true);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            登录到 KeywordHub
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            使用Google账号快速登录
          </p>
        </div>

        {/* 错误信息显示 */}
        {error && (
          <div className="rounded-md bg-red-50 p-4">
            <div className="text-sm text-red-700">
              <strong>登录失败：</strong>
              {error === 'OAuthSignin' && ' 无法连接到Google服务器，请检查网络连接。'}
              {error === 'OAuthCallback' && ' 登录回调失败，请重试。'}
              {error === 'OAuthCreateAccount' && ' 账户创建失败。'}
              {!['OAuthSignin', 'OAuthCallback', 'OAuthCreateAccount'].includes(error) && ' 发生未知错误。'}
            </div>
          </div>
        )}

        {/* 网络状态警告 */}
        {showNetworkWarning && (
          <div className="rounded-md bg-yellow-50 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-yellow-800">网络连接问题</h3>
                <div className="mt-2 text-sm text-yellow-700">
                  <p>无法连接到Google服务器。如果您在中国大陆，可能需要使用VPN或代理服务。</p>
                  <div className="mt-2">
                    <button
                      onClick={checkNetworkConnectivity}
                      className="text-yellow-800 underline hover:text-yellow-900"
                    >
                      重新检查网络连接
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 网络状态指示器 */}
        <div className="flex items-center justify-center space-x-2">
          <div className={`h-2 w-2 rounded-full ${
            networkStatus === 'checking' ? 'bg-yellow-500' :
            networkStatus === 'online' ? 'bg-green-500' : 'bg-red-500'
          }`}></div>
          <span className="text-xs text-gray-500">
            {networkStatus === 'checking' && '检查网络连接...'}
            {networkStatus === 'online' && '网络连接正常'}
            {networkStatus === 'offline' && '网络连接异常'}
          </span>
        </div>

        <div className="mt-8 space-y-6">
          <button
            onClick={handleGoogleSignIn}
            disabled={isLoading || networkStatus === 'offline'}
            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="flex items-center">
                <div className="animate-spin -ml-1 mr-3 h-5 w-5 text-white">
                  <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                </div>
                正在连接Google服务器...
              </div>
            ) : (
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                使用Google账号登录
              </div>
            )}
          </button>

          {networkStatus === 'offline' && (
            <div className="text-center">
              <p className="text-sm text-gray-600">
                网络连接异常，无法使用Google登录。请检查网络后重试。
              </p>
            </div>
          )}
        </div>

        <div className="text-center">
          <Link href="/" className="text-sm text-blue-600 hover:text-blue-500">
            返回首页
          </Link>
        </div>
      </div>
    </div>
  );
}