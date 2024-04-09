import Link from 'next/link';
import React from 'react';
import Image from 'next/image';
import { JobPostOverviewEntity } from '@/models/JobPosts/GetJobPostsRes';
import Color from 'color';
import TagLabel from './TagLabel';

interface Props {
  // children: React.ReactNode;
  className?: string;
  // maxWidth?: number;
  jobPost: JobPostOverviewEntity;
}

const JobPostCard = ({ jobPost }: Props) => {
  // const { title, description, company, color, location, minSalary, maxSalary, tags } = jobPost;
  const { title, company, color, location, minSalary, maxSalary, tags, isHighlighted } = jobPost;

  console.log('tags', tags);
  if (isHighlighted) {
    console.log('color', color);
  }

  const backgroundColor = Color(color);
  // console.log('backgroundColor', backgroundColor.isDark());
  // console.log('backgroundColor', backgroundColor.isLight());

  const linkPath = `/jobs/${jobPost.id}`;
  const imageLogoCompany = '/images/logos/logo1.png';

  const shortLocation = location?.split(',')[0];

  let colorTextCard: string | undefined;

  if (isHighlighted) {
    if (backgroundColor.isDark()) {
      colorTextCard = 'var(--color-grey-light-2)';
    } else {
      colorTextCard = 'var(--color-grey-dark-3)';
    }
  }
  // return only the first 5 tags
  const tagsList = tags?.slice(0, 5).map((tag) => <TagLabel key={tag.id} name={tag.name} color={colorTextCard} />);
  // const tagsList = tags?.map((tag) => <TagLabel key={tag.id} name={tag.name} color={colorTextCard} />);

  // hover:scale-[1.01]
  // bg-secondary
  return (
    <li
      style={{
        backgroundColor: isHighlighted ? color : 'var(--bg-color-secondary)',
        color: colorTextCard,
      }}
      className={`postContainer mb-4 w-full rounded-xl  shadow-[0px_10px_15px_5px_rgba(0,0,0,0.25),0px_3px_10px_0px_rgba(0,0,0,0.25)] transition-all duration-200 ease-in-out hover:translate-y-[-0.5px]  hover:shadow-[0px_10px_15px_5px_rgba(0,0,0,0.35),0px_3px_10px_0px_rgba(0,0,0,0.35)]`}
    >
      <Link href={linkPath} className={' flex h-full w-full items-center hover:brightness-110 '}>
        <div
          className={
            'relative ml-2 flex h-full max-h-16  justify-start overflow-hidden border-0 border-[var(--color-button-primary)]'
          }
        >
          {/* <Image src={linkPath} alt={title} width={300} height={300} className="rounded-t-lg object-cover" />
           */}
          <div className={'h-[90%] w-16 min-w-10'}>
            <Image
              className={'rounded-[50%] bg-slate-50'}
              src={imageLogoCompany}
              alt={'No Company profile photo'}
              width={300}
              height={300}
              // object-cover
            />
          </div>
        </div>
        <div className="w-full">
          <h3
            className={
              'blogTitle align-start flex h-[50px] items-center justify-start px-4 text-left text-xl font-bold'
            }
          >
            {title}
          </h3>
          <div className="flex ">
            <div className={'content flex grow flex-col px-4 pb-4 pt-2'}>
              <div className="grow">{company?.name}</div>
              <div className={'blogCardHeaderContainer flex  flex-col justify-center'}>
                <div className="flex">
                  <div>
                    <TagLabel name={`$${minSalary}-${maxSalary}`} color={colorTextCard} />
                  </div>
                  <div>
                    <TagLabel name={shortLocation} color={colorTextCard} />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex max-w-[300px] flex-wrap items-center justify-center p-4 align-middle">{tagsList}</div>
          </div>
        </div>
      </Link>
    </li>
  );
};
//             <div className={'readTime flex items-center pb-1 pt-3'}>
//               <div className={'iconWrapper  flex h-full justify-center'}>
//                 <MdTimer className={'timerIcon text-[color:var(--color-blogs-date)]'} />
//               </div>
//               <span className="ml-2 text-sm">{5} min read</span>
//             </div>
//           </div>
//           <p className={'blogShortDescription  border-[color:var(--color-blogs-date)] pt-2'}>{description}</p>
//         </div>
//       </Link>
//     </li>
//   );
// };
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
