import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { API } from './API'
import ItemBill from './ItemBill';

const ManagementOrder = (props) => {
  const [list,setList] = useState([]);
  const [total,setTotal] = useState(0);
  const [search,setSearch] = useState("");
  const getSearch = ()=>{
    let uri = API+"tbOrder";
    fetch(uri).then((res)=>{return res.json()}).then((res_json)=>{
      const listSearch = res_json.filter((item)=>item.date.includes(search));
      setList([...listSearch]);
    })
  }
  const getData = ()=>{
    let uri = API +"tbOrder";
    fetch(uri).
    then((res)=>{return res.json()}).
    then((res_json)=>{
        setList([...res_json.sort((a,b)=>b.id - a.id)]);

    })
  }
  useEffect(()=>{
    getData();
  },[]);
  return (
    <View style={{ flex: 1,padding:10}}>
      <View>
        <TouchableOpacity
          style={{
            backgroundColor: "cyan",
            padding: 10,
            marginTop: 10,
            marginBottom: 10,
            borderRadius: 10,
            alignItems: "center",
          }}
          onPress={()=>props.navigation.navigate("AddOrder")}
        >
          <Text>Thêm hóa đơn</Text>
        </TouchableOpacity>
      </View>
      <View style={{ flexDirection: 'row', margin: 10 }}>
          <View style={{ flex: 1 }}>
            <TextInput
              placeholder='Nhập vào ngày (yyyy/mm/d)'
              style={{ height: 30 }}
              onChangeText={(Text)=>setSearch(Text)}
            />
            <View style={{ backgroundColor: "gray", height: 1 }}></View>
          </View>
          <TouchableOpacity
            style={{backgroundColor:"cyan",justifyContent:'center',alignItems:'center',padding:5,marginLeft:10,borderRadius:10,flex:0.3}}
            onPress={getSearch}
          >
            <Text>Tìm kiếm</Text>
          </TouchableOpacity>

        </View>
      
      <View style={{ flex: 1 }}>
        <FlatList
          data={list}
          renderItem={({ item }) => <ItemBill item = {item}/>}
         
        />
      </View>
    </View>
  )
}

export default ManagementOrder

const styles = StyleSheet.create({})