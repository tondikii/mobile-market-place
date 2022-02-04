import { View, StyleSheet, SafeAreaView, Image } from "react-native";
import { StatusBar } from "expo-status-bar";
import {FlatList, Heading, Box,HStack, VStack, Text, Avatar, Spacer} from "native-base"
import { rupiah } from "../helpers/currencyFormatter";
import localAxios from "../apis/localApi";
import Loading from "../components/Loading";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useEffect } from "react";

export default function Keranjang({ navigation }) {
  const [userProducts, setUserProducts] = useState(null)

  useEffect(async () => {
    const access_token = await AsyncStorage.getItem("@access_token");
    const { data: userProducts } = await localAxios.get("/user-products", {
      headers: { access_token },
    });
    console.log({ userProduct: userProducts[0].Product });
    setUserProducts(userProducts);
  }, []);
  if(!userProducts) return <Loading/>

  return (
    <Box backgroundColor={"white"} flex={1} alignItems="center">
      <Text style={{ color: "gray" }}>
        ________________________________________________________
      </Text>
      <FlatList
        data={userProducts}
        renderItem={({ item }) => (
          <Box
            borderWidth="1"
            borderRadius={10}
            _dark={{
              borderColor: "gray.600",
            }}
            borderColor="coolGray.200"
            py="2"
            // marginX={10}
            alignItems="center"
          >
            <HStack space={3} justifyContent="flex-start" width={350}>
              <Image
                style={styles.image}
                source={{
                  uri: item.Product.imageURL,
                }}
              />
              <VStack>
                <Text
                  _dark={{
                    color: "warmGray.50",
                  }}
                  color="coolGray.800"
                  bold
                >
                  {item.Product.name}
                </Text>
                <Text>
                  Size: <Text fontWeight={"bold"}>{item.size}</Text>
                </Text>
                <Text
                  color="coolGray.600"
                  _dark={{
                    color: "warmGray.200",
                  }}
                >
                  RP{`${rupiah(item.Product.price)}`}
                </Text>
              </VStack>
            </HStack>
          </Box>
        )}
        keyExtractor={(item) => item.id}
      />
    </Box>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  image: {
    width: "25%",
    height: 75
  }
});
