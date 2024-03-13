import constants from '../../utils/constants';

export const saveThemeLS = (userTheme: string) => {
  try {
    const flagsTMLS = localStorage.getItem(constants.LOCAL_STORAGE_TM_OBJECT_FLAGS);

    const flagsTM = JSON.parse(flagsTMLS || '{}');
    flagsTM.theme = userTheme;

    localStorage.setItem(constants.LOCAL_STORAGE_TM_OBJECT_FLAGS, JSON.stringify(flagsTM));
  } catch {
    // ignore errors
  }
};
export const loadThemeLS = () => {
  try {
    const flagsTMLS = localStorage.getItem(constants.LOCAL_STORAGE_TM_OBJECT_FLAGS);

    const flagsTM = JSON.parse(flagsTMLS || '{}');
    const { theme } = flagsTM;
    if (theme == null) {
      return constants.THEME_DEFAULT;
    }
    return theme;
  } catch (err) {
    return constants.THEME_DEFAULT;
  }
};

export const getBrowserLanguage = () => {
  try {
    const { language } = navigator;
    if (language === null) {
      return constants.LANGUAGE_BROWSER_DEFAULT;
    }
    return language;
  } catch (err) {
    return constants.LANGUAGE_BROWSER_DEFAULT;
  }
};
