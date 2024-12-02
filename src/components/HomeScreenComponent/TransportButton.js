// src/components/TransportButton.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const TransportButton = ({ iconName, label, color }) => {
  return (
    <TouchableOpacity style={styles.button}>
      <View style={[styles.iconContainer, { backgroundColor: color }]}>
        <Icon name={iconName} size={30} color="#fff" />
      </View>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    marginHorizontal: 10,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e0e0e0',
  },
  label: {
    marginTop: 5,
    fontSize: 18,
    color: '#333',
  },
});

export default TransportButton;
