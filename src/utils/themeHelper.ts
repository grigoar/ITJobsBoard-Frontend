// eslint-disable-next-line import/prefer-default-export
export const changeRootTheme = (oldTheme: string, newTheme: string) => {
  const root = window.document.documentElement;
  root.classList.remove(oldTheme);
  root.classList.add(newTheme);

  localStorage.setItem('theme', newTheme);
};
