import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface InitialStateInterface {
  dropdownClosed: boolean;
}

const initialState: InitialStateInterface = {
  dropdownClosed: true,
};

const appGlobalSettingsSlice = createSlice({
  name: 'userSettings',
  initialState,
  reducers: {
    setDropdownClosed(state, action: PayloadAction<boolean>) {
      state.dropdownClosed = action.payload;
    },
  },
});

export const appGlobalSettingsActions = appGlobalSettingsSlice.actions;

export default appGlobalSettingsSlice.reducer;
