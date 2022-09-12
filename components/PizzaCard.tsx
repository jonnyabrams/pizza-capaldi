import Image from "next/image";

import styles from "../styles/PizzaCard.module.css";

const PizzaCard = () => {
  return (
    <div className={styles.container}>
      <Image src="/img/pizza.png" alt="" height="500" width="500" />
      <h1 className={styles.title}>PIZZA A LA CHEESE</h1>
      <span className={styles.price}>£12.99</span>
      <p className={styles.desc}>A pizza with like cheese and that</p>
    </div>
  )
}

export default PizzaCard