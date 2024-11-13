// src/screens/PromosScreen.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const PromosScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>All Promos</Text>
      <Text style={styles.text}>This is where you can display all promotional content.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
  },
});

export default PromosScreen;
