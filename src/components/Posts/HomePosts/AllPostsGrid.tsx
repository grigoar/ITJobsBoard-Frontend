import { BlogPostModel } from '../../../models/BlogPosts/BlogPostModel';
import PostItem from './PostItem';

interface Props {
  posts: BlogPostModel[];
}

const PostsGrid = ({ posts }: Props) => {
  return (
    <section className={'relative  mb-10 mt-16 border-t-2 border-[color:var(--color-accent)] pt-7'}>
      <h1
        className={
          'allPostsTitle top absolute left-[50%] min-w-[140px] translate-x-[-50%]  translate-y-[-135%] transform bg-primary px-3 text-center text-[25px] lg:translate-y-[-125%] lg:text-[30px]'
        }
      >
        All posts
      </h1>
      <ul
        className={
          'row-auto grid list-none auto-rows-[1fr]  grid-cols-[repeat(auto-fit,minmax(200px,1fr))]  content-center  justify-items-center gap-16 lg:grid-cols-[repeat(auto-fit,minmax(min(100%/3,max(210px,100%/4)),1fr))]'
        }
      >
        {posts.map((post) => (
          <PostItem key={post.slug} post={post} />
        ))}
      </ul>
    </section>
  );
};

export default PostsGrid;
