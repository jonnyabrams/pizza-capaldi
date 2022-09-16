import styles from "../styles/PizzaList.module.css";
import { IPizza } from "../types";
import PizzaCard from "./PizzaCard";

interface IProps {
  pizzaList: IPizza[];
}

const PizzaList = ({ pizzaList }: IProps) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>CAPALDI'S PERFECT PIE</h1>
      <p className={styles.desc}>
        Pizza Capaldi is arguably the best Peter Capaldi-based pizza in the
        world. (Dr) Who are you to resist? (Malcolm) Tuck(er) in!
      </p>
      <div className={styles.wrapper}>
        {pizzaList.map(pizza => (
          <PizzaCard key={pizza._id} pizza={pizza} />
        ))}
      </div>
    </div>
  );
};

export default PizzaList;
