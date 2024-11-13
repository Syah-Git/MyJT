import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet } from 'react-native';
import HomeScreen from './src/screens/HomeScreen';
import NearbyScreen from './src/screens/NearbyScreen';
import ScanScreen from './src/screens/ScanScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import Octicons from 'react-native-vector-icons/Octicons';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createBottomTabNavigator();

// Helper function for icons
const getTabIcon = (routeName, focused, color) => {
  const size = styles.iconSize.size;

  switch (routeName) {
    case 'Home':
     return focused ? (
        <Octicons name="home" size={size} color={color} />
      ) : (
        <Octicons name="home" size={size} color={color} />
      );
    case 'Nearby':
      return focused ? (
        <Entypo name="location" size={size} color={color} />
      ) : (
        <Entypo name="location" size={size} color={color} />
      );
    case 'Scan':
      return focused ? (
        <MaterialCommunityIcons name="line-scan" size={23} color={color} />
      ) : (
        <MaterialCommunityIcons name="scan-helper" size={21} color={color} />
      );
    case 'Profile':
      return focused ? (
        <Octicons name="person-fill" size={size} color={color} />
      ) : (
        <Octicons name="person" size={size} color={color} />
      );
    default:
      return null;
  }
};

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color }) => getTabIcon(route.name, focused, color),
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
    height: 70,
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
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
});
