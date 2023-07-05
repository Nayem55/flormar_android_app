import { View, Text, ScrollView, FlatList, TouchableOpacity } from 'react-native'
import React from 'react'
import BottomBar from '../../Components/BottomBar'
import { useDispatch, useSelector } from 'react-redux';
import CartProduct from '../../Components/CartProduct';
import { useState } from 'react';
import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';


const Cart = () => {
  const [cartItems,setCartItems]=useState([])
  const items = useSelector(state=>state.cart);
  const navigation = useNavigation();

  useEffect(()=>{
    getData();
  },[])

  useEffect(()=>{
    setCartItems(items.data);
  },[items])

  const getData = async () => {
    try {
      const storedValue = await AsyncStorage.getItem('cart');
      if (storedValue !== null) {
        const parsedValue = JSON.parse(storedValue);
        items.data = parsedValue;
        setCartItems(parsedValue)
      } else {
        console.log('No data found in AsyncStorage.');
      }
    } catch (error) {
      console.log('Error retrieving data:', error);
    }
  };


  return (
    <View style={{flex:1,backgroundColor:"#fff"}}>
    <ScrollView>
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
          cartItems?.length < 1 && (
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
      <TouchableOpacity onPress={()=>navigation.navigate('Check Out',{items:cartItems})} style={{backgroundColor:"#000",padding:10,justifyContent:"center",alignItems:"center",marginLeft:30,marginRight:30,marginBottom:100}}>
        <Text style={{color:"#fff",}}>Check Out</Text>
      </TouchableOpacity>
    </ScrollView>
      <BottomBar></BottomBar>
    </View>
  )
}

export default Cart;