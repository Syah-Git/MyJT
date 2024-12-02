import { View, StyleSheet } from 'react-native'
import React from 'react'
import NearbySlidePanel from '../components/SlidePanelNearby';
import { useNavigation } from '@react-navigation/native';

const NearbyScreen = () => {
const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <NearbySlidePanel/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
});

export default NearbyScreen;