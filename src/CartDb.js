import AsyncStorage from "@react-native-async-storage/async-storage";

// use local storage to manage cart data
const addToDb = (id, quantity) => {
  let shoppingCart = {};
  const productQuantity = quantity || 1;
  //get the shopping cart from local storage
  const storedCart = AsyncStorage.getItem("shopping-cart");
  if (storedCart) {
    shoppingCart = JSON.parse(storedCart);
  }

  // add quantity
  if (shoppingCart[id]) {
    const newQuantity = shoppingCart[id] + productQuantity;
    shoppingCart[id] = newQuantity;
  } else {
    shoppingCart[id] = productQuantity;
  }
  AsyncStorage.setItem("shopping-cart", JSON.stringify(shoppingCart));
};

const getStoredCart = () => {
  let shoppingCart = {};

  //get the shopping cart from local storage
  const storedCart = AsyncStorage.getItem("shopping-cart");
  if (storedCart) {
    shoppingCart = JSON.parse(storedCart);
  }
  return shoppingCart;
};

const removeFromDb = (id) => {
  const storedCart = AsyncStorage.getItem("shopping-cart");
  if (storedCart) {
    const shoppingCart = JSON.parse(storedCart);
    if (id in shoppingCart) {
      delete shoppingCart[id];
      AsyncStorage.setItem("shopping-cart", JSON.stringify(shoppingCart));
    }
  }
};

export { addToDb, removeFromDb, getStoredCart };
