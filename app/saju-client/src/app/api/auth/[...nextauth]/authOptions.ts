import { Account, Session } from 'next-auth';
import KakaoProvider from 'next-auth/providers/kakao';
import { JWT } from 'next-auth/jwt';
import axios from 'axios';

async function refreshAccessToken(token: JWT): Promise<JWT> {
  try {
    const url =
      `https://kauth.kakao.com/oauth/token?` +
      new URLSearchParams({
        grant_type: 'refresh_token',
        client_id: process.env.KAKAO_CLIENT_ID!,
        refresh_token: token.refreshToken as string,
      });

    const response = await axios.post(url);
    const refreshedTokens = response.data;

    return {
      ...token,
      accessToken: refreshedTokens.access_token,
      accessTokenExpires: Date.now() + refreshedTokens.expires_in * 1000,
      refreshToken: refreshedTokens.refresh_token ?? token.refreshToken,
    };
  } catch (error) {
    console.error('RefreshAccessTokenError', error);
    return {
      ...token,
      error: 'RefreshAccessTokenError',
    };
  }
}

export const authOptions = {
  providers: [
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID!,
      clientSecret: process.env.KAKAO_CLIENT_SECRET!,
    }),
  ],
  session: {
    strategy: 'jwt',
  } as const,
  callbacks: {
    async jwt({ token, account }: { token: JWT; account?: Account | null }) {
      // 최초 로그인 시
      if (account) {
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
        token.accessTokenExpires = account.expires_at
          ? account.expires_at * 1000
          : undefined;
      }
      // accessToken 만료 안 됨
      if (token.accessTokenExpires && Date.now() < token.accessTokenExpires) {
        return token;
      }
      // accessToken 만료됨 → refresh 시도
      return await refreshAccessToken(token);
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      session.accessToken = token.accessToken as string;
      session.refreshToken = token.refreshToken as string;
      session.error = token.error as string | undefined;
      return session;
    },
  },
};
