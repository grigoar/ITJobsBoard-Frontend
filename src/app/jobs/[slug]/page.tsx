import JobPostDetailsData from '@/components/JobPosts/JobPostDetails/JobPostDetailsData';

interface Props {
  params: {
    slug: string;
  };
}

const PostDetailPage = async ({ params }: Props) => {
  return (
    <>
      <JobPostDetailsData slug={params.slug} />
    </>
  );
};

export default PostDetailPage;
