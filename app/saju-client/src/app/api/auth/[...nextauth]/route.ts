import NextAuth, { AuthOptions } from 'next-auth';
import { authOptions } from './authOptions';
// Kakao access token refresh 함수

const handler = NextAuth(authOptions as AuthOptions);

export { handler as GET, handler as POST };
