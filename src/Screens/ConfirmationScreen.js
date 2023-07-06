import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const ConfirmationScreen = () => {
    const navigation = useNavigation()
  return (
    <View style={{backgroundColor: "#fff",flex:1,justifyContent:"center",alignItems:"center"}}>
      <Text style={{fontSize:24}}>Thank You !!! </Text>
      <Text style={{fontSize:26,backgroundColor:"#fceef2",padding:40,marginLeft:10,marginRight:10,marginTop:30,textAlign:"center"}}>Your Order Has Been Confirmed</Text>
      <TouchableOpacity onPress={()=>navigation.navigate("main")} style={{backgroundColor:"#e7205b",padding:10,marginLeft:10,marginRight:10,marginTop:30,textAlign:"center",borderRadius:10}}>
            <Text style={{color:"#fff"}}>Continue Shopping</Text>
      </TouchableOpacity>
    </View>
  )
}

export default ConfirmationScreen