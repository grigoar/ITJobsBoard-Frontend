import React, { useEffect } from 'react';
import Switch from 'react-switch';
import { usePathname, useRouter } from 'next/navigation';
import useThemeToggle from '@/hooks/useDarkTheme';
import constants from '@/utils/constants';
import LightThemeImage from '@/components/common/SVGs/themes/LightThemeImage';
import DarkThemeImage from '@/components/common/SVGs/themes/DarkThemeImage';
import { useCheckLoggedUserQuery, useLogoutCurrentUserMutation } from '@/api/authenticationApi';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { userDataActions } from '@/store/slices/userDataSlice';
import Button from '@/components/common/Button/Button';
import { changeBodyTheme, toastifySuccess } from '@/utils/helpers';

const Header = () => {
  const dispatch = useAppDispatch();
  const [logoutUser] = useLogoutCurrentUserMutation();
  const { data: checkUserStatusData } = useCheckLoggedUserQuery();
  const { isUserLogged } = useAppSelector((state) => state.userData);
  // const { data: checkUserStatusData, isLoading } = useCheckLoggedUserQuery();
  // const { loggedInUser, isUserLogged, isUserAdmin } = useAppSelector((state) => state.userData);
  // const { activeTheme, setNewActiveTheme } = useChangeAppTheme(loggedInUser);

  const router = useRouter();
  // const searchParams = useSearchParams();

  // console.log('loggedInUser', loggedInUser);
  // console.log('isUserAdmin', isUserAdmin);
  // console.log('isUserLogged', isUserLogged);
  // console.log('isLoading', isLoading);

  const pathName = usePathname();
  const { activeTheme, toggleTheme } = useThemeToggle();
  const isDark = activeTheme === constants.THEME_DARK;

  useEffect(() => {
    // throw new Error('This is a test error');
    if (checkUserStatusData?.user) {
      dispatch(userDataActions.saveLoggedInUser(checkUserStatusData?.user));
    } else {
      dispatch(userDataActions.setUserLoggedInStatus(false));
    }
  }, [checkUserStatusData, dispatch]);

  const changeThemeHandler = () => {
    let newTheme;
    if (activeTheme === constants.THEME_DARK) {
      newTheme = constants.THEME_LIGHT;
    } else if (activeTheme === constants.THEME_LIGHT) {
      newTheme = constants.THEME_DARK;
    }

    // setNewActiveTheme(newTheme || constants.THEME_DARK);
    changeBodyTheme(newTheme || constants.THEME_DARK);
    toggleTheme();
    // setNewActiveTheme(newTheme || constants.THEME_DARK);
    // changeBodyTheme(newTheme || constants.THEME_DARK);
  };
  // console.log('pathName', pathName);
  // console.log('searchParams', searchParams);

  const logoutHandler = async () => {
    await logoutUser(null);

    dispatch(userDataActions.setUserLoggedInStatus(false));
    // dispatch(raceStateActions.setIsNewTextNeeded(true));
    // dispatch(raceStateActions.setIsNewTypingText(true));
    // dispatch(appGlobalSettingsActions.setActiveNotification(NotificationLoggedOutSuccessfully));
    toastifySuccess('Logged out successfully!');
    // setIsDropdownOpen(false);
    // if (router.asPath !== '/' && !router.asPath.includes('posts') && !router.asPath.includes('go-pro')) {
    // if (pathName && !searchParams?.get().includes('posts') && !searchParams?.get("/").includes('go-pro'){
    if (pathName !== '/' && !pathName?.includes('posts') && !pathName?.includes('go-pro')) {
      router.replace('/');
    }
    // closeNavMobileHandler();
  };

  const homePageLinkClassActive = `${pathName === '/' ? 'activeTab' : 'inactiveTab'}`;
  const blogsPageLinkClassActive = `${pathName === '/posts' ? 'activeTab' : 'inactiveTab'}`;
  const aboutPageLinkClassActive = `${pathName === '/contact' ? 'activeTab' : 'inactiveTab'}`;
  const loginLinkClassActive = `${pathName === '/login' ? 'activeTab' : 'inactiveTab'}`;
  const registerLinkClassActive = `${pathName === '/register' ? 'activeTab' : 'inactiveTab'}`;

  let pageTitle = '';
  if (pathName === '/') {
    pageTitle = 'Home';
  } else if (pathName === '/posts') {
    pageTitle = 'Posts';
  } else if (pathName === '/contact') {
    pageTitle = 'Contact';
  } else if (pathName === '/disclaimer') {
    pageTitle = 'Disclaimer';
  } else if (pathName === '/login') {
    pageTitle = 'Log In';
  } else if (pathName === '/register') {
    pageTitle = 'Register';
  } else if (pathName === '/add-job') {
    pageTitle = 'Add a New Job Post';
  } else if (pathName === '/profile') {
    pageTitle = 'Profile';
  } else if (pathName?.includes('/email/confirm')) {
    pageTitle = 'Confirm Email';
  } else if (pathName?.includes('/reset-password')) {
    pageTitle = 'Reset Password';
  } else if (pathName?.includes('/forgot-password')) {
    pageTitle = 'Forgot Password';
  } else if (pathName === '/404') {
    pageTitle = '404';
  } else {
    // pageTitle = 'Page Not Found';
    pageTitle = '';
  }

  return (
    <header className="relative mb-8 bg-secondary font-semibold">
      <nav className="relative flex justify-center  gap-6 p-2">
        <div className="text-txtPrimary flex min-w-[150px] flex-grow justify-start gap-1 sm:gap-6">
          <Button style={`${homePageLinkClassActive} colorRed`} link="/">
            Home
          </Button>
          <Button style={`${blogsPageLinkClassActive}`} link="/posts">
            Blog
          </Button>
          <Button style={`${aboutPageLinkClassActive}`} link="/contact">
            Contact
          </Button>
        </div>
        <div className="flex min-w-[150px] items-center justify-end gap-1 sm:gap-6 ">
          {!isUserLogged && (
            <div>
              <Button style={`${loginLinkClassActive}`} link="/login">
                Log In
              </Button>
              <Button style={`${registerLinkClassActive}`} link="/register">
                Register
              </Button>
            </div>
          )}
          {isUserLogged && (
            <div>
              <Button style={`${loginLinkClassActive} `} link="/profile">
                Profile
              </Button>
              <Button style={`${loginLinkClassActive}`} action={logoutHandler}>
                Log Out
              </Button>
            </div>
          )}
        </div>
        <div className="absolute bottom-0 right-0 mt-4 flex translate-y-[125%] items-center justify-center">
          {!pathName?.includes('/jobs/') && (
            <Button style={`btn btn-ghost !mt-0 mr-2`} link={`${isUserLogged ? '/add-job' : '/login?add-job=true'}`}>
              Post a Job
            </Button>
          )}
          <Switch
            onChange={changeThemeHandler}
            checked={!isDark}
            className={'mr-4 flex items-center justify-center text-[#85ceff]'}
            width={65}
            height={30}
            onColor="#85ceff"
            offColor="#177cbe"
            offHandleColor="#541600"
            onHandleColor="#ffff33"
            uncheckedIcon={<LightThemeImage />}
            checkedIcon={<DarkThemeImage />}
            title="Toggle theme switch"
          />
        </div>
      </nav>
      <div>
        <div className="absolute left-4 flex items-center justify-start">
          <h1 className="text-[25px] text-[var(--text-color-calm-strong)]">
            <span className="bg-gradient-to-r from-[var(--text-color-primary)] to-[var(--color-accent-blog)] bg-clip-text text-[25px] font-extrabold leading-10  text-transparent ">
              {constants.SITE_NAME}
            </span>{' '}
            - <span className="text-[var(--text-color-calm-strong)]">{pageTitle}</span>
          </h1>
        </div>
      </div>
    </header>
  );
};

export default Header;
