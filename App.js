import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import HomeAdmin from './Components/HomeAdmin';
import BottomTabHomeStaff from './Components/BottomTabHomeStaff';
import BottomTabHomeUser from './Components/BottomTabHomeUser';
import Login from './Components/Login';
import Welcome from './Components/Welcome';
import ManagementAccount from './Components/ManagementAccount';
import AddAccount from './Components/AddAccount';
import ManagementBuyer from './Components/ManagementBuyer';
import ManagementStaff from './Components/ManagementStaff';
import ManagementTable from './Components/ManagementTable';
import AddTable from './Components/AddTable';
import ManagementOrder from './Components/ManagementOrder';
import AddOrder from './Components/AddOrder';
import ManagementMenu from './Components/ManagementMenu';
import AddMenu from './Components/AddMenu';
import BillDetail from './Components/BillDetail';
import ItemBill from './Components/ItemBill';
import DayStatistical from './Components/DayStatistical';
import MonthStatistical from './Components/MonthStatistical';
import YearStatistical from './Components/YearStatistical';

export default function App() {
  const Stack = createNativeStackNavigator();
 
  return (
   <NavigationContainer>
    <Stack.Navigator initialRouteName='Welcome'
    screenOptions={{
      headerStyle:{backgroundColor:'cyan'}
    }}
    >
      <Stack.Screen name='Welcome' component={Welcome} options={{headerShown:false}}/>   
      <Stack.Screen name='Login' component={Login} options={{headerBackVisible:false,headerShown:false}}/>
      <Stack.Screen name='HomeAdmin' component={HomeAdmin} options={{headerBackVisible:false,headerShown:false,statusBarColor:'cyan'}}/>
      <Stack.Screen name='HomeUser' component={BottomTabHomeUser} options={{statusBarColor:'cyan'}}/>
      <Stack.Screen name='HomeStaff' component={BottomTabHomeStaff} options={{statusBarColor:'cyan'}}/>
      <Stack.Screen name='ManagementAccount' component={ManagementAccount} options={{statusBarColor:'cyan',title:"Quản lí tài khoản admin"}}/>
      <Stack.Screen name='AddAccount' component={AddAccount} options={{statusBarColor:'cyan'}}/>
      <Stack.Screen name='ManagementBuyer' component={ManagementBuyer} options={{statusBarColor:'cyan',title:"Quản lí khách hàng"}}/>
      <Stack.Screen name='ManagementStaff' component={ManagementStaff} options={{statusBarColor:'cyan',title:"Quản lí nhân viên"}}/>
      <Stack.Screen name='ManagementTable' component={ManagementTable} options={{title:"Quản lí bàn",statusBarColor:'cyan'}}/>
      <Stack.Screen name='ManagementOrder' component={ManagementOrder} options={{title:"Quản lí hóa đơn",statusBarColor:'cyan'}}/>
      <Stack.Screen name='ManagementMenu' component={ManagementMenu} options={{title:"Thực đơn ",statusBarColor:'cyan'}}/>
      <Stack.Screen name='AddMenu' component={AddMenu} options={{statusBarColor:'cyan'}}/>
      <Stack.Screen name='AddTable' component={AddTable} options={{statusBarColor:'cyan'}}/>
      <Stack.Screen name='AddOrder' component={AddOrder} options={{headerBackVisible:false, headerShown:true,title:"Đặt hàng",statusBarColor:'cyan'}}/>
      <Stack.Screen name='DayStatistical' component={DayStatistical} options={{headerShown:true,title:"Thống kê theo ngày",statusBarColor:"cyan"}}/>
      <Stack.Screen name='MonthStatistical' component={MonthStatistical} options={{headerShown:true,title:"Thống kê theo ngày tháng",statusBarColor:"cyan"}}/>
      <Stack.Screen name='YearStatistical' component={YearStatistical} options={{headerShown:true,title:"Thống kê theo năm",statusBarColor:"cyan"}}/>

    </Stack.Navigator>
   </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
