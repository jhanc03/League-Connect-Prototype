import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Image } from 'expo-image';

const SocialScreen = ({ navigation }) => {
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    try {
      const friendsData = require('../components/friends.json');
      setFriends(friendsData);
    } catch (error) {
      console.error('Error fetching JSON data:', error);
    }
  }, []);

  const handleFriendPress = (friend) => {
    navigation.navigate('Messages', { friend });
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
      <FlatList style={styles.friendsList}
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
    backgroundColor: '#404040',
    padding: 4,
  },
  friendsList: {
    flex: 1,
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

export default SocialScreen;
