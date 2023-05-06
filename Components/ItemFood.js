import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { API } from './API';

const ItemFood = (props) => {
    const {name,price,id} = props.Data;
    const deleteFood = ()=>{
        var uri = API+"tbFood/"+id ;
        console.log(id);
        Alert.alert("Thông báo","Bạn có chắc chắn muốn xóa",[
            {
                text:"Đồng ý",
                onPress: ()=>{
                    fetch(uri,{
                        method:'delete'
                    }).then((res)=>{return res.json()}).then((res_json)=>{
                        alert("Xóa thành công");
                    });
                    props.GetDataDelete();
                }
            },
            {
                text:"Hủy"
            }
        ])
    }
    return (
        <View style={{
            backgroundColor: 'white',
            shadowColor: "cyan",
            shadowOpacity: 0.26,
            shadowOffset: { width: 0, height: 2 },
            shadowRadius: 8,
            elevation: 5,
            padding: 5,
            borderRadius: 10,
            flexDirection:'row',
            margin:10
        }}>
            <View>
                <Image
                    source={{
                        uri: 'data:image/png;base64,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'

                    }}
                    style={{
                        height: 50,
                        width: 50,
                        marginRight:10
                    }}
                />
            </View>

            <View style={{flex:1}}>
                <View style={{marginTop:10}}>
                <Text style={{fontSize:20,fontWeight:'bold'}}>{name}</Text>
                </View>
                <View>
                <Text style={{marginTop:10}}>{price} vnd</Text>
            </View>
            </View>
            <View style={{marginRight:10}}>
                <TouchableOpacity
                onPress={deleteFood}
                >
                    <Text>Xóa</Text>
                </TouchableOpacity>
            </View>
           
        </View>
    )
}

export default ItemFood

const styles = StyleSheet.create({})