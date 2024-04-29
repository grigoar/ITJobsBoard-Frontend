import { useCheckLoggedUserQuery } from '@/api/authenticationApi';
import Button from '@/components/common/Button/Button';
import { useAppDispatch } from '@/store/hooks';
import { userDataActions } from '@/store/slices/userDataSlice';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

const ProfileHeader = () => {
  const dispatch = useAppDispatch();
  const { data: checkUserStatusData } = useCheckLoggedUserQuery();

  const pathName = usePathname();

  useEffect(() => {
    if (checkUserStatusData?.user) {
      dispatch(userDataActions.saveLoggedInUser(checkUserStatusData?.user));
    } else {
      dispatch(userDataActions.setUserLoggedInStatus(false));
    }
  }, [checkUserStatusData, dispatch]);

  const profileOverviewPageLinkClassActive = `${pathName === '/profile' ? 'nestedActiveTab' : 'inactiveTab'}`;
  const profileEditLinkClassActive = `${pathName === '/profile/edit' ? 'nestedActiveTab' : 'inactiveTab'}`;
  const profileResumePageLinkClassActive = `${pathName === '/profile/resume' ? 'nestedActiveTab' : 'inactiveTab'}`;
  const profileMyJobsPageLinkClassActive = `${pathName === '/profile/my-jobs' ? 'nestedActiveTab' : 'inactiveTab'}`;
  const profileSavedJobsPageLinkClassActive = `${pathName === '/profile/saved-jobs' ? 'nestedActiveTab' : 'inactiveTab'}`;

  return (
    <header className="relative  w-full font-semibold">
      <nav className="relative flex justify-center  gap-6 pt-2">
        <div className="text-txtPrimary [&>a]:border-1 flex min-w-[150px] flex-grow justify-start gap-1 sm:gap-6">
          <Button style={`${profileOverviewPageLinkClassActive} colorRed relative`} link="/profile">
            Overview
          </Button>
          <Button style={`${profileEditLinkClassActive} colorRed`} link="/profile/edit">
            Edit
          </Button>
          <Button style={`${profileResumePageLinkClassActive}`} link="/profile/resume">
            CV
          </Button>
          <Button style={`${profileMyJobsPageLinkClassActive}`} link="/profile/my-jobs">
            My Jobs
          </Button>
          <Button style={`${profileSavedJobsPageLinkClassActive}`} link="/profile/saved-jobs">
            Saved Jobs
          </Button>
        </div>
      </nav>
    </header>
  );
};

export default ProfileHeader;
