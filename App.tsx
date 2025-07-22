import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// Screens
import Splash from './Asserts/Screens/Splash';
import Login from './Asserts/Screens/Login';
import ForgotPassword from './Asserts/Screens/ForgotPassword';
import Home from './Asserts/Screens/Home';
import DoctorsCategoriesScreen from './Asserts/Screens/DoctorsCategoriesScreen';
import DoctorsList from './Asserts/Screens/DoctorsList';
import VideocallBooking from './Asserts/Screens/VideocallBooking';
import AppointmentsScreen from './Asserts/Screens/AppointmentsScreen';
import BookAppointments from './Asserts/Screens/BookAppointments';
import MyAppointments from './Asserts/Screens/MyAppointments';
import ReportsScreen from './Asserts/Screens/ReportsScreen';
import HealthTrackerScreen from './Asserts/Screens/HealthTrackerScreen';
import ReminderScreen from './Asserts/Screens/ReminderScreen';
import ProfileScreen from './Asserts/Screens/ProfileScreen';
import EditProfile from './Asserts/Screens/EditProfile';
import Notifications from './Asserts/Screens/Notifications';
import Settings from './Asserts/Screens/Settings';
import ChangePassword from './Asserts/Screens/ChangePassword';
import PrivacyPolicy from './Asserts/Screens/PrivacyPolicy';
import MedicineScreen from './Asserts/Screens/MedicineScreen';
import CartScreen from './Asserts/Screens/CartScreen';
import OrderScreen from './Asserts/Screens/OrderScreen';
import PaymentScreen from './Asserts/Screens/PaymentScreen';
import SuccessScreen from './Asserts/Screens/SuccessScreen';
import PreviousOrdersScreen from './Asserts/Screens/PreviousOrderScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <Provider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Splash'
          screenOptions={{
            headerStyle: { backgroundColor: '#cce4f6' },
            headerTintColor: 'white',
            headerTitleStyle: { fontWeight: 'bold' },
          }}>
          <Stack.Screen name="Splash" component={Splash} options={{ headerShown: false }} />
          <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
          <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{ headerShown: false }} />
          <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />

          <Stack.Screen name="Main" component={TabStackNav} options={{ headerShown: false }} />

          <Stack.Screen name="DoctorsCategoriesScreen" component={DoctorsCategoriesScreen} options={{ headerShown: false }} />
          <Stack.Screen name="DoctorsList" component={DoctorsList} options={{ headerShown: false }} />
          <Stack.Screen name="VideocallBooking" component={VideocallBooking} options={{ headerShown: false }} />
          <Stack.Screen name="AppointmentsScreen" component={AppointmentsScreen} options={{ headerShown: false }} />
          <Stack.Screen name="BookAppointments" component={BookAppointments} options={{ headerShown: false }} />
          <Stack.Screen name="MyAppointments" component={MyAppointments} options={{ headerShown: false }} />
          <Stack.Screen name="ReportsScreen" component={ReportsScreen} options={{ headerShown: false }} />
          <Stack.Screen name="HealthTrackerScreen" component={HealthTrackerScreen} options={{ headerShown: false }} />
          <Stack.Screen name="ReminderScreen" component={ReminderScreen} options={{ headerShown: false }} />
          <Stack.Screen name="ProfileScreen" component={ProfileScreen} options={{ headerShown: false }} />
          <Stack.Screen name="EditProfile" component={EditProfile} options={{ headerShown: false }} />
          <Stack.Screen name="Notifications" component={Notifications} options={{ headerShown: false }} />
          <Stack.Screen name="Settings" component={Settings} options={{ headerShown: false }} />
          <Stack.Screen name="ChangePassword" component={ChangePassword} options={{ headerShown: false }} />
          <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} options={{ headerShown: false }} />
          <Stack.Screen name="MedicineScreen" component={MedicineScreen} options={{ headerShown: false }} />
          <Stack.Screen name="CartScreen" component={CartScreen} options={{ headerShown: false }} />
          <Stack.Screen name="OrderScreen" component={OrderScreen} options={{ headerShown: false }} />
          <Stack.Screen name="PaymentScreen" component={PaymentScreen} options={{ headerShown: false }} />
          <Stack.Screen name="SuccessScreen" component={SuccessScreen} options={{ headerShown: false }} />
          <Stack.Screen name="PreviousOrdersScreen" component={PreviousOrdersScreen} options={{ headerShown: false }} />


        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

 const TabStackNav = () => {
   return (
     <Tab.Navigator
       initialRouteName="Home"
       screenOptions={{
         tabBarShowLabel: true,
         tabBarActiveTintColor: '#007AFF',
         tabBarInactiveTintColor: '#666',
         tabBarStyle: {
           position: 'absolute',
           height: 70,
           backgroundColor: 'white',
           elevation: 10,
           borderRadius: 20,
           marginBottom: 20,
           borderWidth: 1,
           borderColor: 'lightgray',
           margin:7,
         },
         tabBarLabelStyle: {
           fontSize: 14,
           fontWeight: 'bold',
           textAlign: 'center',
         },
         tabBarIconStyle: { marginTop: 5},
         tabBarItemStyle: { borderRadius: 10 },
       }}>
       <Tab.Screen
         name="Home"
         component={Home}
         options={{
           headerShown: false,
           tabBarIcon: ({ focused }) => (
             <Icon name="home-outline" size={30} color={focused ? "#007AFF" : "#666"} />
           ),
         }}
       />
       <Tab.Screen
         name="My Slots"
         component={MyAppointments}
         options={{
           headerShown: false,
           tabBarIcon: ({ focused }) => (
             <Icon name="calendar-check-outline" size={28} color={focused ? "#007AFF" : "#666"} />
           ),
         }}
       />
       <Tab.Screen
         name="MediCart"
         component={CartScreen}
         options={{
           headerShown: false,
           tabBarIcon: ({ focused }) => (
             <Icon name="cart-outline" size={28} color={focused ? "#007AFF" : "#666"} />
           ),
         }}
       />
        <Tab.Screen
         name="My Profile"
         component={ProfileScreen}
         options={{
           headerShown: false,
           tabBarIcon: ({ focused }) => (
             <Icon name="account-circle-outline" size={28} color={focused ? "#007AFF" : "#666"} />
           ),
         }}
       />
    </Tab.Navigator>
 );
};
