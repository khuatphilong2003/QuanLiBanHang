import { Alert, BackHandler, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import DropDownPicker from 'react-native-dropdown-picker';
import { API } from './API';
import { FlatList } from 'react-native-gesture-handler';
import ItemOrder from './ItemOrder';
import { color } from 'react-native-elements/dist/helpers';
import listOrder from './ListOrder';

const AddOrder = (props) => {

  const [open, setOpen] = useState(false);// Lưu trạng thái của dropdow
  const [value, setValue] = useState("");// Lưu giá trị của dropdow
  const [listTable, setListTable] = useState([]);
  const [listFood, setListFood] = useState([]);
  const getListFood = () => {
    let uri_food = API + "tbFood";
    fetch(uri_food).then((res) => { return res.json() }).then((res_json) => { setListFood([...res_json]) })
  }
  const getListTable = () => {
    let uri_table = API + "tbTable?status=Trống"
    fetch(uri_table).then((res) => { return res.json() }).then((res_json) => {
      setListTable([...res_json]);
    })
  }
  const currentDate = new Date();

  const addOrder = () => {
    let uri = API + "tbOrder"
    if(value.length == 0){
      alert("Bạn chưa chọn bàn đặt hàng");
      return;
    }
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    const day = currentDate.getDate();
    var dateOrder;
    if(month>9){
      dateOrder =   year+ "/"+ month + '/'+ day;
    }
    else{
      dateOrder =   year+ "/0"+ month + '/'+ day;
    }
     
    // const second = currentDate.getSeconds();
    const hour = currentDate.getHours();
    const minute = currentDate.getMinutes();
    const timeOrder = hour + ":" + minute;
    console.log(dateOrder+"......"+timeOrder);
    var total = 0;
    for(var i=0;i<listOrder.length;i++){
      total += parseFloat(listOrder[i].price)*listOrder[i].quantity;
    }
    const objOrder = {
      tableId: value,
      date: dateOrder,
      time: timeOrder,
      items: listOrder,
      total:total
    }
    fetch(uri, {
      method: 'POST', // POST: Thêm mới, PUT: Sửa, DELETE: xóa, GET: lấy thông tin
      headers: { // Định dạng dữ liệu gửi đi
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(objOrder) // chuyển đối tượng SP thành chuỗi JSON
    })
      .then((response) => {
        let updateTalbe = API + "tbTable/" + value;
        let uriTableOrder = API + "tbTable?id=" + value;
        let objTableOrder;
        fetch(uriTableOrder).then((res) => { return res.json() }).then((res_json) => {
          objTableOrder = res_json[0];
          const objTable = {
            name: objTableOrder.name,
            status: "Không trống"
          }
          if (response.status == 201)

            fetch(updateTalbe, {
              method: "PUT",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
              body: JSON.stringify(objTable),
            }).then((response) => {

              if (response.status == 200) {
                listOrder.splice(0, listOrder.length);
                Alert.alert("Thông báo","Tổng tiền đơn hàng đặt: "+total+"vnd",[
                  {
                    text:"Về trang chủ",
                    onPress:()=>{
                      props.navigation.navigate("HomeAdmin");
                    }
                  }
                ])
              }
            })

        });
      })
      .catch((err) => {  // catch để bắt lỗi ngoại lệ
        console.log(err);
      });
  }
  var noDataText = "Không còn bàn trống"
  useEffect(() => {
    getListTable();
    getListFood();
    const handelBackPress = () => {
      listOrder.splice(0, listOrder.length);
      props.navigation.navigate('HomeAdmin');
      console.log(listOrder.length);
      return true;
    }
    BackHandler.addEventListener('hardwareBackPress', handelBackPress);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handelBackPress);
    };
    

  }, [])
  return (
    <View style={{ padding: 10, flex: 1 }}>

      <View style={{ zIndex: 1 }}>
        <Text style={{ fontSize: 20 }}>Bàn số</Text>
        <View style={{ marginTop: 10, zIndex: 3 }} >
          <DropDownPicker
            placeholder='Chọn bàn đặt hàng'
            open={open}
            value={value}
            items={listTable.map((item) => ({
              label: item.name,
              value: item.id,
            }))}
            noDataText={noDataText}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setListTable}
          
            
          />
        </View>
      </View>
      <View style={{ marginTop: 10,justifyContent:'center',alignItems:'center' }}>
        <Text style={{margin:10,fontSize:25,fontWeight:'bold'}}>Danh sách đồ uống và đồ ăn</Text>
      </View>
      <View style={{ flex: 1 }}>
        <FlatList
          data={listFood}
          renderItem={({ item }) => <ItemOrder Data={item} />}
        />
      </View>
      <View>
        <TouchableOpacity
          style={{
            backgroundColor: "cyan",
            padding: 10,
            borderRadius: 10,
            alignItems: "center",
          }}
          onPress={() => {
            addOrder();
          }}
        >
          <Text>Đặt hàng</Text>

        </TouchableOpacity>
      </View>

    </View>
  )
}

export default AddOrder

const styles = StyleSheet.create({})