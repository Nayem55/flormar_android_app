import { View, Text, ScrollView, FlatList } from 'react-native'
import React from 'react'
import BottomBar from '../../Components/BottomBar'
import { useDispatch, useSelector } from 'react-redux';
import Product from '../../Components/Product';
import CartProduct from '../../Components/CartProduct';
import { useState } from 'react';
import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loadCartData } from '../../Redux/Slices/CartSlice';


const Cart = () => {
  const [cartItems,setCartItems]=useState([])
  const items = useSelector(state=>state.cart);
  const dispatch = useDispatch()
  const setData = async (items) => {
    try {
      const stringifiedObject = JSON.stringify(items);
      await AsyncStorage.setItem('cart', stringifiedObject);
      console.log('Data saved successfully!');
    } catch (error) {
      console.log('Error saving data:', error);
    }
  };

  useEffect(()=>{
    // dispatch(loadCartData())
    setCartItems(items.data);
    setData(items.data)
  },[items])



  const getData = async () => {
    try {
      const storedValue = await AsyncStorage.getItem('cart');
      if (storedValue !== null) {
        const parsedValue = JSON.parse(storedValue);
        console.log('Retrieved data:', parsedValue);
      } else {
        console.log('No data found in AsyncStorage.');
      }
    } catch (error) {
      console.log('Error retrieving data:', error);
    }
  };
  getData()

  return (
    <View style={{flex:1,backgroundColor:"#fff"}}>
    <View>
      {
        <FlatList
        data={cartItems}
        renderItem={({ item,index }) => <CartProduct product={item} index={index} />}
        // onEndReached={() => setLoadData(true)}
        // keyExtractor={(item) => item.id.toString()}
        onEndReachedThreshold={0.8}
        // ListFooterComponent={ListEndLoader} // Loader when loading next page.
        contentContainerStyle={{ paddingBottom: 100 }}
        // style={{flexDirection:"column"}}
        ListEmptyComponent={() =>
          cartItems?.data?.length < 1 && (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#fff",
                paddingTop: 100,
              }}
            >
              <Text style={{ fontSize: 18, textAlign: "center" }}>
                {" "}
                Your Cart Is Empty !!!
              </Text>
            </View>
          )
        }
      />
      }
    </View>
      <BottomBar></BottomBar>
    </View>
  )
}

export default Cart