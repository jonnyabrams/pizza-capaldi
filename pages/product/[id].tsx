import axios from "axios";
import Image from "next/image";
import { ChangeEvent, useState } from "react";

import styles from "../../styles/Product.module.css";
import { IPizza, IExtras } from "../../types";

interface IProps {
  pizza: IPizza;
}

const Product = ({ pizza }: IProps) => {
  const [size, setSize] = useState(0);
  const [price, setPrice] = useState(pizza.prices[0]);
  const [quantity, setQuantity] = useState(1);
  const [extras, setExtras] = useState<IExtras[]>([]);

  const changePrice = (number: number) => {
    setPrice(price + number);
  };

  const handleSize = (sizeIndex: number) => {
    const difference = pizza.prices[sizeIndex] - pizza.prices[size];
    setSize(sizeIndex);
    changePrice(difference);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>, option: IExtras) => {
    const checked = e.target.checked;

    if (checked) {
      changePrice(option.price);
      setExtras((prev) => [...prev, option]);
    } else {
      changePrice(-option.price);
      setExtras(extras.filter((extra) => extra._id !== option._id));
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.imgContainer}>
          <Image src={pizza.img} layout="fill" alt="" objectFit="contain" />
        </div>
      </div>
      <div className={styles.right}>
        <h1 className={styles.title}>{pizza.title}</h1>
        <span className={styles.price}>£{price.toFixed(2)}</span>
        <p className={styles.desc}>{pizza.desc}</p>
        <h3 className={styles.choose}>Choose size:</h3>
        <div className={styles.sizes}>
          <div className={styles.size} onClick={() => handleSize(0)}>
            <Image src="/img/size.png" layout="fill" alt="" />
            <span className={styles.number}>Small</span>
          </div>
          <div className={styles.size} onClick={() => handleSize(1)}>
            <Image src="/img/size.png" layout="fill" alt="" />
            <span className={styles.number}>Medium</span>
          </div>
          <div className={styles.size} onClick={() => handleSize(2)}>
            <Image src="/img/size.png" layout="fill" alt="" />
            <span className={styles.number}>Large</span>
          </div>
        </div>
        <h3 className={styles.choose}>Choose additional ingredients:</h3>
        <div className={styles.ingredients}>
          {pizza.extraOptions?.map((option) => (
            <div className={styles.option} key={option._id}>
              <input
                type="checkbox"
                id={option.topping}
                name={option.topping}
                className={styles.checkbox}
                onChange={(e) => handleChange(e, option)}
              />
              <label htmlFor={option.topping}>{option.topping}</label>
            </div>
          ))}
        </div>
        <div className={styles.add}>
          <input
            onChange={(e) => setQuantity(parseInt(e.target.value))}
            type="number"
            defaultValue={1}
            className={styles.quantity}
          />
          <button className={styles.button}>Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export default Product;

export const getServerSideProps = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  const res = await axios.get(`http://localhost:3000/api/pizzas/${id}`);
  return {
    props: {
      pizza: res.data,
    },
  };
};
