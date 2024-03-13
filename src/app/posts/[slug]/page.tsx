import React from 'react';
import { getPostData, getRandomFeaturedPostsLocalFiles } from '@/utils/postsHelper';
import constants from '@/utils/constants';
import { BlogPostModel } from '@/models/BlogPosts/BlogPostModel';
import SEO from '@/components/common/SEO';
import PostContent from '@/components/Posts/PostDetails/PostContent';

interface Props {
  params: {
    slug: string;
  };
}

const PostDetailPage = ({ params }: Props) => {
  const post: BlogPostModel = getPostData(params.slug);
  const relatedPosts = getRandomFeaturedPostsLocalFiles(params.slug, 2);

  const blogPageDetailsSEO = {
    title: post.title,
    description: `${post.excerpt} - ${constants.SITE_NAME}`,
    keywords: `${post.keywords ? post.keywords : constants.WEBSITE_SEO_KEYWORDS_DEFAULT}`,
    url: `${constants.SITE_DOMAIN}/posts/${post.slug}`,
  };
  return (
    <>
      <SEO pageCustomSEO={blogPageDetailsSEO} />
      <PostContent post={post} relatedPosts={relatedPosts} />
    </>
  );
};

export default PostDetailPage;
