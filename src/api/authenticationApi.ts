import { RegisterUserModel } from '@/models/Users/RegisterUserModel';
import constants from '@/utils/constants';
import { UserAuthResponse } from '@/models/Users/UserAuthResponse';
import CheckUniqueEmailModel from '@/models/Users/CheckUniqueEmailModel';
import itJobsBoardApi from './indexITJobsBoardApi';

const testingApi = itJobsBoardApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    registerUser: builder.mutation<UserAuthResponse, RegisterUserModel>({
      query: (newUser: RegisterUserModel) => ({
        url: 'signup',
        method: 'POST',
        body: newUser,
      }),
      invalidatesTags: [constants.USER_PROFILE_TAG, constants.USER_SETTING_TAG],
    }),
    checkUniqueEmail: builder.mutation<{ status: string; message: string }, CheckUniqueEmailModel>({
      query: (checkEmail: CheckUniqueEmailModel) => ({
        url: `users/checkUniqueEmail`,
        method: 'POST',
        body: checkEmail,
      }),
    }),
  }),
});

export const { useRegisterUserMutation, useCheckUniqueEmailMutation } = testingApi;
