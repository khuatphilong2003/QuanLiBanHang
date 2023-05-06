import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import DropDownPicker from "react-native-dropdown-picker";
import { API } from "./API";

const AddAccount = () => {
  const [fullname, setfullname] = useState("");
  const [username, setusername] = useState("");
  const [pass, setpass] = useState("");
  const [email, setemail] = useState("");
  const [role, setrole] = useState("");
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "admin", value: "admin" },
    { label: "nhanvien", value: "nhanvien" },
    { label: "user", value: "user" },
  ]);

  const onAddUser = ()=>{
    if(username==""){
        alert("Không được bỏ trống tên tài khoản");
        return;
    }
    if(fullname == ""){
        alert("Không được bỏ trống họ và tên ");
        return;
    }
    if(email == ""){
        alert("Không được bỏ trống email");
        return;
    }
    if(pass == ""){
        alert("Không được bỏ trống mật khẩu");
        return;
    }

    let api_url = API+"tbUsers";
    let objSP = {
        
        "username":username,
        "fullanme":fullname,
        "password":pass,
        "email":email,
        "role":value
    }
    fetch(api_url , {
        method: 'POST', // POST: Thêm mới, PUT: Sửa, DELETE: xóa, GET: lấy thông tin
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

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
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
              setusernameg(Text);
            }}
          />
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
              setfullname(Text);
            }}
          />
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
              setemail(Text);
            }}
          />
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
            placeholder="Nhập tên đăng nhập"
            onChangeText={(Text) => {
              setpass(Text);
            }}
          />
        </View>
        <View style={{ marginTop: 10 }}>
          <Text>Loại tài khoản</Text>
        </View>
        <View style={{ marginTop: 10, zIndex: 1 }}>
          <DropDownPicker
            placeholder="Chọn loại tài khoản"
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
          />
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
            onPress={onAddUser}
          >
            <Text>Đăng ký</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default AddAccount;

const styles = StyleSheet.create({});
