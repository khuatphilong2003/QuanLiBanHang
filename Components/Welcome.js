import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'

const Welcome = (props) => {
  useEffect(()=>{
    setTimeout(()=>{
      props.navigation.navigate('Login');
    },3000)
  },[])
  return (
    <View style={{flex:1}}>
      <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
      <Image
        source={{uri:'https://cdn-icons-png.flaticon.com/512/3170/3170733.png'}}
        style={{width:100,height:100}}      
      />
      </View>
    
      <View style={{alignItems:'center',margin:40}}>
        <Text style={{fontSize:30,color:'black'}}>FOOD AND DRINK</Text>
      </View>

    </View>
  )
}

export default Welcome

const styles = StyleSheet.create({})