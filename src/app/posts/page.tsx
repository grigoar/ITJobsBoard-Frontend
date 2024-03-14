import SEO from '@/components/common/SEO';
import React from 'react';
import AllPosts from '@/components/Posts/HomePosts/AllPostsWrapper';
import constants from '@/utils/constants';
import { PageSEOModel } from '@/models/Utils/PageSEOModel';
import { BlogPostModel } from '@/models/BlogPosts/BlogPostModel';
import { getAllPosts } from '@/utils/postsHelperServer';
import { getAllPostsLabels } from '@/utils/postsHelperClient';

const Blogs = () => {
  const allPosts: BlogPostModel[] = getAllPosts();
  const postsLabels = getAllPostsLabels(allPosts);

  const pageMeta: PageSEOModel = {
    title: 'Tips & Tricks',
    description: `Learn with ${constants.SITE_NAME} more tips and trick for improving your touch typing skill faster. Learn more about what is touch typing, how to start touch typing, how to improve your typing accuracy, how to improve your typing speed, the benefits of touch typing, keyboard layouts, keyboard types and more.`,
    url: `${constants.SITE_DOMAIN}/posts`,
  };

  return (
    <>
      <SEO pageCustomSEO={pageMeta} />
      <AllPosts posts={allPosts} postsLabels={postsLabels} />
    </>
  );
};

export default Blogs;
