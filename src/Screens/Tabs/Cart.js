import { View, Text, ScrollView, FlatList } from 'react-native'
import React from 'react'
import BottomBar from '../../Components/BottomBar'
import { useDispatch, useSelector } from 'react-redux';
import Product from '../../Components/Product';
import CartProduct from '../../Components/CartProduct';
import { useState } from 'react';
import { useEffect } from 'react';


const Cart = () => {
  const [cartItems,setCartItems]=useState([])
  const items = useSelector(state=>state.cart);
  useEffect(()=>{
    setCartItems(items.data)
  },[items])

  return (
    <View style={{flex:1,backgroundColor:"#fff"}}>
    <View>
      {
        <FlatList
        data={cartItems}
        renderItem={({ item,index }) => <CartProduct product={item} index={index} />}
        // onEndReached={() => setLoadData(true)}
        keyExtractor={(item) => item.id.toString()}
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