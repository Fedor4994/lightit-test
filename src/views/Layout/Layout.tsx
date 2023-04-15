import { Link, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaRegUser, FaCode } from "react-icons/fa";

import Logo from "../../components/Logo/Logo";
import ThemeSwitcher from "../../components/ThemeSwitcher/ThemeSwitcher";
import { selectIsLoggedIn } from "../../redux/auth/auth-selectors";
import UserMenu from "../../components/UserMenu/UserMenu";

import s from "./Layout.module.scss";

const Layout = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <>
      {/* блок контент для того щоб прижати футер до низу сторінки */}
      <div className={s.content}>
        <header className={s.header}>
          <Logo />

          {isLoggedIn ? (
            <UserMenu />
          ) : (
            <div className={s.loginIcon}>
              <Link to="/login">
                <FaRegUser className={s.infoIcon} size={18} />
              </Link>
            </div>
          )}
        </header>

        {/* футер і хедер завжди однакові, а у мейн динамічно підставляются сторінки
        в залежності від маршруту */}
        <main>
          <Outlet />
        </main>
      </div>

      <footer className={s.footer}>
        <ul className={s.footerList}>
          <li>
            <a
              href="https://github.com/Fedor4994"
              target="_blank"
              rel="noopender noreferrer"
              className={s.footerIcon}
            >
              <FaCode size={16} />
              <span>GitHub</span>
            </a>
          </li>
          <li>
            <ThemeSwitcher />
          </li>
        </ul>
      </footer>
    </>
  );
};

export default Layout;
