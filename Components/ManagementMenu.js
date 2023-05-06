import { FlatList, Image, Modal, RefreshControl, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { API } from './API';
import ItemFood from './ItemFood';

const ManagementMenu = (props) => {
  const [list, setList] = useState([]);
  const [refreshing, setRefreshing] = React.useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [search,setSearch] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

const getSearch = ()=>{
  let uri = API+"tbFood";
  fetch(uri).then((res)=>{return res.json()}).then((res_json)=>{
    const listSearch = res_json.filter((item)=>item.name.includes(search));
    setList([...listSearch]);
  })
}

  const addFood = () => {
    if (name.length == 0) {
      alert("Tên không được bỏ trống");
      return;
    }
    if (price.length == 0) {
      alert("Giá không được bỏ trống");
      return;
    }
    var uri = API + "tbFood"
    console.log(uri);
    var objSP = {
      "name": name,
      "price": price
    }
    fetch(uri, {
      method: 'POST', // POST: Thêm mới, PUT: Sửa, DELETE: xóa, GET: lấy thông tin
      headers: { // Định dạng dữ liệu gửi đi
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(objSP) // chuyển đối tượng SP thành chuỗi JSON
    })
      .then((response) => {
        // nếu log là 201 thì là tạo thành công
        if (response.status == 201)
          alert("Thêm mới thành công");
        setName("");
        setPrice("");
        onRefresh();
      })
      .catch((err) => {  // catch để bắt lỗi ngoại lệ
        console.log(err);
      });

  }
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
    getData();
  }, []);
  const getData = () => {
    let uri = API + "tbFood";
    fetch(uri).then((res) => {
      return res.json();
    }).
      then((res_json) => {
        setList([...res_json.sort((a, b) => b.id - a.id)])
      })
  }
  useEffect(() => {
    getData();
  }, [])
  return (
    <View style={{ flex: 1, padding: 20 }}>
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
          // onPress={() => props.navigation.navigate("AddMenu")}
          onPress={() => setModalVisible(true)}
        >
          <Text>Thêm món ăn, đồ uống</Text>
        </TouchableOpacity>
        <View style={{ flexDirection: 'row', margin: 10 }}>
          <View style={{ flex: 1 }}>
            <TextInput
              placeholder='Nhập từ khóa bạn muốn tìm kiếm'
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
      </View>

      <View style={{ flex: 1 }}>
        <FlatList
          data={list}
          renderItem={({ item }) => <ItemFood Data={item} GetDataDelete={onRefresh} />}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      </View>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={{ flex: 1, justifyContent: 'flex-end' }}>
          <View style={{ backgroundColor: 'cyan', flex: 0.5, justifyContent: 'flex-end', alignItems: 'center' }}>
            <View style={{ flexDirection: 'row', marginBottom: 20 }}>
              <Image
                source={{
                  uri: 'https://cdn-icons-png.flaticon.com/512/3170/3170733.png'
                }}
                style={{ width: 40, height: 40, marginTop: 30, marginRight: 20 }}
              />
              <Text style={{ fontSize: 30, fontWeight: 'bold', marginTop: 30, marginBottom: 10 }}>Thêm thực đơn</Text>
            </View>
            <View style={{ width: 300, height: 40, backgroundColor: "white", justifyContent: 'center', padding: 10, borderRadius: 30, marginBottom: 20 }}>
              <TextInput
                placeholder='Nhập tên'
                onChangeText={(Text) => {
                  setName(Text);
                }}
              />
            </View>
            <View style={{ width: 300, height: 40, backgroundColor: "white", justifyContent: 'center', padding: 10, borderRadius: 30, marginBottom: 30 }}>
              <TextInput
                placeholder='Nhập giá'
                keyboardType='numbers-and-punctuation'
                onChangeText={(Text) => {
                  setPrice(Text);
                }}
              />
            </View>

            <View style={{ flexDirection: 'row', marginBottom: 30, width: 300 }}>
              <TouchableOpacity
                style={{ flex: 0.5, backgroundColor: 'red', padding: 10, borderRadius: 20, alignItems: 'center', marginRight: 10 }}
                onPress={() => setModalVisible(false)}
              >
                <Text style={{ color: 'white' }}>Đóng</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ flex: 0.5, backgroundColor: 'white', padding: 10, borderRadius: 20, alignItems: 'center' }}
                onPress={addFood}
              >
                <Text>Lưu</Text>
              </TouchableOpacity>

            </View>
          </View>
          <View style={{ backgroundColor: 'white', flex: 0.7, opacity: 0.7 }}></View>


        </View>

      </Modal>
    </View>

  )
}

export default ManagementMenu

const styles = StyleSheet.create({})