import { FlatList, Image, Modal, RefreshControl, SafeAreaView, StyleSheet, Switch, Text, TextInput, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { API } from "./API";
import ItemTable from "./ItemTable";

const ManagementTable = (props) => {
  const [list, setList] = useState([]);
  const [search, setSearch] = useState("");
  const [name, setName] = useState("");
  const [isEnable, setIsEnable] = useState(false);
  const tongleEnale = (value) => {
    setIsEnable(value);
  };
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
        onRefresh();
   
    })
  }
  const [modalVisible, setModalVisible] = useState(false);
  const getSearch = () => {
    let uri = API + "tbTable";
    fetch(uri).then((res) => { return res.json() }).then((res_json) => {
      const listSearch = res_json.filter((item) => item.name.includes(search));
      setList([...listSearch]);
    })
  }
  const getData = () => {
    let uri = API + "tbTable";
    fetch(uri)
      .then((res) => {
        return res.json();
      })
      .then((res_json) => {
        setList([...res_json]);
        console.log(res_json.length);
      });
  };
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
    getData();
  }, []);
  useEffect(() => {
    getData();
  }, []);
  return (
    <SafeAreaView style={{ flex: 1, padding: 20 }}>
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
          onPress={() => setModalVisible(true)}
        >
          <Text>Thêm bàn</Text>
        </TouchableOpacity>
      </View>
      <View style={{ flexDirection: 'row', margin: 10 }}>
        <View style={{ flex: 1 }}>
          <TextInput
            placeholder='Nhập vào tên bàn'
            style={{ height: 30 }}
            onChangeText={(Text) => setSearch(Text)}
          />
          <View style={{ backgroundColor: "gray", height: 1 }}></View>
        </View>
        <TouchableOpacity
          style={{ backgroundColor: "cyan", justifyContent: 'center', alignItems: 'center', padding: 5, marginLeft: 10, borderRadius: 10, flex: 0.3 }}
          onPress={getSearch}
        >
          <Text>Tìm kiếm</Text>
        </TouchableOpacity>

      </View>
      <View>
        <FlatList
          data={list}
          renderItem={({ item }) =>
            <ItemTable Data={item} GetData={getData} />
          }
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
                style={{ width: 40, height: 40, marginTop: 30, marginRight: 30 }}
              />
              <Text style={{ fontSize: 30, fontWeight: 'bold', marginTop: 30, marginBottom: 10 }}>Thêm bàn</Text>
            </View>
            <View style={{ width: 300, height: 40, backgroundColor: "white", justifyContent: 'center', padding: 10, borderRadius: 30, marginBottom: 20 }}>
              <TextInput
                placeholder='Nhập tên bàn'
                onChangeText={(Text) => {
                  setName(Text);
                }}
              />
            </View>
              <Text>
                Trạng thái bàn
              </Text>
            <View>
              <Switch onValueChange={tongleEnale} value={isEnable} />
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
              onPress={onAddTable}
              >
                <Text>Lưu</Text>
              </TouchableOpacity>

            </View>
          </View>
          <View style={{ backgroundColor: 'white', flex: 0.7, opacity: 0.7 }}></View>


        </View>

      </Modal>
    </SafeAreaView>
  );
};

export default ManagementTable;

const styles = StyleSheet.create({});
