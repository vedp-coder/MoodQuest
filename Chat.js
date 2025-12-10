import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useAuth } from './contexts/AuthContext';
import { getMoodEmoji } from './utils/moodUtils';
s
const Chat = ({ route, navigation }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const { currentUser } = useAuth();
  const { chatId, recipientId, recipientName, recipientMood } = route.params;

  useEffect(() => {
    // Set navigation title with recipient's name and mood emoji
    navigation.setOptions({
      title: `${recipientName} ${getMoodEmoji(recipientMood)}`
    });
    
    // Load chat messages
    loadMessages();
  }, []);

  const loadMessages = async () => {
    try {
      // Simulated chat data for demo
      const mockMessages = [
        {
          id: '1',
          senderId: recipientId,
          text: "Hey! How are you feeling today?",
          timestamp: new Date(Date.now() - 3600000).toISOString(),
        },
        {
          id: '2',
          senderId: currentUser.uid,
          text: "I'm feeling pretty energetic! Just completed a mood quest.",
          timestamp: new Date(Date.now() - 1800000).toISOString(),
        },
        {
          id: '3',
          senderId: recipientId,
          text: "That's awesome! Which quest was it?",
          timestamp: new Date(Date.now() - 900000).toISOString(),
        }
      ];
      
      setMessages(mockMessages);
    } catch (error) {
      console.error("Error loading messages:", error);
    }
  };

  const sendMessage = async () => {
    if (newMessage.trim() === '') return;
    
    try {
      const messageData = {
        id: Date.now().toString(),
        senderId: currentUser.uid,
        text: newMessage,
        timestamp: new Date().toISOString(),
      };
      
      // Update local state immediately for UI responsiveness
      setMessages(prevMessages => [...prevMessages, messageData]);
      setNewMessage('');
      
      // In a real app, we would save to database here
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const renderMessage = ({ item }) => {
    const isMyMessage = item.senderId === currentUser.uid;
    
    return (
      <View style={[
        styles.messageContainer,
        isMyMessage ? styles.myMessage : styles.theirMessage
      ]}>
        <Text style={styles.messageText}>{item.messageText || item.text}</Text>
        <Text style={styles.timestamp}>
          {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.messagesList}
        inverted={false}
      />
      
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={newMessage}
          onChangeText={setNewMessage}
          placeholder="Type a message..."
          placeholderTextColor="#999"
          multiline
        />
        <TouchableOpacity 
          style={styles.sendButton} 
          onPress={sendMessage}
          disabled={!newMessage.trim()}
        >
          <Feather 
            name="send" 
            size={24} 
            color={newMessage.trim() ? "#6C63FF" : "#CCCCCC"} 
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  messagesList: {
    padding: 16,
    paddingBottom: 80,
  },
  messageContainer: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 16,
    marginBottom: 8,
  },
  myMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#6C63FF',
    borderBottomRightRadius: 4,
  },
  theirMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#FFFFFF',
    borderBottomLeftRadius: 4,
  },
  messageText: {
    color: theme => theme === 'myMessage' ? '#FFFFFF' : '#333333',
    fontSize: 16,
  },
  timestamp: {
    fontSize: 11,
    marginTop: 4,
    color: theme => theme === 'myMessage' ? 'rgba(255,255,255,0.7)' : '#999',
    alignSelf: 'flex-end',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 8,
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
  },
  input: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    maxHeight: 100,
    fontSize: 16,
  },
  sendButton: {
    marginLeft: 8,
    padding: 8,
  },
});

export default Chat;
