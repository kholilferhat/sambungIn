import { createStackNavigator } from '@react-navigation/stack';
import HomePage from './src/views/Homepage';
import DetailPage from './src/views/DetailPage';
import { NavigationContainer } from "@react-navigation/native";
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { SafeAreaProvider } from 'react-native-safe-area-context';


const client = new ApolloClient({
  uri: 'https://7b5f-123-253-232-191.ngrok-free.app/',
  cache: new InMemoryCache(),
});

export default function App() {
  const Stack = createStackNavigator();


  return (
    <ApolloProvider client={client}>
      <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator
          screenOptions={{
            headerShown: false
          }}
          >

            <Stack.Screen name="Home" component={HomePage} />
            <Stack.Screen
              name="Detail"
              component={DetailPage}
          />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </ApolloProvider>
  );
}


