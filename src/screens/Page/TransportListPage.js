import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import TransportCard from '../components/TransportCard'; // Import the TransportCard component

const TransportList = () => {
  const [selectedCategory, setSelectedCategory] = useState('bus');
  const [searchText, setSearchText] = useState('');

  const categories = ['All', 'Bus', 'Rail', 'Ferry'];

  // Mock Data: Bus Routes with Operators
  const busRoutes = [
    { id: 'P001', route: 'Larkin Sentral ⇔ JB Sentral', operator: 'Bas Muafakat Johor' },
    { id: 'P002', route: 'Sri Stulang ⇔ MBJB ⇔ JB Sentral', operator: 'Bas Muafakat Johor' },
    { id: 'P003', route: 'Sri Stulang ⇔ Kg. Melayu Majidee ⇔ Larkin Sentral', operator: 'Bas Muafakat Johor' },
    { id: 'P004', route: 'Bus Kulai 1', operator: 'Bas Iskandar Puteri' },
    { id: 'P005', route: 'Bus Kulai 2', operator: 'Bas Iskandar Puteri' },
    { id: 'P006', route: 'Bus Pasir Gudang 1', operator: 'Bas Johor Express' },
  ];

  // Filtered routes based on the selected category
  const getFilteredRoutes = () => {
    if (selectedCategory === 'bus') {
      return busRoutes;
    } else {
      // Return empty array for categories without data
      return [];
    }
  };

  // Get the operator for the first route in the filtered list
  const getCurrentOperator = () => {
    const filteredRoutes = getFilteredRoutes();
    return filteredRoutes.length > 0 ? filteredRoutes[0].operator : null;
  };

  // Render a single bus route item
  const renderBusRoute = ({ item }) => (
    <TouchableOpacity style={styles.listItem} onPress={() => console.log(`Clicked on ${item.route}`)}>
      <TransportCard
        number={item.id} // Route number
        iconName="bus" // Icon for bus
        lineColor="#0000FF" // Line color
        showIcon={true} // Enable the icon
      />
      <View style={styles.routeContent}>
        <Text style={styles.routeText}>{item.route}</Text>
      </View>
    </TouchableOpacity>
  );

  // Render placeholder for unavailable categories
  const renderPlaceholderMessage = () => (
    <View style={styles.placeholderContainer}>
      <Text style={styles.placeholderText}>Will be available soon</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <View style={styles.searchBar}>
          <Icon name="search" size={20} color="#0F3B99" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search for routes"
            placeholderTextColor="#999"
            value={searchText}
            onChangeText={(text) => setSearchText(text)}
          />
        </View>
      </View>

      {/* Category Tabs */}
      <View style={styles.categorySelector}>
        {categories.map((category) => (
          <TouchableOpacity
            key={category}
            style={styles.categoryButton}
            onPress={() =>
              setSelectedCategory(category.toLowerCase() === 'all' ? 'bus' : category.toLowerCase())
            }
          >
            <Text
              style={[
                styles.categoryText,
                selectedCategory.toLowerCase() === category.toLowerCase() &&
                  styles.activeCategoryText,
              ]}
            >
              {category}
            </Text>
            {selectedCategory.toLowerCase() === category.toLowerCase() && (
              <View style={styles.activeCategoryUnderline} />
            )}
          </TouchableOpacity>
        ))}
      </View>

      {/* Operator Header */}
      {getCurrentOperator() && (
        <View style={styles.operatorContainer}>
          <Text style={styles.operatorText}>{getCurrentOperator()}</Text>
        </View>
      )}

      {/* Content */}
      <View style={styles.content}>
        {getFilteredRoutes().length > 0 ? (
          <FlatList
            data={getFilteredRoutes()}
            keyExtractor={(item) => item.id}
            renderItem={renderBusRoute}
          />
        ) : (
          renderPlaceholderMessage()
        )}
      </View>
    </SafeAreaView>
  );
};

export default TransportList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: '#FFFFFF',
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F3F3',
    borderRadius: 10,
    paddingHorizontal: 15,
    height: 40,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'UrbanistSemiBold',
    color: '#000',
  },
  categorySelector: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
  },
  categoryButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 0,
  },
  categoryText: {
    fontSize: 14,
    fontFamily: 'UrbanistSemiBold',
    color: '#666',
  },
  activeCategoryText: {
    color: '#D32F2F',
    fontFamily: 'UrbanistSemiBold',
    fontWeight: 'bold',
  },
  activeCategoryUnderline: {
    marginTop: 5,
    height: 3,
    width: '80%',
    backgroundColor: '#D32F2F',
  },
  operatorContainer: {
    backgroundColor: '#F3F3F3',
    padding: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  operatorText: {
    fontSize: 16,
    fontFamily: 'UrbanistSemiBold',
    color: '#333',
    marginLeft: 10,
  },
  content: {
    flex: 1,
    paddingHorizontal: 2,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 10,
    marginBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  routeContent: {
    flex: 1,
    marginLeft: 10,
  },
  routeText: {
    fontSize: 13,
    fontFamily: 'UrbanistMedium',
    color: '#333',
  },
  placeholderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: 18,
    fontFamily: 'UrbanistSemiBold',
    color: '#777',
  },
});
