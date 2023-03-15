import style from "../styles/Footer.module.css";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <div className={style.container}>
      <div className={style.cardL}>
        <h1 className={style.title}><Image
           src={process.env.NEXT_PUBLIC_URL + "/img/flutsoft_Logo2.png"}
           width="250"
           height="80"
          alt="HOME BANK" /> </h1>
        <h1 className={style.linkTitle}>
          <Link href="/login" className={style.link} passHref>
            <>
              <span className={style.linkText}>BANK WITH US</span>
              <Image
                src={process.env.NEXT_PUBLIC_URL + "/img/link.png"}
                width="40px"
                height="40px"
                alt=""
              />
            </>
          </Link>
        </h1>
      </div>
      <div className={style.cardS}>
        <div className={style.cardItem}>
        <br />
         <br />
        </div>
        <div className={style.cardItem}>
        <span className={style.linkText}>CONTACT US</span> <br/>
         flutsoft.tech@gmail.com
          <br />
        </div>
      </div>
      <div className={style.cardS}>
        <div className={style.cardItem}>
        
        </div>
        <div className={style.cardItem}>
          © 2022 HOME BANK,
          <br />
          ALL RIGHTS RESERVED
        </div>
      </div>
    </div>
  );
};

export default Footer;
