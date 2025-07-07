import { useCallback, useState } from "react";

type Theme = "cupcake" | "dracula";

export function useTheme() {
  const htmlEl = document.querySelector("html");
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem(LOCAL_STORAGE_THEME_NAME) as Theme) ?? "cupcake"
  );

  const setThemeInitial = useCallback(() => {
    if (!htmlEl) return;
    htmlEl.removeAttribute(DATA_THEME_NAME);
    htmlEl.setAttribute(DATA_THEME_NAME, theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    if (!htmlEl) return;
    const newTheme = theme === "cupcake" ? "dracula" : "cupcake";
    setTheme(newTheme);
    localStorage.setItem(LOCAL_STORAGE_THEME_NAME, newTheme);
    htmlEl.removeAttribute(DATA_THEME_NAME);
    htmlEl.setAttribute(DATA_THEME_NAME, newTheme);
  }, [theme]);

  return { setThemeInitial, toggleTheme, theme };
}

const LOCAL_STORAGE_THEME_NAME = "theme";
const DATA_THEME_NAME = "data-theme";
