import Image from "next/image";
import styles from "../../styles/Admin.module.css";

const Admin = () => {
  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <h1 className={styles.title}>Products</h1>
        <table className={styles.table}>
          <tbody>
            <tr className={styles.trTitle}>
              <th>Image</th>
              <th>ID</th>
              <th>Title</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </tbody>
          <tbody>
            <tr className={styles.trTitle}>
              <td>
                <Image
                  src="/img/pizza.png"
                  width={50}
                  height={50}
                  objectFit="cover"
                  alt=""
                />
              </td>
              <td>PizzaId</td>
              <td>PizzaTitle</td>
              <td>£20</td>
              <td>
                <button className={styles.button}>Edit</button>
                <button className={styles.button}>Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className={styles.item}>
        <h1 className={styles.title}>Orders</h1>
        <table className={styles.table}>
          <tbody>
            <tr className={styles.trTitle}>
              <th>ID</th>
              <th>Customer</th>
              <th>Total</th>
              <th>Payment</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </tbody>
          <tbody>
            <tr className={styles.trTitle}>
              <td>{"1927374987290107".slice(0, 5)}...</td>
              <td>John Doe</td>
              <td>£20</td>
              <td>paid</td>
              <td>preparing</td>
              <td>
                <button>Next Stage</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Admin;