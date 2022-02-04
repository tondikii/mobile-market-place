import Login from "./screens/Login";
import Register from "./screens/Register";
import Content from "./screens/Content";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NativeBaseProvider } from "native-base";
// import { ApolloProvider } from "@apollo/client";
// import client from "./config";

export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    // <ApolloProvider client={client}>
      <NativeBaseProvider>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="Content" component={Content} />
          </Stack.Navigator>
        </NavigationContainer>
      </NativeBaseProvider>
    /* </ApolloProvider> */
  );
}
