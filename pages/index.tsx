import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";

import Featured from "../components/Featured";
import PizzaList from "../components/PizzaList";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Pizza Capaldi</title>
        <meta name="description" content="Peter Capaldi's pizza pies" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Featured />
      <PizzaList />
    </div>
  );
};

export default Home;
