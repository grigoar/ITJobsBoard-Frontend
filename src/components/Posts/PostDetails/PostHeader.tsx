import Image from 'next/image';
import { MdTimer } from 'react-icons/md';
import { VscCalendar } from 'react-icons/vsc';

interface Props {
  title: string;
  image: string;
  date?: string;
  postReadTime?: number;
}

const PostHeader = ({ title, image, postReadTime = 1, date }: Props) => {
  return (
    <header
      className={
        'header relative flex flex-col-reverse items-center justify-between gap-4 border-b-8 border-[color:var(--color-accent)] pb-10 font-blog lg:flex-row  lg:items-end'
      }
    >
      <h1
        className=" m-0 mb-8 h-full self-center text-left text-3xl font-bold leading-[3rem] text-[var(--color-blog-title)]
      "
      >
        {title}
      </h1>
      <div className={'headerDetailsContainer'}>
        <div className={'readTime absolute bottom-0 left-0 flex items-center text-[color:var(--color-blogs-date)]'}>
          <MdTimer className={'timerIcon '} />
          <span className="ml-1">{postReadTime} min read</span>
        </div>
        <div className={'postDate absolute bottom-0 right-0 flex items-center '}>
          <VscCalendar className={'datePostIcon text-[color:var(--color-blogs-date)]'} />
          <time className="ml-2">{date}</time>
        </div>
      </div>
      <div
        className={
          'imageContainer flex h-fit max-h-[200px] w-fit max-w-[300px] justify-end  overflow-hidden rounded-md lg:mb-2'
        }
      >
        <Image src={image} alt={title} width={1000} height={750} className="object-cover" />
      </div>
    </header>
  );
};

export default PostHeader;
