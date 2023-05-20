import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TodoScreen from './TodoScreen';
import AuthScreen from './AuthScreen';

const Stack = createStackNavigator();

const Navigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="Auth"
                    component={AuthScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="TodoList"
                    component={TodoScreen}
                    options={{ title: 'Todo List' }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};


export default Navigation;
