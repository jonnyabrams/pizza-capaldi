export interface IPizza {
  _id: Types.ObjectId;
  title: string;
  desc: string;
  img: string;
  prices: number[];
  extraOptions?: { topping: string; price: number; _id: Types.ObjectId }[];
}

interface IExtras {
  topping: string;
  price: number;
  _id: Types.ObjectId;
}