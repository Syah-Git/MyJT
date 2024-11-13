import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet } from 'react-native';
import HomeScreen from './src/screens/HomeScreen';
import NearbyScreen from './src/screens/NearbyScreen';
import ScanScreen from './src/screens/ScanScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import PromosScreen from './src/screens/PromosScreen';
import Octicons from 'react-native-vector-icons/Octicons';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Helper function for tab icons
const getTabIcon = (routeName, focused, color) => {
  const size = styles.iconSize.size;

  switch (routeName) {
    case 'Home':
      return <Octicons name="home" size={size} color={color} />;
    case 'Nearby':
      return <Entypo name="location" size={size} color={color} />;
    case 'Scan':
      return focused ? (
        <MaterialCommunityIcons name="line-scan" size={23} color={color} />
      ) : (
        <MaterialCommunityIcons name="scan-helper" size={21} color={color} />
      );
    case 'Profile':
      return <Octicons name={focused ? 'person-fill' : 'person'} size={size} color={color} />;
    default:
      return null;
  }
};

// Bottom Tab Navigator
const BottomTabs = () => (
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
);

// Main App Navigator (including PromosScreen)
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Main" component={BottomTabs} options={{ headerShown: false }} />
        <Stack.Screen name="PromosScreen" component={PromosScreen} options={{ title: 'Promotions' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// Styles
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
