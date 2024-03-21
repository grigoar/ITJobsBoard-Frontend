/* eslint-disable import/prefer-default-export */

import { loadThemeLS, saveThemeLS } from '@/store/localStorage/appTheme';
import { toast } from 'react-toastify';
// import { GetServerSidePropsContext, PreviewData } from 'next';
// import { ParsedUrlQuery } from 'querystring';

export const changeBodyTheme = (newTheme: string) => {
  document.body.className = `${newTheme.toLowerCase()}`;
  saveThemeLS(newTheme.toLowerCase());
};

export const toastifyError = (message: string) => {
  const theme = loadThemeLS();
  toast(message, {
    type: 'error',
    position: 'top-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme,
  });
};

export const toastifySuccess = (message: string) => {
  const theme = loadThemeLS();
  toast(message, {
    type: 'success',
    position: 'top-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme,
  });
};
