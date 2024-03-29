import AddJobPost from '@/components/JobPosts/AddJobPost';
import React, { Suspense } from 'react';

const AddJobPostPage = () => {
  return (
    <Suspense>
      <AddJobPost />
    </Suspense>
  );
};

export default AddJobPostPage;
