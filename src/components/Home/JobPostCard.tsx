import { JobPostOverviewEntity } from '@/models/JobPosts/JobPostOverviewEntity';
import { TagListName } from '@/models/Tags/TagList.type';
import Color from 'color';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect } from 'react';
import TagLabel from '../common/UI/TagLabel';

interface Props {
  className?: string;
  jobPost: JobPostOverviewEntity;
}

const JobPostCard = ({ jobPost }: Props) => {
  const { title, company, color, location, minSalary, maxSalary, tags, isHighlighted } = jobPost;

  const [techTags, setTechTags] = React.useState<any[]>([]);

  useEffect(() => {
    const tagsList = tags?.filter((tag) => tag.type === TagListName.TECH_SKILL) || [];
    setTechTags(tagsList);
  }, [tags]);

  const backgroundColor = Color(color);
  const linkPath = `/jobs/${jobPost.slug}`;

  const photoImageAmzLink = `${process.env.NEXT_PUBLIC_AWS_STORAGE_PATH_URL}/${company.logoImage}?${Date.now()}`;
  const imageSrcUserPhoto = company.logoImage ? photoImageAmzLink : '/images/logos/logo1.png';

  const shortLocation = location?.split(',')[0];

  let colorTextCard: string | undefined;

  if (isHighlighted) {
    if (backgroundColor.isDark()) {
      colorTextCard = 'var(--color-grey-light-2)';
    } else {
      colorTextCard = 'var(--color-grey-dark-3)';
    }
  }
  const tagsList = techTags?.slice(0, 5).map((tag) => <TagLabel key={tag.id} name={tag.name} color={colorTextCard} />);
  return (
    <li
      style={{
        backgroundColor: isHighlighted ? color : 'var(--bg-color-secondary)',
        color: colorTextCard,
      }}
      className={`postContainer mb-4 w-full rounded-xl  shadow-[0px_10px_15px_5px_rgba(0,0,0,0.25),0px_3px_10px_0px_rgba(0,0,0,0.25)] transition-all duration-200 ease-in-out hover:translate-y-[-0.5px] hover:scale-105  hover:shadow-[0px_10px_15px_5px_rgba(0,0,0,0.35),0px_3px_10px_0px_rgba(0,0,0,0.35)]`}
    >
      <Link href={linkPath} className={' flex h-full w-full items-center hover:brightness-110 '}>
        <div
          className={'relative ml-2 flex justify-start overflow-hidden border-0 border-[var(--color-button-primary)]'}
        >
          <div className={'w-[80px] min-w-10'}>
            <Image
              className={' h-[80px] w-[80px]  bg-slate-50'}
              src={imageSrcUserPhoto}
              alt={'No Company profile photo'}
              width={200}
              height={200}
              unoptimized={true}
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

export default JobPostCard;
