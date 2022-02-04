import Shop from "./Shop";
import Detail from "./Detail"
import Keranjang from "./Keranjang";
import { AntDesign } from '@expo/vector-icons'; 
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Touchable, TouchableOpacity } from "react-native";

export default function Content({navigation}) {
  const Stack = createNativeStackNavigator();
  return (
        <Stack.Navigator >
          <Stack.Screen name="Shop" component={Shop} options={{headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate("Keranjang")}>
              <AntDesign name="shoppingcart" size={28} color="black" />
            </TouchableOpacity>
          ),}}/>
          <Stack.Screen name="Detail Produk" component={Detail} options={{headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate("Keranjang")}>
              <AntDesign name="shoppingcart" size={28} color="black" />
            </TouchableOpacity>
          ), headerShadowVisible: false, headerTitleAlign: "center"}}/>
          <Stack.Screen name="Keranjang" component={Keranjang} options={{headerRight: () => (
              <AntDesign name="shoppingcart" size={28} color="black" />
          ), headerShadowVisible: false, headerTitleAlign: "center"}}/>
        </Stack.Navigator>
  );
}

