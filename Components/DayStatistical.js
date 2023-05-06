import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { API } from './API';
import ItemBill from './ItemBill';

const DayStatistical = () => {
    const [totalDay, setTotalDay] = useState(0);
    const [list, setList] = useState([]);
    const [search, setSearch] = useState("");

    const getSearch = () => {
        let uriDay = API + "tbOrder?date=" + search;
        fetch(uriDay).then((res) => { return res.json() }).then((res_json) => {
            const listSearch = res_json.filter((item) => item.date.includes(search));
            var totalOrderDay = 0;
            setList([...listSearch]);
            for (var i = 0; i < res_json.length; i++) {
                totalOrderDay += parseFloat(res_json[i].total)
            }
            setTotalDay(totalOrderDay);
        })
        if (search.length == 0) {
            let uriDay = API + "tbOrder?date=" + dateOrder;
            var totalOrderDay = 0;
            fetch(uriDay).then((res) => { return res.json() }).then((res_json) => {
                setList([...res_json]);
                for (var i = 0; i < res_json.length; i++) {
                    totalOrderDay += parseFloat(res_json[i].total)
                }
                setTotalDay(totalOrderDay);
            })
        }
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
    const StatisticalDay = () => {
        let uriDay = API + "tbOrder?date=" + dateOrder;
        var totalOrderDay = 0;
        fetch(uriDay).then((res) => { return res.json() }).then((res_json) => {
            setList([...res_json]);
            for (var i = 0; i < res_json.length; i++) {
                totalOrderDay += parseFloat(res_json[i].total)
            }
            setTotalDay(totalOrderDay);
        })
    }
    useEffect(() => {
        StatisticalDay();
    }, [])
    return (
        <View style={{ flex: 1, padding: 20 }}>
            <View style={{ flexDirection: 'row', margin: 10, marginBottom: 50 }}>
                <View style={{ flex: 1 }}>
                    <TextInput
                        placeholder='Nhập vào ngày (yyyy/mm/d)'
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
            <View style={{ alignItems: 'flex-end' }}>
                <Text>Tổng tiền: {totalDay}vnđ</Text>
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

export default DayStatistical

const styles = StyleSheet.create({})