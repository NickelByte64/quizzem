import { useCallback, useState } from "react";

export enum Theme {
  CUPCAKE = "cupcake",
  DRACULA = "dracula",
}

// TODO Use a more robust way to handle themes with a context provider.
export function useTheme() {
  const htmlEl = document.querySelector("html");
  const [theme, setTheme] = useState<Theme>(
    () =>
      (localStorage.getItem(LOCAL_STORAGE_THEME_NAME) as Theme) ?? Theme.CUPCAKE
  );

  const setThemeInitial = useCallback(() => {
    if (!htmlEl) return;
    htmlEl.removeAttribute(DATA_THEME_NAME);
    htmlEl.setAttribute(DATA_THEME_NAME, theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    if (!htmlEl) return;
    const newTheme = theme === Theme.CUPCAKE ? Theme.DRACULA : Theme.CUPCAKE;
    setTheme(newTheme);
    localStorage.setItem(LOCAL_STORAGE_THEME_NAME, newTheme);
    htmlEl.removeAttribute(DATA_THEME_NAME);
    htmlEl.setAttribute(DATA_THEME_NAME, newTheme);
  }, [theme]);

  return { setThemeInitial, toggleTheme, theme };
}

const LOCAL_STORAGE_THEME_NAME = "theme";
const DATA_THEME_NAME = "data-theme";
