import { Dispatch, SetStateAction } from "react";
import styles from "../styles/AddButton.module.css";

interface IProps{
  setAddModalClosed: Dispatch<SetStateAction<boolean>>;
}

const AddButton = ({setAddModalClosed}: IProps) => {
  return (
    <div onClick={() => setAddModalClosed(false)} className={styles.mainAddButton}>Add new pizza</div>
  )
}

export default AddButton