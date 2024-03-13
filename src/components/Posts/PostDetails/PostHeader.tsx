import React from 'react';
import { MdTimer } from 'react-icons/md';
import { VscCalendar } from 'react-icons/vsc';
import Image from 'next/image';

// import classes from './PostHeader.module.scss';
// import { useAppSelector } from '../../../store/hooks';
// import { formattedDateFullDetailsCustom } from '../../../lib/FormatDisplayElements';

interface Props {
  title: string;
  image: string;
  date?: string;
  postReadTime?: number;
}
// TODO: Change font
// TODO: Change text color
// TODO: Change blog date color

const PostHeader = ({ title, image, postReadTime = 1, date }: Props) => {
  // const { userSettings } = useAppSelector((state) => state.userData);
  // const formattedDate = formattedDateFullDetailsCustom(
  //   new Date(date).toString(),
  //   userSettings.dateFormat,
  //   'numeric',
  //   'long',
  //   'numeric'
  // );

  return (
    <header
      className={
        'header font-blog relative flex flex-col-reverse items-center justify-between gap-4 border-b-8 border-[color:var(--color-accent)] pb-10 lg:flex-row  lg:items-end'
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
        {/* <Image src={image} alt={title} width={1000} height={750} layout="fill" objectFit="cover" objectFit="contain" /> */}
      </div>
    </header>
  );
};

export default PostHeader;
