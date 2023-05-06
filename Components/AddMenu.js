import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { API } from "./API";


const AddMenu = () => {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const addFood = () => {
        var uri = API + "tbFood"
        console.log(uri);
        var objSP = {
            "name": name,
            "price": price
        }
        fetch(uri, {
            method: 'POST', // POST: Thêm mới, PUT: Sửa, DELETE: xóa, GET: lấy thông tin
            headers: { // Định dạng dữ liệu gửi đi
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(objSP) // chuyển đối tượng SP thành chuỗi JSON
        })
            .then((response) => {
                console.log(objSP);
                console.log(response.status);
                // nếu log là 201 thì là tạo thành công
                if (response.status == 201)
                    alert("Thêm mới thành công");
            })
            .catch((err) => {  // catch để bắt lỗi ngoại lệ
                console.log(err);
            });

    }










    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <View
                style={{
                    width: 300,
                    height: 300,
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
                    <Text>Tên món ăn đồ uống</Text>
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
                        placeholder="Nhập...."
                        onChangeText={(Text) => {
                            setName(Text);
                        }}
                    />
                </View>
                <View style={{ marginTop: 20 }}>
                    <Text>Giá món ăn đồ uống</Text>
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
                        placeholder="Nhập...."
                        onChangeText={(Text) => {
                            setPrice(Text);
                        }}
                    />
                </View>




                <View style={{ flex: 1, alignItems: "center", marginTop: 40 }}>
                    <TouchableOpacity
                        style={{
                            width: 200,
                            height: 40,
                            justifyContent: "center",
                            alignItems: "center",
                            borderRadius: 10,
                            backgroundColor: "white",
                        }}
                        onPress={addFood}
                    >
                        <Text>Lưu</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );

}

export default AddMenu

const styles = StyleSheet.create({})