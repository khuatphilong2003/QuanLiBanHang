import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { Image } from "react-native";
import { API } from "./API";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Login = (props) => {
  const [username, setUsername] = useState("");
  const [pass, setPass] = useState("");
  const [errorUsername,setErrorUsername] = useState("");
  const [errorPassWord,setErrorPassWord] = useState("");

  const onLogin = () => {
    if (username == "") {
      alert("Tên đăng nhập không được bỏ trống");
      return;
    }
    if (pass == "") {
      alert("Mật khẩu không được bỏ trống");
      return;
    }

    const uri = API + "tbUsers?username="+username;
    fetch(uri)
      .then((res) => {
        return res.json();
      })
      .then( async (res_json) => {
        if(res_json.length==0){
            alert("Tài khoản không tồn tại");
            return;
        }
        const objU = res_json[0];
        if(pass != objU.password){
            alert("Mật khẩu không đúng");
            return;
        }
        if(objU.role == "admin"){
            props.navigation.navigate("HomeAdmin");
            await AsyncStorage.setItem("ObjAdmin",JSON.stringify(objU));
        }
        if(objU.role == "nhanvien"){
            props.navigation.navigate("HomeAdmin");
            await AsyncStorage.setItem("ObjAdmin",JSON.stringify(objU));
        }
        if(objU.role == "user"){
            props.navigation.navigate("HomeUser");
            await AsyncStorage.setItem("ObjUser",JSON.stringify(objU));
        }
      });
  };
  return (
    <View style={{flex:1}}>
       <View style={{height:300,backgroundColor:'cyan',borderBottomLeftRadius:200}}>
      </View>
      <View style={{zIndex:1,flex:1,position: 'absolute',justifyContent:'center',alignItems:'center', top: 0, left: 0, right: 0, bottom: 0}}>
      <Image
        source={{uri:'https://cdn-icons-png.flaticon.com/512/3170/3170733.png'}}
        style={{ width: 100, height: 100}}
      />
      <View style={{ marginTop: 20 }}>
        <Text style={{ fontSize: 50, fontWeight: "bold" }}>Đăng nhập</Text>
      </View>
      <View>
        <View
          style={{
            width: 350,
            marginTop: 20,
            alignItems: "center",
            paddingLeft: 10,
            borderRadius: 10,
            height: 50,
            backgroundColor: "#eee",
            flexDirection: "row",
            shadowColor: "black",
                  shadowOpacity: 0.26,
                  shadowOffset: { width: 0, height: 2 },
                  shadowRadius: 8,
                  elevation: 5,
          }}
        >
          <Image
            source={require("../Image/userLogin.png")}
            style={{ width: 15, height: 15, marginRight: 10}}
          />
          <TextInput style={{height:50,flex:1}} placeholder="Tên tài khoản" onChangeText={(Text)=>{
            setUsername(Text);
            setErrorUsername("");
          }}/>
         
        </View>
        <Text style={{margin:5,color:'red'}}>{errorUsername}</Text>
      </View>
      <View>
        <View
          style={{
            width: 350,
            marginTop: 10,
            alignItems: "center",
            paddingLeft: 10,
            borderRadius: 10,
            height: 50,
            backgroundColor: "#eee",
            flexDirection: "row",
            shadowColor: "black",
                  shadowOpacity: 0.26,
                  shadowOffset: { width: 0, height: 2 },
                  shadowRadius: 8,
                  elevation: 5,
          }}
        >
          <Image
            source={require("../Image/lock.png")}
            style={{ width: 15, height: 15, marginRight: 10 }}
          />
          <TextInput style={{height:50,flex:1}} secureTextEntry={true}  placeholder="Mật khẩu" onChangeText={(Text)=>{
            setPass(Text);
            setErrorPassWord("");

          }}/>
        </View>
        <Text style={{margin:5,color:'red'}}>{errorPassWord}</Text>
      </View>
      <TouchableOpacity
        style={{
          width: 350,
          height: 50,
          marginTop: 40,
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 40,
          backgroundColor: "cyan",
          shadowColor: "black",
                  shadowOpacity: 0.26,
                  shadowOffset: { width: 0, height: 2 },
                  shadowRadius: 8,
                  elevation: 5,
        }}
        onPress={onLogin}
      >
        <Text style={{}}>Đăng nhập</Text>
      </TouchableOpacity>
      </View>
  
      
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({});
