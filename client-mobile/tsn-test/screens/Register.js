import { Box, Heading, VStack, Button, useToast, Center } from "native-base";
import {
  StyleSheet,
  TextInput,
  View,
  ImageBackground,
  TouchableOpacity,
  Text,
} from "react-native";
import {
  MaterialCommunityIcons,
  MaterialIcons,
  Ionicons,
} from "@expo/vector-icons";
import { useState, useEffect } from "react";
import axios from "axios";
import localAxios from "../apis/localApi"
import Loading from "../components/Loading";

export default function Register({ route, navigation }) {
  const [formRegister, setFormRegister] = useState({
    namaLengkap: "",
    email: "",
    password: "",
    nomorHP: "",
  });
  const toast = useToast();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log(formRegister);
  }, [formRegister]);

  const onRegister = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      console.log(
        {
          variables: {
            namaLengkap: formRegister.namaLengkap,
            email: formRegister.email,
            password: formRegister.password,
            nomorHP: `+62${formRegister.nomorHP}`,
          },
        },
        "SUBMIT"
      );
      const { data: register } = await localAxios.post(
        "/register",
        {
          namaLengkap: formRegister.namaLengkap,
          email: formRegister.email,
          password: formRegister.password,
          nomorHP: `+62${formRegister.nomorHP}`,
        }
      );
      console.log({ register }, "<<<<<<<<");
      if (register.error) {
        const errors = register.error;
        console.log({ errors });
        toast.show({
          status: "error",
          title: "Failed Register",
        });
      } else {
        const success = register.message;
        navigation.navigate("Login", {
          message: success,
          status: "success",
        });
      }
    } catch ({ err }) {
      console.log({ err });
      toast.show({
        status: "error",
        placement: "bottom",
        title: "Failed Register",
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loading />
  return (
    <ImageBackground
      source={{
        uri: "https://previews.123rf.com/images/elenka1/elenka11811/elenka1181100281/111406343-floral-pattern-vintage-wallpaper-in-the-baroque-style-seamless-background-white-and-blue-ornament-fo.jpg",
      }}
      style={styles.container}
    >
      <View style={styles.headerContainer}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Ionicons name="ios-arrow-back-outline" size={30} color="black" />
          </TouchableOpacity>
          <Heading style={styles.heading}>Form Register</Heading>
        </View>
      </View>
      <View style={styles.content}>
        <VStack space={3} style={styles.contentContainer}>
          <Box style={styles.sectionStyle}>
            <Ionicons
              name="ios-person-outline"
              size={24}
              color="gray"
              style={styles.iconStyle}
            />
            <TextInput
              style={styles.inputStyle}
              placeholder="Nama Lengkap"
              onChangeText={(value) =>
                setFormRegister({ ...formRegister, namaLengkap: value })
              }
            />
          </Box>
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
                setFormRegister({ ...formRegister, email: value })
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
              secureTextEntry={true}
              type="password"
              placeholder="Password"
              onChangeText={(value) =>
                setFormRegister({ ...formRegister, password: value })
              }
            />
          </Box>
          <View style={styles.inputPhone}>
            <Box style={styles.phoneLabel}>
              <Text style={{ fontSize: 18 }}>+62</Text>
            </Box>
            <Box style={styles.phoneField}>
              <TextInput
                placeholder="  Nomor HP"
                keyboardType="numeric"
                onChangeText={(value) =>
                  setFormRegister({ ...formRegister, nomorHP: value })
                }
              />
            </Box>
          </View>
          <Button mt="2" style={styles.button} onPress={onRegister}>
            <Heading style={styles.buttonText}>Buat Akun</Heading>
          </Button>
        </VStack>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  headerContainer: {
    paddingBottom: 100,
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
    paddingHorizontal: 35,
    borderStyle: "solid",
    borderColor: "black",
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
    margin: 10,
  },
  iconStyle: {
    paddingLeft: 5,
  },
  inputStyle: {
    marginLeft: 15,
    paddingRight: 180,
  },
  inputPhone: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    margin: 10,
    height: 40,
  },
  phoneLabel: {
    borderRadius: 5,
    backgroundColor: "#fff",
    borderWidth: 0.5,
    borderColor: "#000",
    paddingVertical: 7,
    paddingHorizontal: 10,
  },
  phoneField: {
    marginLeft: 15,
    borderRadius: 5,
    backgroundColor: "#fff",
    borderWidth: 0.5,
    borderColor: "#000",
    paddingVertical: 10,
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
