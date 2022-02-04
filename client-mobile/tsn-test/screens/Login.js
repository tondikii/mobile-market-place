import {
  Box,
  Heading,
  VStack,
  Button,
  HStack,
  Text,
  useToast,
} from "native-base";
import { useEffect, useState } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import {
  MaterialCommunityIcons,
  MaterialIcons,
  Ionicons,
} from "@expo/vector-icons";
import localAxios from "../apis/localApi"
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Login({ route, navigation }) {
  const toast = useToast()
  const [loading, setLoading] = useState(false)
  const [formLogin, setFormLogin] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (route.params?.status) {
      toast.show({
        title: "Register Berhasil",
        status: "success",
        placement: "top",
        description: "Kamu bisa login sekarang",
      });
    }
  }, [route.params]);

  const onLogin = async (e) => {
    try {
      e.preventDefault();
      setLoading(true)
      console.log(formLogin, "SUBMIT");
      const { data: login } = await localAxios.post(
        "/login",
        formLogin
      );
      console.log({ login });
      if (login.error) {
        const errors = login.error;
        console.log({ errors });
        toast.show({
          status: "error",
          title: "Login Gagal",
        });
      } else {
        await AsyncStorage.setItem("@access_token", login.access_token)
        navigation.navigate("Content", {
        });
      }
    } catch (err) {
      toast.show({
        title: "Login Gagal",
        status: "error",
        placement: "top",
        description: "Invalid email/password"
      });
    } finally {
      setLoading(false)
    }
  };

  useEffect(() => {
    console.log(formLogin);
  }, [formLogin]);

  return (
    // <View style={styles.container}>
    <ImageBackground
      source={{
        uri: "https://previews.123rf.com/images/elenka1/elenka11811/elenka1181100281/111406343-floral-pattern-vintage-wallpaper-in-the-baroque-style-seamless-background-white-and-blue-ornament-fo.jpg",
      }}
      style={styles.container}
    >
      <View style={styles.headerContainer}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.navigate("Register")}>
            <Ionicons name="ios-arrow-back-outline" size={30} color="black" />
          </TouchableOpacity>
          <Heading style={styles.heading}>Form Login</Heading>
        </View>
      </View>
      <View style={styles.content}>
        <VStack space={3} style={styles.contentContainer}>
          <Box style={styles.sectionStyle}>
            <MaterialCommunityIcons
              name="email-outline"
              size={24}
              color="gray"
              style={styles.iconStyle}
            />
            <TextInput
              style={styles.inputStyle}
              placeholder="Email"
              onChangeText={(value) =>
                setFormLogin({ ...formLogin, email: value })
              }
            />
          </Box>
          <Box style={styles.sectionStyle}>
            <MaterialIcons
              name="lock-outline"
              size={24}
              color="gray"
              style={styles.iconStyle}
            />
            <TextInput
              style={styles.inputStyle}
              type="password"
              placeholder="Password"
              secureTextEntry={true}
              onChangeText={(value) =>
                setFormLogin({ ...formLogin, password: value })
              }
            />
          </Box>
          <Button mt="2" style={styles.button} onPress={onLogin}>
            <Heading style={styles.buttonText}>Masuk</Heading>
          </Button>
          <HStack mt="6" justifyContent="center">
            <Text
              onPress={() => navigation.navigate("Register")}
              style={styles.toRegister}
            >
              Buat akun
            </Text>
          </HStack>
        </VStack>
      </View>
    </ImageBackground>
    // </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    // justifyContent: "center",
  },
  headerContainer: {
    paddingBottom: 200,
    alignSelf: "flex-start",
    marginTop: 50,
    marginLeft: 25,
  },
  heading: {
    color: "#275ab3",
    marginTop: 25,
  },
  image: {
    height: 350,
    width: "full",
  },
  content: {
    paddingHorizontal: 50,
    borderStyle: "solid",
    // borderTopWidth: 1,
    // borderLeftWidth: 1,
    // borderRightWidth: 1,
    borderColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: "white",
    paddingBottom: 500,
  },
  contentContainer: {
    paddingTop: 50,
  },
  sectionStyle: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderWidth: 0.5,
    borderColor: "#000",
    height: 40,
    borderRadius: 5,
    marginVertical: 10,
  },
  iconStyle: {
    paddingLeft: 5,
  },
  inputStyle: {
    marginLeft: 15,
    paddingRight: 180,
  },
  toRegister: {
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
  button: {
    backgroundColor: "#275ab3",
  },
  buttonText: {
    fontSize: 16,
    color: "white",
  },
});
