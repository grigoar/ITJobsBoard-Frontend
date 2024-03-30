import { JobPostEntity } from '@/models/JobPosts/JobPostEntity';
import Link from 'next/link';
import React from 'react';
import { MdTimer } from 'react-icons/md';
import Image from 'next/image';

interface Props {
  // children: React.ReactNode;
  className?: string;
  // maxWidth?: number;
  jobPost: JobPostEntity;
}

const JobPostCard = ({ jobPost }: Props) => {
  const { title, description } = jobPost;

  const linkPath = `/jobs/${jobPost.id}`;
  const imageLogoCompany = '/images/logos/logo1.png';
  return (
    <li
      className={
        'postContainer mb-4 w-full rounded-xl bg-secondary shadow-[0px_10px_15px_5px_rgba(0,0,0,0.25),0px_3px_10px_0px_rgba(0,0,0,0.25)] transition-all duration-200 ease-in-out hover:scale-[1.05]'
      }
    >
      <Link
        href={linkPath}
        className={
          'itemLink  flex h-full w-full items-center hover:text-[var(--text-color-calm-strong)] hover:brightness-110'
        }
      >
        <div
          className={
            'relative ml-2 flex max-h-16 justify-start overflow-hidden rounded-full border-2 border-[var(--color-button-primary)]'
          }
        >
          {/* <Image src={linkPath} alt={title} width={300} height={300} className="rounded-t-lg object-cover" />
           */}
          <div className={'h-[90%] w-16'}>
            <Image
              className={'rounded-[50%]'}
              src={imageLogoCompany}
              alt={'No Company profile photo'}
              width={300}
              height={300}
              // object-cover
            />
          </div>
        </div>
        <div className={'content flex flex-row px-4 pb-4 pt-4'}>
          <div className={'blogCardHeaderContainer flex flex-row justify-center'}>
            <h3
              className={
                'blogTitle flex h-[50px] items-center justify-center text-center align-middle text-xl text-[var(--color-accent-blog)] '
              }
            >
              {title}
            </h3>
            {/* <time>
                {formattedDateFullDetailsCustom(
                  new Date(date).toString(),
                  userSettings.dateFormat,
                  'numeric',
                  'long',
                  'numeric'
                  )}
                </time> */}
            <div className={'readTime flex items-center pb-1 pt-3'}>
              <div className={'iconWrapper  flex h-full justify-center'}>
                <MdTimer className={'timerIcon text-[color:var(--color-blogs-date)]'} />
              </div>
              <span className="ml-2 text-sm">{5} min read</span>
            </div>
          </div>
          <p className={'blogShortDescription  border-[color:var(--color-blogs-date)] pt-2'}>{description}</p>
        </div>
      </Link>
    </li>
  );
};
// <li className={` m-auto  my-12 h-auto  rounded-3xl bg-secondary p-8 ${className != null ? className : ''}`}>
//   {/* {props.children} */}
//   <h2>{jobPost.title}</h2>
//   <p>{jobPost.description}</p>
// </li>

export default JobPostCard;

// .avatarImageContainer {
//   position: relative;
//   width: 4.41rem;
//   height: 90%;
//   transition: all 0.1s ease;
// }
// .avatarImage {
//   border-radius: 50%;
//   border: 1px solid var(--color-button-primary) !important;
//   &:hover {
//     border: 1px solid var(--color-secondary-light) !important;
//   }
// }
