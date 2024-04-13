import AddJobPost from '@/components/JobPosts/AddJobPost';
import { checkUserIsLoggedIn } from '@/utils/helpersServer';
import React, { Suspense } from 'react';
import { redirect } from 'next/navigation';
import LoadingSpinner from '@/components/common/LoadingSpinner/LoadingSpinner';
import constants from '@/utils/constants';

const AddJobPostPage = async () => {
  const isUserLogged = await checkUserIsLoggedIn();
  if (!isUserLogged) {
    redirect('/login?add-job=true');
  }
  return (
    <Suspense fallback={<LoadingSpinner height={constants.LOADING_SPINNER_HEIGHT_MAX_ELEMENT} />}>
      <AddJobPost />
    </Suspense>
  );
};

export default AddJobPostPage;
