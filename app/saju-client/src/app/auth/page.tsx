import AuthButton from '@/features/auth';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/authOptions';

export default async function AuthPage() {
  const session = await getServerSession(authOptions);
  console.log('session', session);

  return <AuthButton />;
}
