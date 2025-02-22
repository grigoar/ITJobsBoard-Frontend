import Image from 'next/image';
import Link from 'next/link';
import { MdTimer } from 'react-icons/md';
import { BlogPostModel } from '../../../models/BlogPosts/BlogPostModel';

interface Props {
  post: BlogPostModel;
}
const PostItem = ({ post }: Props) => {
  const { title, image, excerpt, slug, readTime } = post;
  const linkPath = `/posts/${post.slug}`;
  const imagePath = `/images/posts/${slug}/${image}`;

  return (
    <li
      className={
        'postContainer max-w-[250px] rounded-xl bg-secondary shadow-[0px_10px_15px_5px_rgba(0,0,0,0.25),0px_3px_10px_0px_rgba(0,0,0,0.25)] transition-all duration-200 ease-in-out hover:scale-[1.05]'
      }
    >
      <Link
        href={linkPath}
        className={
          'itemLink inline-block h-full w-full hover:text-[var(--text-color-calm-strong)] hover:brightness-110'
        }
      >
        <div className={'relative flex max-h-16 w-full justify-end overflow-hidden'}>
          <Image src={imagePath} alt={title} width={300} height={300} className="rounded-t-lg object-cover" />
        </div>
        <div className={'content flex flex-col px-4 pb-4 pt-4'}>
          <div className={'blogCardHeaderContainer flex flex-col justify-center'}>
            <h3
              className={
                'blogTitle flex h-[50px] items-center justify-center text-center align-middle text-xl text-[var(--color-accent-blog)] '
              }
            >
              {title}
            </h3>
            <div className={'readTime flex items-center pb-1 pt-3'}>
              <div className={'iconWrapper  flex h-full justify-center'}>
                <MdTimer className={'timerIcon text-[color:var(--color-blogs-date)]'} />
              </div>
              <span className="ml-2 text-sm">{readTime} min read</span>
            </div>
          </div>
          <p className={'blogShortDescription border-t-[1px] border-[color:var(--color-blogs-date)] pt-2'}>{excerpt}</p>
        </div>
      </Link>
    </li>
  );
};

export default PostItem;
