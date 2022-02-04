import AsyncStorage from "@react-native-async-storage/async-storage";
import { NativeBaseProvider, Box, Text, ScrollView } from "native-base";
import {
  FlatList,
  StyleSheet,
  StatusBar,
  Image,
  Dimensions,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { rupiah } from "../helpers/currencyFormatter";
import "intl";
import { useEffect, useState } from "react";
import localAxios from "../apis/localApi"
import Loading from "../components/Loading";

export const ProductsScreen = ({ navigation }) => {
  // const [access_token, setAccessToken] = useState("")
  const [products, setProducts] = useState(null)
  useEffect(async () => {
    const access_token = await AsyncStorage.getItem("@access_token")
    const {data: products} = await localAxios.get("/products", {headers: {access_token}})
    console.log({products});
    setProducts(products)
  }, []);
  // const products = [
  //   {
  //     id: 1,
  //     imageURL:
  //       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROphMpUbR96TPTBDZCABP2ujlUaW-5_XNKPy8ZypoFx5pqa3_47s8MHGJwQQh6x5R4FT8&usqp=CAU",
  //     name: "Baju polos hitam",
  //     price: 150000,
  //   },
  //   {
  //     id: 2,
  //     imageURL:
  //       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVnoWj5B5F9K3S6MW26RyyCFWTfmvaS9ZapenfRsew-J8JJ1Kf5cY1eqX0RnorJp-abo8&usqp=CAU",
  //     name: "Baju polos putih",
  //     price: 150000,
  //   },
  //   {
  //     id: 3,
  //     imageURL:
  //       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRESTmAdM4ZABN9c1BDd2SKjmqCmR2SfdUavQ&usqp=CAU",
  //     name: "Celana Jeans",
  //     price: 250000,
  //   },
  //   {
  //     id: 4,
  //     imageURL:
  //       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRR8CqX56VOC7_tXrqXqURseZxFzTMQgKM7dQ&usqp=CAU",
  //     name: "Jaket Bomber",
  //     price: 350000,
  //   },
  // ];
  const { width } = Dimensions.get("window");

  if(!products) return <Loading/>
  const ProductCard = ({ item}) => {
    return (
      <Box p="5" style={{ width: width / 2 }}>
        <TouchableOpacity onPress={() => navigation.navigate("Detail Produk", {id: item.id})}>
          <Box mb="2">
            <Image
              source={{ uri: item.imageURL }}
              style={{ width: "100%", height: 200, borderRadius: 10 }}
            ></Image>
          </Box>

          <Box flex={1}>
            <Text textAlign="center" mb="1" fontWeight="bold">
              {item.name}
            </Text>
            <Text textAlign="center">{`RP${rupiah(item.price)}`}</Text>
          </Box>
        </TouchableOpacity>
      </Box>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Box
        p="5"
        justifyContent="space-between"
        flexDirection="row"
        alignItems="center"
      >
        <Box style={styles.sectionStyle}>
          <Feather
            name="search"
            size={24}
            color="gray"
            style={{ paddingLeft: 5 }}
          />
          <TextInput
            style={styles.inputStyle}
            placeholder="Cari Produk"
            onChangeText={(value) =>
              setFormLogin({ ...formLogin, email: value })
            }
          />
        </Box>
      </Box>
      <Box>
        <Box>
          <FlatList
            numColumns={2}
            data={products}
            renderItem={ProductCard}
            keyExtractor={(item) => item.id}
          />
        </Box>
      </Box>
    </ScrollView>
  );
};

export default ProductsScreen;
const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    height: "100%",
  },
  sectionStyle: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: "#fff",
    borderWidth: 0.5,
    borderColor: "#000",
    height: 40,
    borderRadius: 5,
    marginVertical: 10,
  },
  inputStyle: {
    marginLeft: 15,
    paddingRight: 235,
  },
});
