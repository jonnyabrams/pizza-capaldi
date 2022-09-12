import Image from "next/image";

import styles from "../styles/Footer.module.css";

const Footer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <Image src="/img/bg.png" layout="fill" alt="" objectFit="cover" />
      </div>
      <div className={styles.item}>
        <div className={styles.card}>
          <h2 className={styles.motto}>PIZZA CAPALDI, IT'S THE GOODEST!</h2>
        </div>
        <div className={styles.card}>
          <h1 className={styles.title}>FIND OUR RESTAURANTS</h1>
          <p className={styles.text}>
            10 Capaldi Street
            <br />
            Capalderton
            <br />
            C10 P28
          </p>
          <p className={styles.text}>
            11 Peter Lane
            <br />
            Petersville
            <br />
            P11 C29
          </p>
          <p className={styles.text}>
            12 Tucker Avenue
            <br />
            Tuckton-on-Who
            <br />
            D13 P29
          </p>
          <p className={styles.text}>
            18 Blarg Blorx
            <br />
            Blurp
            <br />
            B202020
          </p>
        </div>
        <div className={styles.card}>
          <h1 className={styles.title}>WORKING HOURS</h1>
          <p className={styles.text}>
            MONDAY - SUNDAY
            <br /> 12:00 - 22:00
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
