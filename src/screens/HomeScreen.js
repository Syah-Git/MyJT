// src/screens/HomeScreen.js
import React from 'react';
import { View, StyleSheet } from 'react-native';
import SlidePanel from '../components/HomeScreenComponent/SlidePanel';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const navigation = useNavigation();

  const handleViewAllPromos = () => {
    navigation.navigate('PromosScreen'); // Navigates to PromosScreen
  };

  return (
    <View style={styles.container}>
      <SlidePanel onViewAllPromos={handleViewAllPromos} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
});

export default HomeScreen;
