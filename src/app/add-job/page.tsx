import AddJobPost from '@/components/JobPosts/AddJobPost';
import { checkUserIsLoggedIn } from '@/utils/helpersServer';
import React, { Suspense } from 'react';
import { redirect } from 'next/navigation';

const AddJobPostPage = async () => {
  const isUserLogged = await checkUserIsLoggedIn();
  if (!isUserLogged) {
    redirect('/login?add-job=true');
  }
  return (
    <Suspense>
      <AddJobPost />
    </Suspense>
  );
};

export default AddJobPostPage;
