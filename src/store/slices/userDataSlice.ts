import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { loggedInUserInitialStateEmpty, UserEntity } from '@/models/Users/UserEntity';
import type { RootState } from '../index';
import constants from '../../utils/constants';
import { saveThemeLS, loadThemeLS } from '../localStorage/appTheme';

// import { changeBodyTheme } from '../../utils/helpers';
// import { addCookie, removeScriptById, searchCookie } from '../cookies/cookiesStorage';

interface UserDataState {
  theme: string;
  loggedInUser: UserEntity;
  isUserLogged: boolean;
  isUserAdmin: boolean;
  // userSettings: UserSettingsModel;
  // userBeginnerRaces: Partial<NormalRaceModel>[];
  // currentUserBeginnerRace?: Partial<NormalRaceModel>;
  // userSpeedImprovementRaces: Partial<NormalRaceModel>[];
  // currentUserSpeedRace?: Partial<NormalRaceModel>;
  // userBeginnerBestRacesStats: UserRaceResponseModel[];
  // userSpeedImprovementBestRacesStats: UserRaceResponseModel[];
  photoImageChangedTime?: number;
}

const initialState: UserDataState = {
  theme: loadThemeLS() || constants.THEME_DEFAULT,
  loggedInUser: loggedInUserInitialStateEmpty,
  isUserLogged: false,
  isUserAdmin: false,
  // userGeneralStats: userGeneralStatsInitialStateEmpty,
  // userImproveStats: userImproveStatsInitialStateEmpty,
  // userSettings: loggedInUserSettingsStateEmpty,
  // userBeginnerRaces: [],
  // currentUserBeginnerRace: undefined,
  // userSpeedImprovementRaces: [],
  // currentUserSpeedRace: undefined,
  // userBeginnerBestRacesStats: [],
  // userSpeedImprovementBestRacesStats: [],
  photoImageChangedTime: Date.now(),
};

const userDataSlice = createSlice({
  name: 'userData',
  initialState,
  reducers: {
    // * Use the PayloadAction type to declare the contents of `action.payload`
    changeTheme(state, action: PayloadAction<string>) {
      state.theme = action.payload;
      saveThemeLS(action.payload);
    },

    saveLoggedInUser(state, action: PayloadAction<UserEntity>) {
      state.loggedInUser.id = action.payload.id;
      state.loggedInUser.email = action.payload.email;
      state.loggedInUser.emailValidated = action.payload.emailValidated;
      state.loggedInUser.firstName = action.payload.firstName;
      state.loggedInUser.lastName = action.payload.lastName;
      state.loggedInUser.profileImage = action.payload.profileImage;
      state.loggedInUser.country = action.payload.country;
      state.loggedInUser.location = action.payload.location;
      state.loggedInUser.nationality = action.payload.nationality;
      state.loggedInUser.CV = action.payload.CV;
      state.loggedInUser.linkedin = action.payload.linkedin;
      state.loggedInUser.github = action.payload.github;
      state.loggedInUser.twitter = action.payload.twitter;
      state.loggedInUser.bio = action.payload.bio;
      state.loggedInUser.phoneNumber = action.payload.phoneNumber;
      state.loggedInUser.website = action.payload.website;
      state.loggedInUser.roles = action.payload.roles;
      state.loggedInUser.languages = action.payload.languages;
      state.loggedInUser.preferredMinHourRate = action.payload.preferredMinHourRate;
      state.loggedInUser.employments = action.payload.employments;
      state.loggedInUser.educations = action.payload.educations;
      state.loggedInUser.sideProjects = action.payload.sideProjects;
      state.loggedInUser.tags = action.payload.tags;
      state.loggedInUser.desiredRole = action.payload.desiredRole;
      state.isUserLogged = true;
      state.isUserAdmin = action.payload.roles.includes(constants.USER_ROLE_ADMIN);
    },

    setUserLoggedInStatus(state, action: PayloadAction<boolean>) {
      state.isUserLogged = action.payload;

      if (action.payload === false) {
        state.isUserAdmin = false;
        state.loggedInUser = loggedInUserInitialStateEmpty;
      }
    },

    setPhotoImageChangedTime(state, action: PayloadAction<number>) {
      state.photoImageChangedTime = action.payload;
    },
    setUserIsLoggedOut(state, _action: PayloadAction<void>) {
      state.isUserLogged = false;
      state.isUserAdmin = false;
      state.loggedInUser = loggedInUserInitialStateEmpty;
    },
  },
});

export const userDataActions = userDataSlice.actions;

// * Other code such as selectors can use the imported `RootState` type
export const selectTheme = (state: RootState) => state.userData.theme;

export default userDataSlice.reducer;
