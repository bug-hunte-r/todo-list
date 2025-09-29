import TodoList from '@/components/templates/TodoList';
import { getUser } from '@/configs/authHelper';
import { redirect } from 'next/navigation';

export default async function Home() {

  const isUserLogin = await getUser()

  if (!isUserLogin) {
    redirect('Signup')
  }

  return (
    <>
      <TodoList />
    </>
  );
}
