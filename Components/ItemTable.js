import {
  Alert,
  Image,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { API } from "./API";
import { Modal } from "react-native";

const ItemTable = (props) => {
  const [visibleUpdate, setVisibleUpdate] = useState(false);
  const [nameUpdate, setnameUpdate] = useState("");
  const tongleEnale = (value) => {
    setIsEnable(value);
  };
  const onAddTable = () => {
    let uri = API + "tbTable/" + id;
    let objSP = {
      name: nameUpdate,
      status: isEnable == false ? "Trống" : "Không trống",
    };
    fetch(uri, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(objSP),
    }).then((response) => {
      
      if (response.status == 200) alert("Sửa mới thành công");
    });
    props.GetData();
    setVisibleUpdate(false);
  };

  const [isEnable, setIsEnable] = useState(status == "Không trống"?"true":"false");

  const { name, id, status } = props.Data;
  const onDelete = () => {
    Alert.alert("Thông báo", "Bạn có chắc chắc muốn xóa", [
      {
        text: "Đồng ý",
        onPress: () => {
          let uri = API + "tbTable/" + id;
          fetch(uri, {
            method: "Delete",
          })
            .then((res) => {
              return res.json();
            })
            .then((res_json) => {
              alert("Xóa thành công");
            });
          props.GetData();
        },
      },
      {
        text: "Đóng",
      },
    ]);
  };
  return (
    <View
      style={{
        shadowColor: "cyan",
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 5,
        backgroundColor: "white",
        padding: 20,
        borderRadius: 10,
        margin: 10,
      }}
    >
      <View style={{ flexDirection: "row" }}>
        <Image
          source={{
            uri: "https://cdn-icons-png.flaticon.com/128/2251/2251855.png",
          }}
          style={{
            width: 50,
            height: 50,
          }}
        />
        <View style={{ flex: 1 }}>
          <Text style={{ marginLeft: 20, fontSize: 20 }}>{name}</Text>
          <Text
            style={{
              marginLeft: 20,
              color: status == "Trống" ? "cyan" : "red",
            }}
          >
            {status}
          </Text>
        </View>
        <View>
          <TouchableOpacity onPress={onDelete}>
            <Text style={{ color: "red", marginBottom: 10 }}>Xóa</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setVisibleUpdate(true)}>
            <Text style={{ color: "cyan" }}>Sửa</Text>
          </TouchableOpacity>
          <View>
            <Modal
              visible={visibleUpdate}
              animationType="slide"
              transparent={true}
              onRequestClose={() => setVisibleUpdate(false)}
            >
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  flex: 1,
                  backgroundColor: "white",
                }}
              >
                <View
                  style={{
                    width: 300,
                    height: 320,
                    backgroundColor: "cyan",
                    padding: 20,
                    shadowColor: "black",
                    shadowOpacity: 0.26,
                    shadowOffset: { width: 0, height: 2 },
                    shadowRadius: 8,
                    elevation: 5,
                  }}
                >
                  <View style={{ alignItems: "center" }}>
                    <Text
                      style={{ fontSize: 30, marginBottom: 20, color: "white" }}
                    >
                      Sửa bàn
                    </Text>
                  </View>
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
                        setnameUpdate(Text);
                      }}
                    >
                      {name}
                    </TextInput>
                  </View>
                  <View style={{ marginTop: 20 }}>
                    <Text>Trạng thái bàn</Text>
                  </View>
                  <View>
                    <Switch onValueChange={tongleEnale} value={isEnable} />
                  </View>

                  <View
                    style={{ flex: 1, alignItems: "center", marginTop: 20 }}
                  >
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
            </Modal>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ItemTable;

const styles = StyleSheet.create({});
