import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import { useState } from 'react';
import { API } from './API';
import ItemBill from './ItemBill';

const MonthStatistical = () => {
    const [totalMonth, setTotalMonth] = useState(0);
    const [list, setList] = useState([]);
    const [search, setSearch] = useState("");

    const getSearch = () => {
        let uriMonth = API + "tbOrder";
        fetch(uriMonth).then((res) => { return res.json() }).then((res_json) => {
            var totalOrderMonth = 0;
            let listMonth = res_json.filter((item) =>
                item.date.substring(0, 7) == search
            )
            for (var i = 0; i < listMonth.length; i++) {
                totalOrderMonth += parseFloat(listMonth[i].total)
            }
            setTotalMonth(totalOrderMonth);
            setList([...listMonth]);
            if(search.length == 0){
                let uriMonth = API + "tbOrder";
        var totalOrderMonth = 0;
        fetch(uriMonth).then((res) => { return res.json() }).then((res_json) => {

            let getMonthCurrent;
            if (month > 9) {
                getMonthCurrent = year + '/' + month;
            }
            else {
                getMonthCurrent = year + '/0' + month;
            }
            let listMonth = res_json.filter((item) =>
                item.date.substring(0, 7) == getMonthCurrent
            )
            for (var i = 0; i < listMonth.length; i++) {
                totalOrderMonth += parseFloat(listMonth[i].total)
            }
            setTotalMonth(totalOrderMonth);
            setList([...listMonth]);
        })
            }
        })
    }
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
    const StatisticalMonth = () => {
        let uriMonth = API + "tbOrder";
        var totalOrderMonth = 0;
        fetch(uriMonth).then((res) => { return res.json() }).then((res_json) => {

            let getMonthCurrent;
            if (month > 9) {
                getMonthCurrent = year + '/' + month;
            }
            else {
                getMonthCurrent = year + '/0' + month;
            }
            let listMonth = res_json.filter((item) =>
                item.date.substring(0, 7) == getMonthCurrent
            )
            for (var i = 0; i < listMonth.length; i++) {
                totalOrderMonth += parseFloat(listMonth[i].total)
            }
            setTotalMonth(totalOrderMonth);
            setList([...listMonth]);
        })
    }

    useEffect(() => {
        StatisticalMonth();
    }, [])

    return (
        <View style={{flex:1,padding:20}}>
             <View style={{ flexDirection: 'row', margin: 10, marginBottom: 50 }}>
                <View style={{ flex: 1 }}>
                    <TextInput
                        placeholder='Nhập vào ngày (yyyy/mm)'
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
            <View style={{ alignItems: 'flex-end'}}>
                <Text>Tổng tiền: {totalMonth}vnđ</Text>
            </View>
            <View style={{ flex: 1 }}>
                <FlatList
                    data={list}
                    renderItem={({ item }) => <ItemBill item={item} />}
                />
            </View>
        </View>
    )
}

export default MonthStatistical

const styles = StyleSheet.create({})