'use client';

// import React, { useEffect, useState } from 'react';
import React, { useCallback, useEffect, useState } from 'react';

import { filterPosts, getFeaturedPosts } from '@/utils/postsHelperClient';
import { BlogPostModel } from '../../../models/BlogPosts/BlogPostModel';
import AllPostsGrid from './AllPostsGrid';
import FeaturedPostsGrid from './FeaturedPostsGrid';
import SearchPosts from './Search/SearchPosts';

interface Props {
  posts: BlogPostModel[];
  postsLabels: string[];
}
const AllPosts = ({ posts, postsLabels }: Props) => {
  const [featuredPostsFiltered, setFeaturedPostsFiltered] = useState<BlogPostModel[]>([]);
  const [allPostsFiltered, setAllPostsFiltered] = useState<BlogPostModel[]>([]);
  const [activeTopicsRemaining, setActiveTopicsRemaining] = useState<string[]>([]);

  useEffect(() => {
    const highlightedPosts = getFeaturedPosts(posts);
    setFeaturedPostsFiltered(highlightedPosts);
    setAllPostsFiltered(posts);
  }, [posts]);

  const filterPostsHandler = useCallback(
    (searchTerm: string, activeTopics: string[]) => {
      const { filteredPostsSearch, possibleTagsRemaining } = filterPosts(posts, searchTerm, activeTopics);
      setFeaturedPostsFiltered(getFeaturedPosts(filteredPostsSearch));
      setAllPostsFiltered(filteredPostsSearch);
      if (!possibleTagsRemaining) {
        setActiveTopicsRemaining(postsLabels);
      } else {
        setActiveTopicsRemaining(possibleTagsRemaining);
      }
    },
    [posts, postsLabels]
  );

  return (
    <section className={`pageLayoutContainer mx-6 my-2 font-blog lg:mx-12`}>
      {/* <h1 className={`pageTitle`}>TIPS & TRICKS</h1> */}
      <SearchPosts
        filterPosts={filterPostsHandler}
        topicsPosts={postsLabels}
        activeTopicsRemaining={activeTopicsRemaining}
      />
      <FeaturedPostsGrid featuredPosts={featuredPostsFiltered} />
      <AllPostsGrid posts={allPostsFiltered} />
    </section>
  );
};

export default AllPosts;
