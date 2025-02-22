import { EditMyProfile } from '@/models/Profiles/EditProfileModel';
import { CheckLoggedInUserResponseModel } from '@/models/Users/CheckLoggedInUserResponseModel';
import CheckUniqueEmailModel from '@/models/Users/CheckUniqueEmailModel';
import ForgotPasswordBodyModel from '@/models/Users/ForgotPasswordModel';
import LoginUserModel from '@/models/Users/LoginUserModel';
import { RegisterUserModel } from '@/models/Users/RegisterUserModel';
import ResetPasswordModel from '@/models/Users/ResetPasswordBodyModel';
import { UserAuthResponse } from '@/models/Users/UserAuthResponse';
import constants from '@/utils/constants';
import itJobsBoardApi from './indexITJobsBoardApi';

const authenticationApi = itJobsBoardApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    registerUser: builder.mutation<UserAuthResponse, RegisterUserModel>({
      query: (newUser: RegisterUserModel) => ({
        url: 'signup',
        method: 'POST',
        body: newUser,
      }),

      invalidatesTags: [constants.USER_PROFILE_TAG],
    }),
    loginUser: builder.mutation<UserAuthResponse, LoginUserModel>({
      query: (loginUser: LoginUserModel) => ({
        url: 'login',
        method: 'POST',
        body: loginUser,
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
    checkLoggedUser: builder.query<CheckLoggedInUserResponseModel, void>({
      query: () => ({
        url: 'users/currentUser',
        responseHandler: (response) => {
          return response.json();
        },
      }),
      providesTags: [constants.USER_PROFILE_TAG],
    }),

    logoutCurrentUser: builder.mutation({
      query: () => ({
        url: 'users/logout',
        method: 'POST',
      }),
      invalidatesTags: [constants.USER_PROFILE_TAG],
    }),

    updateMyProfile: builder.mutation<{ status: string; message: string }, EditMyProfile>({
      query: (userProfileData: EditMyProfile) => ({
        url: 'profiles/updateMe',
        method: 'PATCH',
        body: userProfileData,
      }),
      invalidatesTags: [constants.USER_PROFILE_TAG],
    }),

    googleAuthHandler: builder.query<CheckLoggedInUserResponseModel, void>({
      query: () => ({
        url: 'google',
        method: 'GET',
        mode: 'no-cors',
        credentials: 'same-origin',
      }),
    }),

    confirmEmail: builder.mutation<void, void>({
      query: () => ({
        url: 'profiles/confirmEmail',
        method: 'POST',
      }),
      invalidatesTags: [constants.USER_PROFILE_TAG],
    }),

    validateEmail: builder.mutation<void, string>({
      query: (validationToken) => ({
        url: `profiles/validateEmail/${validationToken}`,
        method: 'POST',
      }),
      invalidatesTags: [constants.USER_PROFILE_TAG],
    }),

    forgotPassword: builder.mutation<void, ForgotPasswordBodyModel>({
      query: (data: ForgotPasswordBodyModel) => ({
        url: '/forgotPassword',
        method: 'POST',
        body: data,
      }),
    }),
    resetEmailPassword: builder.mutation<void, ResetPasswordModel>({
      query: (passwordResetData: ResetPasswordModel) => ({
        url: `/resetPassword/${passwordResetData.resetPassToken}`,
        method: 'PATCH',
        body: passwordResetData.body,
      }),
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useCheckUniqueEmailMutation,
  useLoginUserMutation,
  useLogoutCurrentUserMutation,
  useCheckLoggedUserQuery,
  useLazyGoogleAuthHandlerQuery,
  useConfirmEmailMutation,
  useValidateEmailMutation,
  useForgotPasswordMutation,
  useResetEmailPasswordMutation,
  useUpdateMyProfileMutation,
} = authenticationApi;
