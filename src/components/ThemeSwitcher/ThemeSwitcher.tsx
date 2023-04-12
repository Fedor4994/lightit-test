import { useState, useEffect } from "react";
import s from "./ThemeSwitcher.module.scss";
import { FaMoon, FaSun } from "react-icons/fa";

export type Theme = "light" | "dark";

const ThemeSwitcher = () => {
  const localStorageTheme = localStorage.getItem("theme-color") as Theme;
  const [theme, setTheme] = useState<Theme>(localStorageTheme || "light");

  useEffect(() => {
    const currentThemeColor = localStorage.getItem("theme-color");

    if (currentThemeColor === "light" || currentThemeColor === "dark") {
      setTheme(currentThemeColor);
    }
    //Якщо користувач вже вибирав тему і зберіг її в локал стор,
    //то ставимо її в атрибут у body, інакше ставимо в атрибут світлу тему
    document.body.setAttribute("data-theme", theme);
  }, [theme]);

  const handleClick = (theme: Theme) => {
    setTheme(theme);
    localStorage.setItem("theme-color", theme);
  };

  return (
    <button
      className={s.themeSwitcher}
      onClick={() => handleClick(theme === "light" ? "dark" : "light")}
    >
      {theme === "light" ? (
        <>
          <FaMoon size={16} />
          <span>DARK</span>
        </>
      ) : (
        <>
          <FaSun size={16} />
          <span>LIGHT</span>
        </>
      )}
    </button>
  );
};

export default ThemeSwitcher;
