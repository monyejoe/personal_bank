import Head from "next/head";
import Image from "next/image";
import Intro from "../components/Intro";
import Services from "../components/Services";
import styles from "../styles/Home.module.css";
import { data } from "../data";
import Testimonials from "../components/Testimonials";

export default function Home({ services }) {
  return (
    <div>
      <Head>
        <title>Anchor Offshore</title>
        <meta
          name="description"
          content="banking, business account, offshore account"
        />
      </Head>
      <Intro />
      {/* <Services services={services} />
      <Testimonials /> */}
    </div>
  );
}

export const getStaticProps = () => {
  const services = data;
  return {
    props: { services },
  };
};
