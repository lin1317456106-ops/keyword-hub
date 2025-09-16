'use client'

import { useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { AlertTriangle, Wifi, RefreshCw } from 'lucide-react'
import Link from 'next/link'

export default function AuthError() {
  const searchParams = useSearchParams()
  const error = searchParams.get('error')

  const getErrorMessage = (error: string | null) => {
    switch (error) {
      case 'OAuthSignin':
        return {
          title: 'Google 登录连接失败',
          description: '无法连接到 Google 服务器，这可能是由于网络环境限制。',
          suggestions: [
            '检查您的网络连接',
            '尝试使用 VPN 或代理服务',
            '稍后再试',
            '联系管理员获取帮助'
          ],
          icon: <Wifi className="h-12 w-12 text-red-500" />
        }
      case 'OAuthCallback':
        return {
          title: 'Google 登录回调失败',
          description: '登录过程中出现错误，请重试。',
          suggestions: [
            '清除浏览器缓存和 Cookie',
            '确保时间设置正确',
            '重新尝试登录'
          ],
          icon: <AlertTriangle className="h-12 w-12 text-red-500" />
        }
      case 'OAuthCreateAccount':
        return {
          title: '账户创建失败',
          description: '无法创建您的账户，请稍后重试。',
          suggestions: [
            '检查您的 Google 账户状态',
            '确保邮箱地址有效',
            '联系技术支持'
          ],
          icon: <AlertTriangle className="h-12 w-12 text-red-500" />
        }
      default:
        return {
          title: '登录错误',
          description: '登录过程中发生未知错误。',
          suggestions: [
            '刷新页面重试',
            '清除浏览器缓存',
            '联系技术支持'
          ],
          icon: <AlertTriangle className="h-12 w-12 text-red-500" />
        }
    }
  }

  const errorInfo = getErrorMessage(error)

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            {errorInfo.icon}
          </div>
          <CardTitle className="text-xl font-semibold text-gray-900">
            {errorInfo.title}
          </CardTitle>
          <CardDescription className="text-gray-600">
            {errorInfo.description}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-medium text-gray-900 mb-2">解决建议:</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              {errorInfo.suggestions.map((suggestion, index) => (
                <li key={index} className="flex items-start">
                  <span className="mr-2">•</span>
                  {suggestion}
                </li>
              ))}
            </ul>
          </div>

          {error === 'OAuthSignin' && (
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h5 className="font-medium text-blue-900 mb-1">网络问题提示</h5>
              <p className="text-sm text-blue-700">
                如果您在中国大陆，由于网络限制可能无法直接访问 Google 服务。
                建议使用 VPN 或其他网络代理服务。
              </p>
            </div>
          )}

          <div className="flex flex-col space-y-2">
            <Button
              asChild
              className="w-full"
              variant="default"
            >
              <Link href="/sign-in">
                <RefreshCw className="w-4 h-4 mr-2" />
                重新尝试登录
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="w-full"
            >
              <Link href="/">
                返回首页
              </Link>
            </Button>
          </div>

          {error && (
            <details className="mt-4">
              <summary className="text-sm text-gray-500 cursor-pointer">
                错误详情 (技术信息)
              </summary>
              <code className="text-xs text-gray-400 bg-gray-100 p-2 rounded mt-2 block">
                错误代码: {error}
              </code>
            </details>
          )}
        </CardContent>
      </Card>
    </div>
  )
}