import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice } from "@reduxjs/toolkit";

const CartSlice = createSlice({
  name: "cart",
  initialState: {
    // data:[],
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
      // AsyncStorage.setItem('cart',JSON.stringify(tempData))
    },
    reduceItemQuantity(state, action) {
      let tempData = state.data;
      tempData.map((item) => {
        if (item.id == action.payload.id) {
          if(item.quantity>1){
            item.quantity = item.quantity - 1;
          }
        }
        // AsyncStorage.setItem("cart",JSON.stringify(tempData));
      });

      state.data = tempData;
    },
    deleteItemFromCart(state,action){
        let tempData = state.data;
        tempData.splice(action.payload, 1);
        state.data=tempData;
        // AsyncStorage.setItem("cart",JSON.stringify(tempData));
    },
  },
});

export const loadCartData = () => {
  return async (dispatch) => {
    try {
      const cartData = await AsyncStorage.getItem("cart");
      if (cartData) {
        const parsedData = JSON.parse(cartData);
        dispatch(CartSlice.actions.addItemToCart(parsedData));
      }
    } catch (error) {
      console.log("Error loading cart data from AsyncStorage:", error);
    }
  };
};

export const { addItemToCart,deleteItemFromCart,reduceItemQuantity } = CartSlice.actions;
export default CartSlice.reducer;
