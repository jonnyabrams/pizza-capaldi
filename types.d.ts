export interface IPizza {
  _id: Types.ObjectId;
  title: string;
  desc: string;
  img: string;
  prices: number[];
  extraOptions?: { topping: string; price: number; _id: Types.ObjectId }[];
}

export interface IOrder {
  _id: Types.ObjectId;
  customer: string;
  address: string;
  total: number;
  status: number;
  method: number;
}

export interface IExtras {
  topping: string;
  price: number;
  _id: Types.ObjectId;
}
