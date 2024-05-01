import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert, Button } from 'react-native';

const FriendsListScreen = () => {
  const [friends, setFriends] = useState([
    { id: 1, name: 'John', coordinates: { latitude: 0, longitude: 0 } },
    { id: 2, name: 'Alice', coordinates: { latitude: 0, longitude: 0 } },
    { id: 3, name: 'Bob', coordinates: { latitude: 0, longitude: 0 } },
    { id: 4, name: 'Emma', coordinates: { latitude: 0, longitude: 0 } },
    { id: 5, name: 'Michael', coordinates: { latitude: 0, longitude: 0 } },
  ]);

  const handleFriendPress = (friendId) => {
    const updatedFriends = friends.map((friend) =>
      friend.id === friendId ? { ...friend, coordinates: generateRandomCoordinates() } : friend
    );
    setFriends(updatedFriends);
  };

  const generateRandomCoordinates = () => {
    const latitude = Math.random() * 180 - 90; // Random latitude between -90 and 90
    const longitude = Math.random() * 360 - 180; // Random longitude between -180 and 180
    return { latitude, longitude };
  };

  const exportToJson = () => {
    const json = JSON.stringify(friends);
    Alert.alert('Friends List JSON', json);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={friends}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleFriendPress(item.id)}>
            <View style={styles.friendItem}>
              <Text style={styles.friendName}>{item.name}</Text>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
      <Button title="Export to JSON" onPress={exportToJson} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  friendItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 10,
  },
  friendName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default FriendsListScreen;
