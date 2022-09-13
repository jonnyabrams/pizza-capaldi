import Image from "next/image";

import styles from "../../styles/Order.module.css";

const Order = () => {
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.row}>
          <table className={styles.table}>
            <tbody>
              <tr className={styles.tr}>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Address</th>
                <th>Total</th>
              </tr>
              <tr>
                <td>
                  <span className={styles.id}>208498203</span>
                </td>
                <td>
                  <span className={styles.name}>Bobson Dugnutt</span>
                </td>
                <td className={styles.address}>
                  <span>10 Address Lane, Addressville</span>
                </td>

                <td className={styles.total}>
                  <span>£12.99</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className={styles.row}>
          <div className={styles.status}>
            <Image src="/img/paid.png" width={30} height={30} alt="" />
            <span>Payment</span>
            <div className={styles.checkedIcon}>
              <Image src="/img/checked.png" width={20} height={20} alt="" />
            </div>
          </div>
          <div className={styles.status}>
            <Image src="/img/bake.png" width={30} height={30} alt="" />
            <span>Preparing</span>
            <div className={styles.checkedIcon}>
              <Image src="/img/checked.png" width={20} height={20} alt="" />
            </div>
          </div>
          <div className={styles.status}>
            <Image src="/img/bike.png" width={30} height={30} alt="" />
            <span>On the way</span>
            <div className={styles.checkedIcon}>
              <Image src="/img/checked.png" width={20} height={20} alt="" />
            </div>
          </div>
          <div className={styles.status}>
            <Image src="/img/delivered.png" width={30} height={30} alt="" />
            <span>Delivered</span>
            <div className={styles.checkedIcon}>
              <Image src="/img/checked.png" width={20} height={20} alt="" />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.wrapper}>
          <h2 className={styles.title}>CART TOTAL</h2>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Subtotal:</b> £12.99
          </div>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Discount:</b>£0.00
          </div>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Total:</b>£12.99
          </div>
          <button disabled className={styles.button}>
            PAID
          </button>
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default Order;
