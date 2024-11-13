import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet } from 'react-native';
import HomeScreen from './src/screens/HomeScreen';
import NearbyScreen from './src/screens/NearbyScreen';
import ScanScreen from './src/screens/ScanScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';
import Entypo from 'react-native-vector-icons/Entypo';


const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            size = styles.iconSize.size; // Use icon size from styles
            if (route.name === 'Home') {
              return <Octicons name="home" size={size} color={color} />;
            } else if (route.name === 'Nearby') {
              return <Entypo name="location" size={size} color={color} />;
            } else if (route.name === 'Scan') {
              return <Ionicons name="scan" size={size} color={color} />;
            } else if (route.name === 'Profile') {
              return <Octicons name="person" size={size} color={color} />;
            }
          },
          tabBarActiveTintColor: '#17467C',
          tabBarInactiveTintColor: '#9E9E9E',
          headerShown: false,
          tabBarStyle: styles.tabBarStyle,
          tabBarIconStyle: styles.tabBarIconStyle,
          tabBarLabelStyle: styles.tabBarLabelStyle,
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Nearby" component={NearbyScreen} />
        <Tab.Screen name="Scan" component={ScanScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

//StyleSheet
const styles = StyleSheet.create({
  tabBarStyle: {
    height: 65, // Adjust the height of the tab bar
    paddingBottom: 10, // Space between icon and bottom edge
    paddingTop: 10, // Space between top edge and icon
  },
  tabBarIconStyle: {
    marginBottom: 0, // Adjust the space between icon and label
  },
  tabBarLabelStyle: {
    fontFamily: 'UrbanistSemiBold', // Your custom font
    fontSize: 12, // Adjust the font size
    marginTop: -2, // Adjust the space between label and icon
  },
  iconSize: {
    size: 22, // Define icon size here
  },
});
