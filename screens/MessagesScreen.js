import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Button } from 'react-native';

const MessagingScreen = ( route ) => {
  const [friend, setFriend] = useState(route.route.params);
  const [messages, setMessages] = useState(friend.friend.messages);
  const [newMessage, setNewMessage] = useState('');

  const sendMessage = () => {
    if (newMessage.trim() === '') return;
    setMessages([...messages, { userSent: true, message: newMessage }]);
    setNewMessage('');
  };
  
  const renderMessage = ({ item }) => {
    const isUser = item.userSent;
    return (
      <View style={[
        styles.messageContainer,
        isUser ? styles.userMessageContainer : styles.friendMessageContainer
      ]}>
        <Text style={[
          styles.messageText,
          isUser ? styles.userMessageText : styles.friendMessageText
        ]}>{item.message}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={[...messages].reverse()}
        renderItem={renderMessage}
        keyExtractor={(item, index) => index.toString()}
        inverted
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={newMessage}
          onChangeText={(text) => setNewMessage(text)}
          placeholder="Send message..."
          onSubmitEditing={sendMessage}
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#404040',
    padding: 10,
  },
  messageContainer: {
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 10,
    maxWidth: '70%',
  },
  userMessageContainer: {
    backgroundColor: '#007AFF',
    alignSelf: 'flex-end',
  },
  friendMessageContainer: {
    backgroundColor: '#009688',
    alignSelf: 'flex-start',
  },
  messageText: {
    color: '#fff',
    fontSize: 16,
  },
  userMessageText: {
    color: '#fff',
  },
  friendMessageText: {
    color: '#000',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingHorizontal: 15,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: '#900000',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  sendButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default MessagingScreen;
