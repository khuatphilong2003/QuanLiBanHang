import {
  Alert,
  Image,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { API } from "./API";

const ItemUser = (props) => {
  const [visibleUpdate, setvisibleUpdate] = useState(false);
  const { id, username, fullanme, password, email, role } = props.Data;
  const [fullnameUpdate, setfullnameUpdate] = useState("");
  const [usernameUpdate, setusernameUpdate] = useState("");
  const [passUpdate, setpassUpdate] = useState("");
  const [emailUpdate, setemailUpdate] = useState("");
  const [open, setOpen] = useState(false);
  const onUpdate = () => {
    let api_url = API + "tbUsers/" + id;
    let objSP = {
      username: usernameUpdate,
      fullanme: fullnameUpdate,
      password: passUpdate,
      email: emailUpdate,
      role: "admin",
    };
    fetch(api_url, {
      method: "PUT", // POST: Thêm mới, PUT: Sửa, DELETE: xóa, GET: lấy thông tin
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(objSP),
    }).then((response) => {
      console.log(response.status);
      // nếu log là 201 thì là tạo thành công
      if (response.status == 200) alert("Sửa thành công");
    });
    props.GetDataDelete();
  };
  const onDelete = () => {
    Alert.alert("Thông báo", "Bạn có chắc chắn muốn", [
      {
        text: "Đồng ý",
        onPress: () => {
          let uri = API + "tbUsers/" + id;
          fetch(uri, {
            method: "delete",
          })
            .then((res) => {
              return res.json();
            })
            .then((res_json) => {
              alert("Xóa thành công");
            });
          props.GetDataDelete();
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
        backgroundColor: "white",
        padding: 15,
        borderRadius: 10,
        flexDirection: "row",
        marginVertical: 10,
        shadowColor: "cyan",
                  shadowOpacity: 0.26,
                  shadowOffset: { width: 0, height: 2 },
                  shadowRadius: 8,
                  elevation: 5,
      }}
    >
      {role == "admin" && (
        <View>
          <Image
            source={{
              uri: "https://cdn-icons-png.flaticon.com/128/3237/3237472.png",
            }}
            style={{ width: 50, height: 50 }}
          />
        </View>
      )}
      {role == "user" && (
        <View>
          <Image
            source={{
              uri:"https://cdn-icons-png.flaticon.com/128/9422/9422958.png"
            }}
            style={{ width: 50, height: 50 }}
          />
        </View>
      )}
      {role == "nhanvien" && (
        <View>
          <Image
            source={{
              uri:"https://cdn-icons-png.flaticon.com/128/1870/1870484.png"
            }}
            style={{ width: 50, height: 50 }}
          />
        </View>
      )}
          
     
      

      <View style={{ marginLeft: 20, flex: 1 }}>
        <Text style={{ fontSize: 20 }}>{username}</Text>
        <Text>{email}</Text>
        <Text>{role}</Text>
      </View>
      <View>
        <TouchableOpacity onPress={onDelete}>
          <Text style={{ color: "red" }}>Xóa</Text>
        </TouchableOpacity>
        <View>
          <TouchableOpacity onPress={() => setvisibleUpdate(true)}>
            <Text style={{ color: "cyan", marginTop: 10 }}>Sửa</Text>
          </TouchableOpacity>

          <Modal
            visible={visibleUpdate}
            animationType="slide"
            transparent={true}
            onRequestClose={() => setvisibleUpdate(false)}
          >
            <View
              style={{
                flex: 1,
                backgroundColor: "white",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <View></View>
              <View
                style={{
                  width: 300,
                  height: 500,
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
                    style={{
                      fontSize: 30,
                      marginBottom: 20,
                      fontWeight: "bold",
                      color: "white",
                    }}
                  >
                    Sửa tài khoản
                  </Text>
                </View>

                <View>
                  <Text>Tên tài khoản</Text>
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
                    placeholder="Nhập tên tài khoản"
                    onChangeText={(Text) => {
                      setusernameUpdate(Text);
                    }}
                  >
                    {username}
                  </TextInput>
                </View>
                <View style={{ marginTop: 10 }}>
                  <Text>Họ và tên</Text>
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
                    placeholder="Nhập họ và tên"
                    onChangeText={(Text) => {
                      setfullnameUpdate(Text);
                    }}
                  >
                    {fullanme}
                  </TextInput>
                </View>
                <View style={{ marginTop: 10 }}>
                  <Text>Email</Text>
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
                    placeholder="Nhập email"
                    onChangeText={(Text) => {
                      setemailUpdate(Text);
                    }}
                  >
                    {email}
                  </TextInput>
                </View>
                <View style={{ marginTop: 10 }}>
                  <Text>Mật khẩu</Text>
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
                    placeholder="Nhập mật khẩu"
                    onChangeText={(Text) => {
                      setpassUpdate(Text);
                    }}
                  >
                    {password}
                  </TextInput>
                </View>

                <View
                  style={{
                    flex: 1,
                    alignItems: "center",
                    marginTop: 20,
                    flexDirection: "row",
                  }}
                >
                  <TouchableOpacity
                    style={{
                      flex: 0.5,
                      height: 40,
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: 10,
                      backgroundColor: "#eee",
                      marginRight: 20,
                    }}
                    onPress={() => setvisibleUpdate(false)}
                  >
                    <Text>Đóng</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      flex: 0.5,
                      width: 200,
                      height: 40,
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: 10,
                      backgroundColor: "white",
                    }}
                    onPress={onUpdate}
                  >
                    <Text>Lưu</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        </View>
      </View>
    </View>
  );
};

export default ItemUser;

const styles = StyleSheet.create({});
