import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Image } from 'expo-image';

const FriendsListScreen = ({ navigation }) => {
  const [friends, setFriends] = useState([
    { id: 1, username: 'John', avatar: 'LoL_Icon_Rendered_Hi-Res.png' },
    { id: 2, username: 'Alice' },
    { id: 3, username: 'Bob' },
    { id: 4, username: 'Emma' },
    { id: 5, username: 'Michael' },
  ]);

  const handleFriendPress = (friend) => {
    //Alert.alert('Friend Selected', `You selected: ${friend.username}`);
    navigation.navigate('Messages');
  };

  const Friend = ({friend, onPress, backgroundColor, textColor}) => (
      <TouchableOpacity onPress={onPress} style={[styles.friendItem, {backgroundColor}]}>
        <Image
          style={styles.friendAvatar}
          source={require('../assets/LoL_Icon_Rendered_Hi-Res.png')}
          contentFit="cover"
          //resizeMode="contain"
          transition={400}
        />
        <Text style={[styles.friendUsername, {color: textColor}]}>{friend.username}</Text>
      </TouchableOpacity>
  );

  const renderFriend = ({item}) => {
    //const backgroundColor = item.id === selectedId ? '#6e3b6e' : '#f9c2ff';
    //const color = item.id === selectedId ? 'white' : 'black';

    return (
      <Friend
        friend={item}
        onPress={() => handleFriendPress(item)}
        backgroundColor={'#fff'}
        textColor={'#000'}
      />
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={friends}
        renderItem={renderFriend}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 4,
  },
  friendItem: {
    //borderBottomWidth: 1,
    //borderBottomColor: '#ccc',
    flexDirection:'row',
    paddingVertical: 4,
  },
  friendAvatar: {
    width: 64,
    height: 64,
    marginRight: 14,
    //backgroundColor: '#0553',
  },
  friendUsername: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default FriendsListScreen;
