import { Alert, FlatList, Image, Modal, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { API } from './API';
import ItemFoodDetail from './ItemFoodDetail';

const ItemBill = (props) => {
  const { id, date, time, items, total } = props.item;
  const [modalVisible, setModalVisible] = useState(false);
  const [list, setList] = useState([]);
  const getData = () => {
    setList([...items]);
  }
  useEffect(() => {
    getData();
  }, [])

  return (
    <View style={{
      backgroundColor: 'white', padding: 10, borderRadius: 10, marginVertical: 5, shadowColor: "cyan",
      shadowOpacity: 0.26,
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 8,
      elevation: 5,
    }}>


      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}>
          <View style={{
            flex: 1, justifyContent: 'center', alignItems: 'center'
          }}>
            <View style={{
              backgroundColor: 'white', width: 300, shadowColor: "black",
              shadowOpacity: 0.26,
              backgroundColor: 'white',
              shadowOffset: { width: 0, height: 2 },
              shadowRadius: 8,
              elevation: 5,
              borderRadius: 10
            }}>
              <View style={{ justifyContent: 'center', alignItems: 'center', borderTopLeftRadius: 10, borderTopRightRadius: 10, padding: 10, backgroundColor: 'cyan' }}>
                <Text style={{ fontSize: 20,fontWeight:'bold'}}>Chi tiết đơn hàng</Text>
              </View>
              <View>
                <View>
                <Text style={{marginLeft:10,marginTop:5,color:'gray'}}>Id: {id}</Text>
                  <Text style={{marginLeft:10,marginTop:2,color:'gray'}}>Ngày đặt: {date}</Text>
                  <Text style={{marginLeft:10,marginTop:2,color:'gray'}}>Giờ đặt: {time}</Text>
                  <Text style={{marginLeft:10,marginTop:10}}>Danh sách đặt</Text>
                </View>

                <FlatList
                  data={items}
                  renderItem={({ item }) =>
                    <ItemFoodDetail Data={item} />
                  }
                />
                <View style={{alignItems:'flex-end'}}>
                <Text style={{fontSize:20,margin:10}}>Tổng tiền: {total}</Text>
                </View>
              </View>
              <TouchableOpacity
                onPress={() =>
                  setModalVisible(false)
                }
              >
                <View style={{justifyContent:'center',alignItems:'center'}}>
                <View style={{ alignItems: 'center',justifyContent:'center',width:60,padding:5,borderRadius:30,backgroundColor:'red', margin: 5 }}>
                  <Text style={{color:'white'}}>Đóng</Text>
                </View>
                </View>
               

              </TouchableOpacity>
            </View>
          </View>

        </Modal>

      </View>












      <View style={{ flexDirection: 'row' }}>
        <View>
          <Image
            source={require('../Image/iconBill.png')}
            style={{
              width: 80,
              height: 80
            }}
          />
        </View>
        <View style={{ marginLeft: 20, flex: 1 }}>
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ marginRight: 5, marginTop: 5, color: 'gray' }}>id: </Text>
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{id}</Text>
          </View>
          <View style={{ flexDirection: 'row', marginTop: 5 }}>
            <Text style={{ color: 'gray' }}>{date} | </Text>
            <Text style={{ color: 'gray' }}>{time}</Text>
          </View>
          <View style={{ marginTop: 10, flexDirection: 'row' }}>
            <Image
              source={require('../Image/dollar.png')}
              style={{ width: 10, height: 10, marginTop: 10, marginRight: 5 }}
            />
            <Text style={{ fontSize: 20, color: 'cyan', fontWeight: 'bold' }}>{total}</Text>

          </View>


        </View>
        <View style={{ alignItems: 'center', justifyContent: 'flex-end', marginRight: 10 }}>
          <TouchableOpacity
            onPress={() => setModalVisible(true)}
          >
            <Text>Chi tiết</Text>
          </TouchableOpacity>
        </View>
      </View>

    </View>
  )
}

export default ItemBill

const styles = StyleSheet.create({});