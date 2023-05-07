import NextAuth from 'next-auth'
import SpotifyProvider from 'next-auth/providers/spotify'
import spotifyApi, { loginUrl } from '@/utils/spotify'

const refreshAccessToken = async (token) => {
  try {

    spotifyApi.setAccessToken(token.accessToken)
    spotifyApi.setRefreshToken(token.refreshToken)

    const { body: refreshedToken } = await spotifyApi.refreshAccessToken()
    console.log('token has been refreshed: ' + refreshedToken)

    return {
      ...token,
      accessToken: refreshedToken.access_token,
      accessTokenExpires: Date.now() + refreshedToken.expires_in * 1000,
      refreshToken: refreshedToken.refresh_token ?? token.refreshToken
    }

  } catch (error) {
    console.error(error)

    return {
      ...token,
      error: 'RefreshAccesTokenError'
    }
  }
}

export const authOptions = {
  providers: [
    SpotifyProvider({
      clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
      authorization: loginUrl
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/login'
  },
  callbacks: {
    // authenticate
    async jwt({ token, account, user }) {

      // on initial sign in
      if (account && user) {
        return {
          ...token,
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
          username: account.providerAccountId,
          // comes back: 3600 = 1 hour in seconds. * 1000 turns it into milliseconds
          accessTokenExpires: account.expires_at * 1000
        }
      }

      // if access token has not expired yet
      if (Date.now() < token.accessTokenExpires) {
        console.log('token is valid')
        return token
      }

      // if access token is expired
      console.log('token is expired')
      return await refreshAccessToken(token)

    }
  },
  // allow the user access to this data
  async session({ session, token }) {
    session.user.accessToken = token.accessToken
    session.user.refreshToken = token.refreshToken
    session.user.username = token.username

    return session
  }
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }