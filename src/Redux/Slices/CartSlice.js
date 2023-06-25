import { createSlice } from "@reduxjs/toolkit";

const CartSlice = createSlice({
  name: "cart",
  initialState: {
    data: [],
  },
  reducers: {
    addItemToCart(state, action) {
      let tempData = state.data;
      let isItemExist = false;
      tempData.map((item) => {
        if (item.id == action.payload.id) {
          isItemExist = true;
          item.quantity = item.quantity + 1;
        }
      });
      if (!isItemExist) {
        action.payload.quantity = 1;
        tempData.push(action.payload);
      }
      state.data = tempData;
    },
    deleteItemFromCart(state,action){
        let tempData = state.data;
        tempData.splice(action.payload, 1);
        state.data=tempData;
    },
  },
});

export const { addItemToCart,deleteItemFromCart } = CartSlice.actions;
export default CartSlice.reducer;
