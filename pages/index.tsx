import axios from "axios";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { Toaster } from "react-hot-toast";

import Featured from "../components/Featured";
import PizzaList from "../components/PizzaList";
import styles from "../styles/Home.module.css";
import { IPizza } from "../types";

interface IProps {
  pizzaList: IPizza[];
}

const Home: NextPage<IProps> = ({ pizzaList }: IProps) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Pizza Capaldi</title>
        <meta name="description" content="Peter Capaldi's pizza pies" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Toaster position="top-center" reverseOrder={false} />
      <Featured />
      <PizzaList pizzaList={pizzaList} />
    </div>
  );
};

export default Home;

export const getServerSideProps = async () => {
  const res = await axios.get("http://localhost:3000/api/pizzas");
  return {
    props: {
      pizzaList: res.data,
    },
  };
};
