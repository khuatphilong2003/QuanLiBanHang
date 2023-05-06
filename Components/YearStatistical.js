import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import { useState } from 'react';
import { API } from './API';
import ItemBill from './ItemBill';

const YearStatistical = () => {
  const [totalYear, setTotalYear] = useState(0);
  const [list, setList] = useState([]);
  const [search, setSearch] = useState("");

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
  const getSearch = () => {
    let uriMonth = API + "tbOrder";
    fetch(uriMonth).then((res) => { return res.json() }).then((res_json) => {
      let listYear = res_json.filter((item) =>
        item.date.substring(0, 4) == search
      )
      for (var i = 0; i < listYear.length; i++) {
        totalOrderYear += parseFloat(listYear[i].total)
      }
      setTotalYear(totalOrderYear);
      setList([...listYear]);
      if (search.length == 0) {
        let uriYear = API + "tbOrder";
        var totalOrderYear = 0;
        fetch(uriYear).then((res) => { return res.json() }).then((res_json) => {
          let listYear = res_json.filter((item) =>
            item.date.substring(0, 4) == year
          )
          for (var i = 0; i < listYear.length; i++) {
            totalOrderYear += parseFloat(listYear[i].total)
          }
          setTotalYear(totalOrderYear);
          setList([...listYear]);
        })
      }
    })
  }

  const StatisticalYear = () => {
    let uriYear = API + "tbOrder";
    var totalOrderYear = 0;
    fetch(uriYear).then((res) => { return res.json() }).then((res_json) => {
      let listYear = res_json.filter((item) =>
        item.date.substring(0, 4) == year
      )
      for (var i = 0; i < listYear.length; i++) {
        totalOrderYear += parseFloat(listYear[i].total)
      }
      setTotalYear(totalOrderYear);
      setList([...listYear]);
    })
  }
  useEffect(() => {
    StatisticalYear();
  }, [])

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <View style={{ flexDirection: 'row', margin: 10, marginBottom: 50 }}>
        <View style={{ flex: 1 }}>
          <TextInput
            placeholder='Nhập vào ngày (yyyy)'
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
      <Text>YearStatistical</Text>
      <View style={{ alignItems: 'flex-end' }}>
        <Text>Tổng tiền: {totalYear}vnđ</Text>
      </View>
      <View style={{ flex: 1 }}>

        <FlatList
          data={list}
          renderItem={({ item }) => <ItemBill item={item} />}

        />
      </View>
    </View >
  )
}

export default YearStatistical

const styles = StyleSheet.create({})