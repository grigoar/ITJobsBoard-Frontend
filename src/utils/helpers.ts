/* eslint-disable import/prefer-default-export */

import { saveThemeLS } from '@/store/localStorage/appTheme';
// import { GetServerSidePropsContext, PreviewData } from 'next';
// import { ParsedUrlQuery } from 'querystring';
import * as jwtDecode from 'jwt-decode';
import { cookies } from 'next/headers';
import constants from './constants';

interface UserJWTTokenInterface {
  user?: {
    id: string;
    email: string;
    roles: string[];
  };
  iat: number;
  exp: number;
}

export const changeBodyTheme = (newTheme: string) => {
  document.body.className = `${newTheme.toLowerCase()}`;
  saveThemeLS(newTheme.toLowerCase());
};

export const decodeJWTToken = (token?: string) => {
  if (!token || token === constants.COOKIE_AUTH_NAME_EXPIRED) {
    return;
  }
  const decodedToken = jwtDecode.jwtDecode<UserJWTTokenInterface>(token);

  if (Date.now() / 1000 > decodedToken.exp) {
    return;
  }

  return decodedToken;
};

export const checkUserIsLoggedIn = async () =>
  // context: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>
  {
    // const token = context.req.cookies.jwt;
    const token = cookies().get(constants.COOKIE_AUTH_NAME)?.value ?? '';

    if (!token || token === constants.COOKIE_AUTH_NAME_EXPIRED) {
      return false;
    }
    const userToken = decodeJWTToken(token)?.user;

    if (userToken && userToken.roles.includes(constants.USER_ROLE_USER)) {
      return true;
    }
    return false;
  };
