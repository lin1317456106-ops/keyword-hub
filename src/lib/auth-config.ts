import { AuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      httpOptions: {
        timeout: 10000,
      },
    })
  ],
  pages: {
    signIn: '/sign-in',
    signOut: '/sign-out',
    error: '/auth/error',
  },
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token
      }
      return token
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken as string
      return session
    },
    async signIn({ user }) {
      try {
        console.log('SignIn callback - processing user:', {
          email: user.email,
          name: user.name
        })

        // 暂时简化，不依赖数据库
        // 后续可以重新启用数据库用户创建
        console.log('User sign in successful (database operations disabled temporarily)')
        return true

      } catch (error) {
        console.error('Error in signIn callback:', error)
        // 即使出错也允许登录
        return true
      }
    },
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: false,
}