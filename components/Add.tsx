import {
  ChangeEvent,
  Dispatch,
  MouseEvent,
  SetStateAction,
  useState,
} from "react";
import { useRouter } from "next/router";
import axios from "axios";

import { IExtras } from "../types";
import styles from "../styles/Add.module.css";

interface IProps {
  setAddModalClosed: Dispatch<SetStateAction<boolean>>;
}

const Add = ({ setAddModalClosed }: IProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [prices, setPrices] = useState<number[]>([]);
  const [extraOptions, setExtraOptions] = useState<IExtras[]>([]);
  const [extra, setExtra] = useState({});

  const handleExtraInput = (e: ChangeEvent<HTMLInputElement>) => {
    setExtra({ ...extra, [e.target.name]: e.target.value });
  };

  const handleExtra = (e: MouseEvent<HTMLButtonElement>) => {
    setExtraOptions((prev: any) => (prev ? [...prev, extra] : [extra]));
  };

  const changePrice = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const currentPrices = prices;
    currentPrices[index] = parseInt(e.target.value);
    setPrices(currentPrices);
  };

  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    // make this into a function to incorporate next line, which fixes TS "possibly null" error
    if (!e.target.files) return;
    setFile(e.target.files[0]);
  };

  const handleCreate = async () => {
    const data = new FormData();
    file && data.append("file", file);
    // indicate uploading folder (in this case 'uploads')
    data.append("upload_preset", "uploads");
    try {
      const uploadRes = await axios.post(
        "https://api.cloudinary.com/v1_1/dmmogtbko/image/upload",
        data
      );

      const { url } = uploadRes.data;
      const newProduct = {
        title,
        desc,
        prices,
        extraOptions,
        img: url,
      };

      await axios.post("http://localhost:3000/api/pizzas", newProduct);
      setAddModalClosed(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <span onClick={() => setAddModalClosed(true)} className={styles.close}>
          X
        </span>
        <h1>Add new pizza</h1>
        <div className={styles.item}>
          <label className={styles.label}>Choose an image</label>
          <input type="file" onChange={handleFile} />
        </div>
        <div className={styles.item}>
          <label className={styles.label}>Title</label>
          <input
            className={styles.input}
            type="text"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className={styles.item}>
          <label className={styles.label}>Description</label>
          <textarea rows={4} onChange={(e) => setDesc(e.target.value)} />
        </div>
        <div className={styles.item}>
          <label className={styles.label}>Prices</label>
          <div className={styles.priceContainer}>
            <input
              className={`${styles.input} ${styles.inputSm}`}
              type="number"
              placeholder="Small"
              onChange={(e) => changePrice(e, 0)}
            />
            <input
              className={`${styles.input} ${styles.inputSm}`}
              type="number"
              placeholder="Medium"
              onChange={(e) => changePrice(e, 1)}
            />
            <input
              className={`${styles.input} ${styles.inputSm}`}
              type="number"
              placeholder="Large"
              onChange={(e) => changePrice(e, 2)}
            />
          </div>
        </div>
        <div className={styles.item}>
          <label className={styles.label}>Extra</label>
          <div className={styles.extra}>
            <input
              className={`${styles.input} ${styles.inputSm}`}
              type="text"
              placeholder="Item"
              name="topping"
              onChange={handleExtraInput}
            />
            <input
              className={`${styles.input} ${styles.inputSm}`}
              type="number"
              placeholder="Price"
              name="price"
              onChange={handleExtraInput}
            />
            <button className={styles.extraButton} onClick={handleExtra}>
              Add
            </button>
          </div>
          <div className={styles.extraItems}>
            {extraOptions.map((option) => (
              <span key={option.topping} className={styles.extraItem}>
                {option.topping}
              </span>
            ))}
          </div>
        </div>
        <button className={styles.addButton} onClick={handleCreate}>
          Create
        </button>
      </div>
    </div>
  );
};

export default Add;
