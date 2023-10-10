import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import HomePage from './src/views/Homepage';
import DetailPage from './src/views/DetailPage';
import { NavigationContainer } from "@react-navigation/native";


export default function App() {
  const Stack = createStackNavigator();



  return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomePage} />
          <Stack.Screen name="Detail" component={DetailPage} />
        </Stack.Navigator>
      </NavigationContainer>
  );
}


