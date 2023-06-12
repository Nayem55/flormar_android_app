import { View, Image, Text } from 'react-native'
import React from 'react'

const Categories = () => {
  return (
    <View style={{flex:1, flexDirection:'row',padding:10, paddingTop:20, paddingBottom:20,backgroundColor:"#fff"}}>
        <View style={styles.category}>
        <Image style = {styles.image}  source={require('../Images/categories/cat1.png')} />
            <Text>
                Face
            </Text>
        </View>
        <View style={styles.category}>
        <Image style = {styles.image} source={require('../Images/categories/cat2.png')} />
            <Text>
                Eyes    
            </Text>
        </View>
        <View style={styles.category}>
        <Image style = {styles.image} source={require('../Images/categories/cat3.png')} />
            <Text>
                Lips
            </Text>
        </View>
        <View style={styles.category}>
        <Image style = {styles.image} source={require('../Images/categories/cat4.png')} />
            <Text>
                Nails
            </Text>
        </View>
        <View style={styles.category}>
        <Image style = {styles.image} source={require('../Images/categories/cat5.png')} />
            <Text>
                Accessories
            </Text>
        </View>
    </View>
  )
}

export default Categories;

const styles = {
    category : {
        flex:1,
        justifyContent:"center",
        alignItems:"center",
        flexDirection:'column',
        // backgroundColor:"#fff",        
    },

    image : {
        width: 60,
        height: 60,
        borderRadius:50,
    }
    


}