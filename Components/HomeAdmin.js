import {
  Alert,
  Image,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API } from './API';


const HomeAdmin = (props) => {
  const [fullanme, setfullanme] = useState("");
  const [dayOrder, setDayOrder] = useState("");
  const [listOrdeMonth, setListOrderMonth] = useState([]);
  const [role, setRole] = useState("");
  const [totalDay, setTotalDay] = useState(0);
  const [totalMonth, setTotalMonth] = useState(0);
  const [totalYear, setTotalYear] = useState(0);
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1;
  const day = currentDate.getDate();
  var dateOrder;
  if (month > 9) {
    dateOrder = year + '/' + month + "/" + day;
  }
  else {
    dateOrder = year + '/0' + month + "/" + day;
  }
  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
    StatisticalDay();
    StatisticalMonth();
    StatisticalYear();
  }, []);

  const StatisticalDay = () => {
    let uriDay = API + "tbOrder?date=" + dateOrder;
    var totalOrderDay = 0;
    fetch(uriDay).then((res) => { return res.json() }).then((res_json) => {
      for (var i = 0; i < res_json.length; i++) {
        totalOrderDay += parseFloat(res_json[i].total)
      }
      setTotalDay(totalOrderDay);
    })

    setDayOrder(dateOrder);
  }
  const StatisticalMonth = () => {
    let uriMonth = API + "tbOrder";
    let orderMonth = year + "/" + month;
    var totalOrderMonth = 0;
    fetch(uriMonth).then((res) => { return res.json() }).then((res_json) => {
      console.log(res_json.length);
      let getMonthCurrent;
      if (month > 9) {
        getMonthCurrent = year + '/' + month;
      }
      else {
        getMonthCurrent = year + '/0' + month;
      }
      let list = res_json.filter((item) =>
        item.date.substring(0, 7) == getMonthCurrent
      )
      for (var i = 0; i < list.length; i++) {
        totalOrderMonth += parseFloat(list[i].total)
      }
      setTotalMonth(totalOrderMonth);
    })
  }

  const StatisticalYear = () => {
    let uriYear = API + "tbOrder";
    var totalOrderYear = 0;
    fetch(uriYear).then((res) => { return res.json() }).then((res_json) => {
      let list = res_json.filter((item) =>
        item.date.substring(0, 4) == year
      )
      for (var i = 0; i < list.length; i++) {
        totalOrderYear += parseFloat(list[i].total)
      }
      setTotalYear(totalOrderYear);
    })
  }

  const getDataUser = async () => {
    const jsonValue = await AsyncStorage.getItem("ObjAdmin");
    const objU = JSON.parse(jsonValue);
    setfullanme(objU.fullanme);
    setRole(objU.role);

  };
  useEffect(() => {
    getDataUser();
    StatisticalMonth();
    StatisticalDay();
    StatisticalYear();
  }, []);
  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={{ backgroundColor: 'cyan' }}>
        <View style={{ alignItems: 'flex-end', marginRight: 10 }}>
          <TouchableOpacity
          onPress={()=>
          Alert.alert("Thông báo","Bạn có chắc chắn muốn đăng xuất",[
            {
              text:"Đồng ý",
              onPress:()=>props.navigation.navigate("Login")
            },
            {
              text:"Đóng"
            }
          ])
          }
          >
            <Image
              source={require("../Image/logout.png")}
              style={{
                width: 20,
                height: 20, marginBottom: 10
              }}
            />
          </TouchableOpacity>

        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>

          <Image
            source={{ uri: 'https://cdn-icons-png.flaticon.com/512/3170/3170733.png' }}
            style={{ width: 40, height: 40 }}
          />
          <Text style={{ marginLeft: 10, fontSize: 25, fontWeight: 'bold' }}>
            Food and Drink
          </Text>
        </View>
        <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 15 }}>
          <Text style={{ fontSize: 20 }}>
            Xin chào,
          </Text>
          <Text style={{ fontSize: 40, fontWeight: 'bold' }}>{fullanme}</Text>
          <Text style={{ marginBottom: 10 }}>{role}</Text>

        </View>
      </View>
      <Text style={{ marginTop: 30, marginLeft: 15, fontSize: 18, fontWeight: 'bold' }}>
        Tính năng quản lí
      </Text>
      <View style={{ flexDirection: 'row', padding: 15, justifyContent: 'center', alignItems: 'center' }}>
        <TouchableOpacity style={{
          shadowColor: "black",
          shadowOpacity: 0.26,
          shadowOffset: { width: 0, height: 2 },
          shadowRadius: 8,
          elevation: 5,
          width: 100, borderRadius: 10, height: 100, marginRight: 25, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center'
        }}
          onPress={() => props.navigation.navigate("ManagementOrder")}
        >
          <Image
            source={require('../Image/bill.png')}
            style={{ width: 30, height: 30, marginBottom: 5 }}
          />
          <Text style={{ fontWeight: 'bold' }}>Hóa đơn</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{
          shadowColor: "black",
          shadowOpacity: 0.26,
          shadowOffset: { width: 0, height: 2 },
          shadowRadius: 8,
          elevation: 5,
          width: 100, borderRadius: 10, height: 100, marginRight: 25, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center'
        }}
          onPress={() => props.navigation.navigate("ManagementMenu")}
        >
          <Image
            source={require('../Image/menu.png')}
            style={{ width: 30, height: 30, marginBottom: 5 }}
          />
          <Text style={{ fontWeight: 'bold' }}>Menu</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{
          shadowColor: "black",
          shadowOpacity: 0.26,
          shadowOffset: { width: 0, height: 2 },
          shadowRadius: 8,
          elevation: 5,
          width: 100, borderRadius: 10, height: 100, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center'
        }}
          onPress={() => props.navigation.navigate("ManagementTable")}

        >
          <Image
            source={require('../Image/table.png')}
            style={{ width: 30, height: 30, marginBottom: 5 }}
          />
          <Text style={{ fontWeight: 'bold' }}>Bàn ăn</Text>
        </TouchableOpacity>
      </View>
      <View style={{ flexDirection: 'row', padding: 15, justifyContent: 'center', alignItems: 'center' }}>
        <TouchableOpacity style={{
          shadowColor: "black",
          shadowOpacity: 0.26,
          shadowOffset: { width: 0, height: 2 },
          shadowRadius: 8,
          elevation: 5,
          width: 100, borderRadius: 10, height: 100, marginRight: 25, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center'
        }}
          onPress={() => props.navigation.navigate("ManagementAccount")}

        >
          <Image
            source={require('../Image/user.png')}
            style={{ width: 30, height: 30, marginBottom: 5 }}
          />
          <Text style={{ fontWeight: 'bold' }}>Tài khoản</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{
          shadowColor: "black",
          shadowOpacity: 0.26,
          shadowOffset: { width: 0, height: 2 },
          shadowRadius: 8,
          elevation: 5,
          width: 100, borderRadius: 10, height: 100, marginRight: 25, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center'
        }}
          onPress={() => props.navigation.navigate("ManagementBuyer")}

        >
          <Image
            source={require('../Image/staff.png')}
            style={{ width: 30, height: 30, marginBottom: 5 }}
          />
          <Text style={{ fontWeight: 'bold' }}>Khách hàng</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{
          shadowColor: "black",
          shadowOpacity: 0.26,
          shadowOffset: { width: 0, height: 2 },
          shadowRadius: 8,
          elevation: 5,
          width: 100, borderRadius: 10, height: 100, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center'
        }}
          onPress={() => props.navigation.navigate("ManagementStaff")}

        >
          <Image
            source={require('../Image/buyer.png')}
            style={{ width: 30, height: 30, marginBottom: 5 }}
          />
          <Text style={{ fontWeight: 'bold' }}>Nhân viên</Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >


        <Text style={{ marginTop: 10, marginLeft: 15, fontSize: 18, fontWeight: 'bold' }}>
          Tính năng quản lí
        </Text>
        <View style={{
          backgroundColor: "white", height: 100, shadowColor: "black",
          shadowOpacity: 0.26,
          shadowOffset: { width: 0, height: 2 },
          shadowRadius: 8,
          elevation: 5,
          padding: 10,
          margin: 15,
          borderRadius: 10,
          flexDirection: 'row'
        }}>
          <Image
            source={
              require('../Image/profit-up.png')
            }
            style={{ width: 60, height: 60 }}
          />
          <View style={{ flex: 1 }}>
            <Text style={{ marginLeft: 20, fontSize: 20 }}>Doanh thu theo ngày</Text>
            <Text style={{ marginLeft: 21, marginTop: 2 }}>{dateOrder}</Text>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ marginLeft: 21, fontSize: 25, color: 'cyan' }}>{totalDay}</Text>
              <Text style={{ marginTop: 10, marginLeft: 5, color: 'gray' }}>vnđ</Text>
            </View>
          </View>
          <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center' }}
          onPress={()=>props.navigation.navigate("DayStatistical")}
          >
            <Image
              source={require('../Image/right.png')}
              style={{ width: 20, height: 20, marginRight: 10 }}
            />

          </TouchableOpacity>

        </View>
        <View style={{
          backgroundColor: "white", height: 100, shadowColor: "black",
          shadowOpacity: 0.26,
          shadowOffset: { width: 0, height: 2 },
          shadowRadius: 8,
          elevation: 5,
          padding: 10,
          margin: 15,
          borderRadius: 10,
          flexDirection: 'row'
        }}>
          <Image
            source={
              require('../Image/profit-up.png')
            }
            style={{ width: 60, height: 60 }}
          />
          <View style={{ flex: 1 }}>
            <Text style={{ marginLeft: 20, fontSize: 20 }}>Doanh thu theo tháng</Text>
            <Text style={{ marginLeft: 21, marginTop: 2 }}>{dateOrder}</Text>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ marginLeft: 21, fontSize: 25, color: 'cyan' }}>{totalMonth}</Text>
              <Text style={{ marginTop: 10, marginLeft: 5, color: 'gray' }}>vnđ</Text>
            </View>
          </View>
          <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center' }}
          onPress={()=>props.navigation.navigate("MonthStatistical")}
          >

            <Image
              source={require('../Image/right.png')}
              style={{ width: 20, height: 20, marginRight: 10 }}
            />

          </TouchableOpacity>

        </View>

        <View style={{
          backgroundColor: "white", height: 100, shadowColor: "black",
          shadowOpacity: 0.26,
          shadowOffset: { width: 0, height: 2 },
          shadowRadius: 8,
          elevation: 5,
          padding: 10,
          margin: 15,
          borderRadius: 10,
          flexDirection: 'row'
        }}>
          <Image
            source={
              require('../Image/profit-up.png')
            }
            style={{ width: 60, height: 60 }}
          />
          <View style={{ flex: 1 }}>
            <Text style={{ marginLeft: 20, fontSize: 20 }}>Doanh thu theo năm</Text>
            <Text style={{ marginLeft: 21, marginTop: 2 }}>{dateOrder}</Text>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ marginLeft: 21, fontSize: 25, color: 'cyan' }}>{totalYear}</Text>
              <Text style={{ marginTop: 10, marginLeft: 5, color: 'gray' }}>vnđ</Text>
            </View>
          </View>
          <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center' }}
          onPress={()=>props.navigation.navigate("YearStatistical")}
          >
            
            <Image
              source={require('../Image/right.png')}
              style={{ width: 20, height: 20, marginRight: 10 }}
            />

          </TouchableOpacity>

        </View>
      </ScrollView>

    </View>
  );
};

export default HomeAdmin;

const styles = StyleSheet.create({});
