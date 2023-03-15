import { useState } from "react";
import style from "../styles/Navbar.module.css";
import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className={style.container}>
      <Link href="/">
      <Image
           src={process.env.NEXT_PUBLIC_URL + "/img/flutsoft_Logo2.png"}
           width="160"
           height="50"
          alt="ANCHOR BANK"
        />

      </Link>
      <ul className={style.list}>      
        <li className={style.listItem}>
          <Link href="/contact">Contact us</Link>
        </li>
      </ul>
      <div className={style.hamburger} onClick={() => setOpen(!open)}>
        <div className={style.line} />
        <div className={style.line} />
        <div className={style.line} />
      </div>
      <ul onClick={()=>setOpen(false)} className={style.menu} style={{ right: open ? "0px" : "-50vw" }}>
        <li className={style.menuItem}>
          <Link href="/">HOME</Link>
        </li>
       
        <li className={style.menuItem}>
          <Link href="/contact">Contact us</Link>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
