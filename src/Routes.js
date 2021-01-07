import 'react-native-gesture-handler';
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon  from 'react-native-vector-icons/Ionicons';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const TabNav = () => {
    return (
        <Tab.Navigator 
            initialRouteName="Home"
            tabBarOptions={{
                activeTintColor: '#3B3131',
            }}
        >
            <Tab.Screen 
                name="Home" 
                component={HomeScreen}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color, size }) => (
                      <Icon name="home" color={color} size={30} />
                    ),
                }} 
            />

            <Tab.Screen 
                name="Profile" 
                component={ProfileScreen}
                options={{
                    tabBarLabel: 'Profile',
                    tabBarIcon: ({ color, size }) => (
                      <Icon name="md-person-sharp" color={color} size={30} />
                    ),
                }}  
            />
        </Tab.Navigator>
    )
}

const Routes = () => {
    return (
       <NavigationContainer>
           <Stack.Navigator
            initialRouteName="Login"
            screenOptions={{headerTitleAlign: 'center'}}
           >
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="TabNav" component={TabNav} options={{headerShown: false}} />
        </Stack.Navigator>
       </NavigationContainer>
    )
}

export default Routes
