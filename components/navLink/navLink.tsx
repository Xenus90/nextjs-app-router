"use client";
import Link from "next/link";
import style from "./style.module.css";
import { ReactNode } from "react";
import { usePathname } from "next/navigation";

type Props = {
  href: string;
  children: ReactNode;
};

export default function NavLink(props: Props) {
  const path = usePathname();
  const { href, children } = props;

  return (
    <Link href={href} className={path.includes(href) ? `${style.link} ${style.active}` : style.link}>
      {children}
    </Link>
  );
}