'use client';

import { useEffect, useState } from 'react';
import constants from '../utils/constants';
import { changeRootTheme } from '../utils/themeHelper';

export default function useThemeToggle() {
  const [theme, setTheme] = useState(constants.THEME_DEFAULT);
  const [initialRender, setInitialRender] = useState(true);

  const colorTheme = theme === constants.THEME_DARK ? constants.THEME_LIGHT : constants.THEME_DARK;

  useEffect(() => {
    const userLocalStorageTheme = localStorage.getItem(constants.LOCAL_STORAGE_THEME);
    if (userLocalStorageTheme) {
      setTheme(userLocalStorageTheme);
      changeRootTheme(userLocalStorageTheme, userLocalStorageTheme);
    }
    setInitialRender(false);
  }, []);

  useEffect(() => {
    if (initialRender) {
      return;
    }
    changeRootTheme(colorTheme, theme);
  }, [theme, colorTheme, initialRender]);

  const toggleThemeHandler = () => {
    let newTheme = theme;
    if (theme === constants.THEME_DARK) {
      newTheme = constants.THEME_LIGHT;
    } else if (theme === constants.THEME_LIGHT) {
      newTheme = constants.THEME_DARK;
    }
    setTheme(newTheme);
  };

  return { activeTheme: theme, toggleTheme: toggleThemeHandler };
}
