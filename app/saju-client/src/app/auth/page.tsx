import AuthButton from '@/features/auth';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';

export default async function AuthPage() {
  const session = await getServerSession(authOptions);
  console.log('session', session);

  return <AuthButton />;
}
