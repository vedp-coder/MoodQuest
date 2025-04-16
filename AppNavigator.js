import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Feather } from '@expo/vector-icons';

// Import screens
import Auth from './Auth';
import MoodSelection from './MoodSelection';
import TasksView from './TasksView';
import Social from './Social';
import Profile from './Profile';
import Rewards from './Rewards';
import Chat from './Chat';

// Create navigators
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Auth Navigator
const AuthNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Auth" component={Auth} />
  </Stack.Navigator>
);

// Main App Flow
const TasksStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="MoodSelection" component={MoodSelection} options={{ title: "How are you feeling?" }} />
    <Stack.Screen name="Tasks" component={TasksView} options={{ title: "Your Mood Quest" }} />
  </Stack.Navigator>
);

const SocialStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="SocialFeed" component={Social} options={{ title: "Vibe Circle" }} />
    <Stack.Screen name="Chat" component={Chat} options={({ route }) => ({ title: route.params.recipientName })} />
  </Stack.Navigator>
);

const ProfileStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="UserProfile" component={Profile} options={{ title: "My Profile" }} />
    <Stack.Screen name="Rewards" component={Rewards} options={{ title: "Rewards Shop" }} />
  </Stack.Navigator>
);

// Main Tab Navigator
const MainTabs = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        switch (route.name) {
          case 'Quests':
            iconName = 'compass';
            break;
          case 'Social':
            iconName = 'users';
            break;
          case 'Profile':
            iconName = 'user';
            break;
          default:
            iconName = 'circle';
        }

        return <Feather name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: '#6C63FF',
      tabBarInactiveTintColor: 'gray',
    })}
  >
    <Tab.Screen name="Quests" component={TasksStack} options={{ headerShown: false }} />
    <Tab.Screen name="Social" component={SocialStack} options={{ headerShown: false }} />
    <Tab.Screen name="Profile" component={ProfileStack} options={{ headerShown: false }} />
  </Tab.Navigator>
);

// Root Navigator
const AppNavigator = () => {
  const isAuthenticated = false; // Replace with your auth logic
  
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isAuthenticated ? (
          <Stack.Screen name="Main" component={MainTabs} />
        ) : (
          <Stack.Screen name="Auth" component={AuthNavigator} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
