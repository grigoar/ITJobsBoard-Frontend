import React from 'react';
import Switch from 'react-switch';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import useThemeToggle from '@/hooks/useDarkTheme';
import constants from '@/utils/constants';
import LightThemeImage from '@/components/common/SVGs/themes/LightThemeImage';
import DarkThemeImage from '@/components/common/SVGs/themes/DarkThemeImage';

const Header = () => {
  const pathName = usePathname();
  const { activeTheme, toggleTheme } = useThemeToggle();
  const isDark = activeTheme === constants.THEME_DARK;

  const changeThemeHandler = () => {
    toggleTheme();
  };

  const homePageLinkClassActive = `${pathName === '/' ? 'activeTab' : 'inactiveTab'}`;
  const blogsPageLinkClassActive = `${pathName === '/posts' ? 'activeTab' : 'inactiveTab'}`;
  const aboutPageLinkClassActive = `${pathName === '/contact' ? 'activeTab' : 'inactiveTab'}`;
  const loginLinkClassActive = `${pathName === '/login' ? 'activeTab' : 'inactiveTab'}`;

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
    pageTitle = 'Login';
  } else if (pathName === '/404') {
    pageTitle = '404';
  } else {
    pageTitle = 'Page Not Found';
  }

  return (
    <header className="relative mb-8 bg-secondary font-semibold">
      <div className="flex justify-center gap-6  p-2 ">
        <div className="text-txtPrimary flex min-w-[150px] flex-grow justify-start gap-1 sm:gap-6">
          <Link className={`${homePageLinkClassActive}`} href="/">
            Home
          </Link>
          <Link className={`${blogsPageLinkClassActive}`} href="/posts">
            Blog
          </Link>
          <Link className={`${aboutPageLinkClassActive}`} href="/contact">
            Contact
          </Link>
          <Link className={`${loginLinkClassActive}`} href="/login">
            Login
          </Link>
        </div>
        <div className="flex items-center justify-center">
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
      </div>
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
