import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";
import { useRouter } from "next/router";

import styles from "../styles/Cart.module.css";
import { IPizza } from "../types";
import axios from "axios";
import { reset } from "../redux/cartSlice";

interface CartPizza extends IPizza {
  extras?: { topping: string; price: number; _id: string }[];
  price: number;
  quantity: number;
}

const Cart = () => {
  const cart = useSelector((state: any) => state.cart);
  const [showPayPal, setShowPayPal] = useState(false);
  const amount = cart.total;
  const currency = "GBP";
  const style = { layout: "vertical" };
  const dispatch = useDispatch();
  const router = useRouter();

  const createOrder = async (data: any) => {
    try {
      const res = await axios.post("http://localhost:3000/api/orders", data);
      res.status === 201 && router.push("/order/" + res.data._id);
      dispatch(reset());
    } catch (error) {
      console.log(error);
    }
  };

  const ButtonWrapper = ({
    currency,
    showSpinner,
  }: {
    currency: any;
    showSpinner: any;
  }) => {
    // usePayPalScriptReducer can be use only inside children of PayPalScriptProviders
    // This is the main reason to wrap the PayPalButtons in a new component
    const [{ options, isPending }, dispatch] = usePayPalScriptReducer();

    useEffect(() => {
      dispatch({
        type: "resetOptions",
        value: {
          ...options,
          currency: currency,
        },
      });
    }, [currency, showSpinner]);

    return (
      <>
        {showSpinner && isPending && <div className="spinner" />}
        <PayPalButtons
          disabled={false}
          forceReRender={[amount, currency, style]}
          fundingSource={undefined}
          createOrder={(data, actions) => {
            return actions.order
              .create({
                purchase_units: [
                  {
                    amount: {
                      currency_code: currency,
                      value: amount,
                    },
                  },
                ],
              })
              .then((orderId) => {
                // Your code here after create the order
                return orderId;
              });
          }}
          onApprove={function (data, actions) {
            return actions.order?.capture().then(function (details) {
              const shipping = details.purchase_units[0].shipping;
              createOrder({
                customer: shipping?.name?.full_name,
                address: shipping?.address?.address_line_1,
                total: cart.total,
                method: 1,
              });
            });
          }}
        />
      </>
    );
  };

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
          </tbody>
          <tbody>
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
          {showPayPal ? (
            <div className={styles.paymentMethods}>
              <button className={styles.payButton}>CASH ON DELIVERY</button>
              <PayPalScriptProvider
                options={{
                  "client-id":
                    "ARzpVE4fXLfa_DhMEv4zaBrXHgiM5n_HHkOX8la9YiI6h93er2LWW9GZzS8jgQjkeYwbENKyBz15RS-K",
                  components: "buttons",
                  currency: "GBP",
                  "disable-funding": "credit,card,p24",
                }}
              >
                <ButtonWrapper currency={currency} showSpinner={false} />
              </PayPalScriptProvider>
            </div>
          ) : (
            <button
              onClick={() => setShowPayPal(true)}
              className={styles.button}
            >
              CHECKOUT NOW!
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
