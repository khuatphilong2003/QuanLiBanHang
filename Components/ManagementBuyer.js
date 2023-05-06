import { FlatList, RefreshControl, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import ItemUser from "./ItemUser";
import { API } from "./API";

const ManagementBuyer = (props) => {
  const [list,setList] = useState([]);
  const [search, setSearch] = useState("");
  const getSearch = () => {
    let uri = API + "tbUsers";
    fetch(uri).then((res) => { return res.json() }).then((res_json) => {
      const listSearch = res_json.filter((item) => {return item.username.includes(search)&&item.role=="user"});
      setList([...listSearch]);
    })
  }
  const getData = () => {
    let uri = API + "tbUsers?role=user";
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
          onPress={() => props.navigation.navigate("AddAccount")}
        >
          <Text>Thêm tài khoản</Text>
        </TouchableOpacity>
      </View>
      <View style={{ flexDirection: 'row', margin: 10 }}>
        <View style={{ flex: 1 }}>
          <TextInput
            placeholder='Nhập vào username nhân viên'
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
      <View style={{ flex: 1 }}>
        <FlatList
          data={list}
          renderItem={({ item }) => <ItemUser Data = {item} GetDataDelete = {onRefresh}/>}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      </View>
    </View>
  );
};

export default ManagementBuyer;

const styles = StyleSheet.create({});
