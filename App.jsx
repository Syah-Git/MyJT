import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './src/screens/HomeScreen';
import NearbyScreen from './src/screens/NearbyScreen';
import ScanScreen from './src/screens/ScanScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            size = 22; // Adjust the icon size here
            if (route.name === 'Home') {
              return <Octicons name="home" size={size} color={color} />;
            } else if (route.name === 'Nearby') {
              return <Ionicons name="location-outline" size={size} color={color} />;
            } else if (route.name === 'Scan') {
              return <Octicons name="scan" size={size} color={color} />;
            } else if (route.name === 'Profile') {
              return <Ionicons name="person-circle-outline" size={size} color={color} />;
            }
          },
          tabBarActiveTintColor: '#17467C',
          tabBarInactiveTintColor: '#6b6b6b',
          headerShown: false,
          tabBarStyle: {
            height: 70, // Adjust the height of the tab bar
            paddingBottom: 15, // Space between icon and bottom edge
            paddingTop: 10, // Space between top edge and icon
          },
          tabBarIconStyle: {
            marginBottom: -4, // Adjust the space between icon and label
          },
          tabBarLabelStyle: {
            fontFamily: 'MyCustomFont', // Your custom font
            fontSize: 14, // Adjust the font size
            marginTop: -6, // Adjust the space between label and icon
          },
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
