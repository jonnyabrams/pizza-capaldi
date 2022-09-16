import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";

import styles from "../styles/Cart.module.css";
import { IPizza } from "../types";

interface CartPizza extends IPizza {
  extras?: { topping: string; price: number; _id: string }[];
  price: number;
  quantity: number;
}

const Cart = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state: any) => state.cart);

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <table className={styles.table}>
          <tbody>
            <tr className={styles.trTitle}>
              <th>Product</th>
              <th>Name</th>
              <th>Extras</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
            </tr>
            {cart.products.map((product: CartPizza) => (
              <tr className={styles.tr} key={product._id}>
                <td>
                  <div className={styles.imgContainer}>
                    <Image
                      src={product.img}
                      layout="fill"
                      objectFit="cover"
                      alt=""
                    />
                  </div>
                </td>
                <td>
                  <span className={styles.name}>{product.title}</span>
                </td>
                <td>
                  <span className={styles.extras}>
                    {product.extras?.map((extra) => (
                      <span key={extra._id}>{extra.topping}</span>
                    ))}
                  </span>
                </td>
                <td className={styles.price}>
                  <span>{product.price}</span>
                </td>
                <td className={styles.quantity}>
                  <span>{product.quantity}</span>
                </td>
                <td className={styles.total}>
                  <span>£{product.price * product.quantity}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className={styles.right}>
        <div className={styles.wrapper}>
          <h2 className={styles.title}>CART TOTAL</h2>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Subtotal:</b> £
            {cart.total.toFixed(2)}
          </div>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Discount:</b>£0.00
          </div>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Total:</b>£
            {cart.total.toFixed(2)}
          </div>
          <button className={styles.button}>CHECKOUT NOW!</button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
