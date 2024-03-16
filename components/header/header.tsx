import logo from "@/assets/logo.png";
import style from "./style.module.css";
import Image from "next/image";
import HeaderBackground from "../headerBackground/headerBackground";
import Link from "next/link";
import NavLink from "@/components/navLink/navLink";

export default function Header() {
  return (
    <>
      <HeaderBackground />
      <header className={style.header}>
        <Link href="/" className={style.logo}>
          <Image priority src={logo} alt="A plate with food on it" />
          <span>NextLevel Food</span>
        </Link>
        <nav className={style.nav}>
          <ul>
            <li>
              <NavLink href="/meals">
                Browse Meals
              </NavLink>
            </li>
            <li>
              <NavLink href="/community">
                Foodies Community
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}