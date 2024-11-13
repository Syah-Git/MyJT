import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, Image } from 'react-native';
import HomeScreen from './src/screens/HomeScreen';
import NearbyScreen from './src/screens/NearbyScreen';
import ScanScreen from './src/screens/ScanScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';
import Entypo from 'react-native-vector-icons/Entypo';

// Import your custom icon image
import HomeFocusedIcon from './src/assets/icon/homeicon.svg';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            size = styles.iconSize.size;

            // Define icons for each tab based on the focused state
            if (route.name === 'Home') {
              // Use custom image icon for focused Home tab
              return focused ? (
                <Image source={HomeFocusedIcon} style={styles.customIcon} />
              ) : (
                <Octicons name="home" size={size} color={color} />
              );
            } else if (route.name === 'Nearby') {
              return focused ? (
                <Entypo name="location-pin" size={size} color={color} />
              ) : (
                <Entypo name="location" size={size} color={color} />
              );
            } else if (route.name === 'Scan') {
              return focused ? (
                <Ionicons name="scan-circle" size={size} color={color} />
              ) : (
                <Ionicons name="scan" size={size} color={color} />
              );
            } else if (route.name === 'Profile') {
              return focused ? (
                <Octicons name="person-fill" size={size} color={color} />
              ) : (
                <Octicons name="person" size={size} color={color} />
              );
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

// StyleSheet
const styles = StyleSheet.create({
  tabBarStyle: {
    height: 65,
    paddingBottom: 10,
    paddingTop: 10,
  },
  tabBarIconStyle: {
    marginBottom: 0,
  },
  tabBarLabelStyle: {
    fontFamily: 'UrbanistSemiBold',
    fontSize: 12,
    marginTop: -2,
  },
  iconSize: {
    size: 22,
  },
  customIcon: {
    width: 24, // Adjust width of the custom icon
    height: 24, // Adjust height of the custom icon
    resizeMode: 'contain',
  },
});
