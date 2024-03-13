/* eslint-disable import/prefer-default-export */

import { saveThemeLS } from '@/store/localStorage/appTheme';

export const changeBodyTheme = (newTheme: string) => {
  document.body.className = `${newTheme.toLowerCase()}`;
  saveThemeLS(newTheme.toLowerCase());
};
