import axios from "axios";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import { Toaster } from "react-hot-toast";
import Add from "../components/Add";
import AddButton from "../components/AddButton";

import Featured from "../components/Featured";
import PizzaList from "../components/PizzaList";
import styles from "../styles/Home.module.css";
import { IPizza } from "../types";

interface IProps {
  pizzaList: IPizza[];
  admin: boolean;
}

const Home: NextPage<IProps> = ({ pizzaList, admin }: IProps) => {
  const [addModalClosed, setAddModalClosed] = useState(true);

  return (
    <div className={styles.container}>
      <Head>
        <title>Pizza Capaldi</title>
        <meta name="description" content="Peter Capaldi's pizza pies" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Toaster position="top-center" reverseOrder={false} />
      <Featured />
      {admin && <AddButton setAddModalClosed={setAddModalClosed} />}
      <PizzaList pizzaList={pizzaList} />
      {!addModalClosed && <Add setAddModalClosed={setAddModalClosed} />}
    </div>
  );
};

export default Home;

export const getServerSideProps = async (ctx: any) => {
  //ctx = context
  const myCookie = ctx.req?.cookies || "";
  let admin = false;

  if (myCookie.token === process.env.TOKEN) {
    admin = true;
  }
  const res = await axios.get("http://localhost:3000/api/pizzas");
  return {
    props: {
      pizzaList: res.data,
      admin,
    },
  };
};
