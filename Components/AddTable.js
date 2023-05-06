import { StyleSheet, Switch, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { API } from './API';

const AddTable = () => {
  const [name,setName] = useState([]);
  const [isEnable, setIsEnable] = useState(false);
  const onAddTable = ()=>{
    let uri = API+"tbTable";
    let objSP = {
      "name":name,
      "status":isEnable == false?"Trống":"Không trống"
    }
    fetch(uri,{
      method:"POST",
      headers: { 
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify( objSP  ) 
    })
    .then ( (response )=>{
      console.log(response.status);
      // nếu log là 201 thì là tạo thành công
      if(response.status==201)
        alert("Thêm mới thành công");
   
    })
  }

  const tongleEnale = (value) => {
    setIsEnable(value);
  };
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <View
        style={{
          width: 300,
          height: 260,
          backgroundColor: "cyan",
          padding: 20,
          shadowColor: "black",
          shadowOpacity: 0.26,
          shadowOffset: { width: 0, height: 2 },
          shadowRadius: 8,
          elevation: 5,
        }}
      >
        <View>
          <Text>Tên bàn</Text>
        </View>
        <View
          style={{
            backgroundColor: "white",
            padding: 8,
            marginTop: 5,
            borderRadius: 5,
          }}
        >
          <TextInput
            placeholder="Nhập tên bàn"
            onChangeText={(Text) => {
              setName(Text);
            }}
          />
        </View>
        <View style={{marginTop:20}}>
          <Text>
            Trạng thái bàn
          </Text>
        </View>
        <View>
        <Switch onValueChange={tongleEnale} value={isEnable} />
        </View>
       
       
        
        
        <View style={{ flex: 1, alignItems: "center", marginTop: 20 }}>
          <TouchableOpacity
            style={{
              width: 200,
              height: 40,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 10,
              backgroundColor: "white",
            }}
            onPress={onAddTable}
          >
            <Text>Đăng ký</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default AddTable

const styles = StyleSheet.create({})