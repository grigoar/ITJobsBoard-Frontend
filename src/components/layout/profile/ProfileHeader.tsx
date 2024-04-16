import React, { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useCheckLoggedUserQuery } from '@/api/authenticationApi';
import { useAppDispatch } from '@/store/hooks';
import { userDataActions } from '@/store/slices/userDataSlice';
import Button from '@/components/common/Button/Button';

const ProfileHeader = () => {
  const dispatch = useAppDispatch();
  const { data: checkUserStatusData } = useCheckLoggedUserQuery();
  // const { isUserLogged } = useAppSelector((state) => state.userData);
  // const { data: checkUserStatusData, isLoading } = useCheckLoggedUserQuery();
  // const { loggedInUser, isUserLogged, isUserAdmin } = useAppSelector((state) => state.userData);
  // const { activeTheme, setNewActiveTheme } = useChangeAppTheme(loggedInUser);

  // const router = useRouter();
  // const searchParams = useSearchParams();

  // console.log('loggedInUser', loggedInUser);
  // console.log('isUserAdmin', isUserAdmin);
  // console.log('isUserLogged', isUserLogged);
  // console.log('isLoading', isLoading);

  const pathName = usePathname();

  useEffect(() => {
    // throw new Error('This is a test error');
    if (checkUserStatusData?.user) {
      dispatch(userDataActions.saveLoggedInUser(checkUserStatusData?.user));
    } else {
      dispatch(userDataActions.setUserLoggedInStatus(false));
    }
  }, [checkUserStatusData, dispatch]);

  const homePageLinkClassActive = `${pathName === '/' ? 'activeTab' : 'inactiveTab'}`;
  const blogsPageLinkClassActive = `${pathName === '/posts' ? 'activeTab' : 'inactiveTab'}`;
  const aboutPageLinkClassActive = `${pathName === '/contact' ? 'activeTab' : 'inactiveTab'}`;

  return (
    <header className="relative mb-8 w-full font-semibold">
      <nav className="relative flex justify-center  gap-6 p-2">
        <div className="text-txtPrimary [&>a]:border-1 flex min-w-[150px] flex-grow justify-start gap-1 border-2 sm:gap-6">
          <Button style={`${homePageLinkClassActive} colorRed`} link="/">
            Overview
          </Button>
          <Button style={`${blogsPageLinkClassActive}`} link="/posts">
            Resume/CV
          </Button>
          <Button style={`${aboutPageLinkClassActive}`} link="/contact">
            Jobs
          </Button>
        </div>
      </nav>
      {/* <div>
        <div className="absolute left-4 flex items-center justify-start">
          <h1 className="text-[25px] text-[var(--text-color-calm-strong)]">
            <span className="bg-gradient-to-r from-[var(--text-color-primary)] to-[var(--color-accent-blog)] bg-clip-text text-[25px] font-extrabold leading-10  text-transparent ">
              {constants.SITE_NAME}
            </span>{' '}
            - <span className="text-[var(--text-color-calm-strong)]">{pageTitle}</span>
          </h1>
        </div>
      </div> */}
    </header>
  );
};

export default ProfileHeader;
