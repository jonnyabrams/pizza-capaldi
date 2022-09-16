import { createSlice } from "@reduxjs/toolkit";

import { IPizza } from "../types";

interface ProductState {
  products: IPizza[];
  total: number;
}

const initialState: ProductState = {
  products: [],
  total: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProduct: (state, action) => {
      state.products.push(action.payload);
      state.total += action.payload.price * action.payload.quantity;
    },
    reset: (state) => {
      state = initialState;
    },
  },
});

export const { addProduct, reset } = cartSlice.actions;
export default cartSlice.reducer;
