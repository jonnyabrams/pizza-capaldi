export interface Pizza {
  title: string;
  desc: string;
  img: string;
  prices: number[];
  extraOptions: { topping: string; price: number }[];
}
