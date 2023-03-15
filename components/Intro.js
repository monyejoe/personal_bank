import style from "../styles/Intro.module.css";
import Image from "next/image";
import Circle from "./Circle";
import Link from "next/link";

const Intro = () => {
  return (
    <div className={style.container}>
      {/* <div className={`${style.circle} ${style.circle1}`} />
      <div className={`${style.circle} ${style.circle2}`} /> */}
      <Circle backgroundColor="#01c686" top="-45vh" left="-45vh" />
      {/* <Circle backgroundColor="#01c686" right="-40vh" /> */}
      <div className={style.card}>
        <h1 className={style.title}>
          <span className={style.brandName}>Offshore Account</span>  
        </h1>
        <p className={style.desc}>
        Expand your business worldwide
        Get your business account within minutes and manage your financials with ease.
        </p>
       <button className={style.button}> <Link href="/login"> Login to your Account </Link></button>
      </div>
      <div className={style.card}>
        <Image
          src={process.env.NEXT_PUBLIC_URL + "/banner.jpg"}
          layout="fill"
          objectFit="cover"
          alt=""
        />
      </div>
    </div>
  );
};

export default Intro;
