import React from 'react';
import { BlogPostModel } from '../../../models/BlogPosts/BlogPostModel';
import PostItem from './PostItem';

interface Props {
  featuredPosts: BlogPostModel[];
  title?: string;
  titleStyling?: string;
}
const FeaturedPosts = ({ featuredPosts, title = 'Hot Topics', titleStyling }: Props) => {
  if (featuredPosts == null || featuredPosts.length === 0) return <></>;
  return (
    <section className={'relative  mb-10 mt-10 border-t-2 border-[color:var(--color-accent)] pt-7'}>
      <h1
        className={`allPostsTitle ${titleStyling} top absolute left-[50%] min-w-[150px] translate-x-[-50%]  translate-y-[-135%] transform bg-primary px-3 text-center text-[25px] lg:translate-y-[-125%] lg:text-[30px]`}
      >
        {title}
      </h1>
      <ul
        className={
          'row-auto grid list-none auto-rows-[1fr]  grid-cols-[repeat(auto-fit,minmax(200px,1fr))]  content-center  justify-items-center gap-16 lg:grid-cols-[repeat(auto-fit,minmax(min(100%/3,max(210px,100%/4)),1fr))]'
        }
      >
        {featuredPosts.map((post) => (
          <PostItem key={post.slug} post={post} />
        ))}
      </ul>
    </section>
  );
};

export default FeaturedPosts;
