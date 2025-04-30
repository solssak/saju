'use client';
import { SessionProvider, signIn, signOut } from 'next-auth/react';

const AuthButton = () => {
  return (
    <SessionProvider>
      <button onClick={() => signIn('kakao')}>카카오 로그인</button>
      <button onClick={() => signOut()}>로그아웃</button>
    </SessionProvider>
  );
};

export default AuthButton;
