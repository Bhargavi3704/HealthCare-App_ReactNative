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
import BloodBankScreen from './Asserts/Screens/BloodBankScreen';
import AmbulanceScreen from './Asserts/Screens/AmbulanceScreen';
import AmbulanceNotify from './Asserts/Screens/AmbulanceNotify';


import DoctorsHome from './Asserts/Screens/Doctors/DoctorsHome';
import DoctorsProfile from './Asserts/Screens/Doctors/DoctorsProfile';
import AppointmentDetails from './Asserts/Screens/Doctors/AppointmentDetails';
import PatientList from './Asserts/Screens/Doctors/PatientList';
import ConsultHistoryScreen from './Asserts/Screens/Doctors/ConsultHistoryScreen';

import LabsHome from './Asserts/Screens/Labs/LabsHome';
import LabsProfile from './Asserts/Screens/Labs/LabsProfile';
import LabBookings from './Asserts/Screens/Labs/LabBookings';
import LabHistoryScreen from './Asserts/Screens/Labs/LabHistoryScreen';

import BloodBanksHome from './Asserts/Screens/BloodBanks/BloodBanksHome';
import BloodBankProfile from './Asserts/Screens/BloodBanks/BloodBankProfile';
import DonationHistoryScreen from './Asserts/Screens/BloodBanks/DonationHistoryScreen';

import AmbulanceHome from './Asserts/Screens/Ambulance/AmbulanceHome';
import AmbulanceProfile from './Asserts/Screens/Ambulance/AmbulanceProfile';
import AmbulanceHistory from './Asserts/Screens/Ambulance/AmbulanceHistory';
import AmbulanceRequests from './Asserts/Screens/Ambulance/AmbulanceRequests';
import AmbulanceMapScreen from './Asserts/Screens/Ambulance/AmbulanceMapScreen';

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
          <Stack.Screen name="BloodBankScreen" component={BloodBankScreen} options={{ headerShown: false }} />
          <Stack.Screen name="AmbulanceScreen" component={AmbulanceScreen} options={{ headerShown: false }} />
          <Stack.Screen name="AmbulanceNotify" component={AmbulanceNotify} options={{ headerShown: false }} />

          <Stack.Screen name="DoctorsHome" component={DoctorsHome} options={{ headerShown: false }} />
          <Stack.Screen name="DoctorsProfile" component={DoctorsProfile} options={{ headerShown: false }} />
          <Stack.Screen name="AppointmentDetails" component={AppointmentDetails} options={{ headerShown: false }} />
          <Stack.Screen name="PatientList" component={PatientList} options={{ headerShown: false }} />
          <Stack.Screen name="ConsultHistoryScreen" component={ConsultHistoryScreen} options={{ headerShown: false }} />

          <Stack.Screen name="LabsHome" component={LabsHome} options={{ headerShown: false }} />
          <Stack.Screen name="LabsProfile" component={LabsProfile} options={{ headerShown: false }} />
          <Stack.Screen name="LabBookings" component={LabBookings} options={{ headerShown: false }} />
          <Stack.Screen name="LabHistoryScreen" component={LabHistoryScreen} options={{ headerShown: false }} />

          <Stack.Screen name="BloodBanksHome" component={BloodBanksHome} options={{ headerShown: false }} />
          <Stack.Screen name="BloodBankProfile" component={BloodBankProfile} options={{ headerShown: false }} />
          <Stack.Screen name="DonationHistoryScreen" component={DonationHistoryScreen} options={{ headerShown: false }} />

          <Stack.Screen name="AmbulanceHome" component={AmbulanceHome} options={{ headerShown: false }} />
          <Stack.Screen name="AmbulanceProfile" component={AmbulanceProfile} options={{ headerShown: false }} />
          <Stack.Screen name="AmbulanceRequests" component={AmbulanceRequests} options={{ headerShown: false }} />
          <Stack.Screen name="AmbulanceHistory" component={AmbulanceHistory} options={{ headerShown: false }} />
          <Stack.Screen name="AmbulanceMapScreen" component={AmbulanceMapScreen} options={{ headerShown: false }} />

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
