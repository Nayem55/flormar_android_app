import { View, Text, ScrollView, FlatList } from 'react-native'
import React from 'react'
import BottomBar from '../../Components/BottomBar'
import { useSelector } from 'react-redux';
import Product from '../../Components/Product';
import CartProduct from '../../Components/CartProduct';

const Cart = () => {
  const cartItems = useSelector(state=>state.cart);
  return (
    <View style={{flex:1,backgroundColor:"#fff"}}>
    <View>
      {
        <FlatList
        data={cartItems.data}
        renderItem={({ item,index }) => <CartProduct product={item} index={index} />}
        // onEndReached={() => setLoadData(true)}
        keyExtractor={(item) => item.id.toString()}
        onEndReachedThreshold={0.8}
        // ListFooterComponent={ListEndLoader} // Loader when loading next page.
        contentContainerStyle={{ paddingBottom: 100 }}
        // style={{flexDirection:"column"}}
        ListEmptyComponent={() =>
          cartItems.data.length < 1 && (
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