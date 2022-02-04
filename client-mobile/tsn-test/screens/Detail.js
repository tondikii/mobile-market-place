import { View, Text, StyleSheet, Image } from "react-native";
import { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { rupiah } from "../helpers/currencyFormatter";
import { Ionicons } from "@expo/vector-icons";
import {
  VStack,
  Radio,
  Button,
  HStack,
  Heading,
  Modal,
  useToast,
} from "native-base";
import localAxios from "../apis/localApi";
import Loading from "../components/Loading";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Profile({ navigation, route }) {
  const toast = useToast();
  const { id } = route.params;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(async () => {
    const access_token = await AsyncStorage.getItem("@access_token");
    const { data: product } = await localAxios.get(`/products/${id}`, {
      headers: { access_token },
    });
    // console.log({ product });
    setProduct(product);
  }, []);
  const [formProduct, setFormProduct] = useState({
    kelamin: "",
    ukuran: "",
  });
  const [showModal, setShowModal] = useState(false);
  // useEffect(() => {
  //   console.log(formProduct);
  // }, [formProduct]);

  const onSubmit = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      console.log(formProduct, "SUBMIT");
      const access_token = await AsyncStorage.getItem("@access_token");
      const { data: userProduct } = await localAxios.post(
        `/user-products/${id}`,
        { kelamin: formProduct.kelamin, size: formProduct.ukuran },
        { headers: { access_token } }
      );
      console.log({ userProduct }, "<<<<<<<");
      if (userProduct.error) {
        console.log("masuk error");
        const errors = userProduct.error;
        console.log({ errors });
        toast.show({
          status: "error",
          title: "Gagal tambah produk ke keranjang",
          placement: "top",
        });
      } else {
        console.log("show modal");
        setShowModal(true);
      }
    } catch (err) {
      toast.show({
        status: "error",
        title: "Gagal tambah produk ke keranjang",
        placement: "top",
      });
    } finally {
      setLoading(false);
    }
  };

  if (!product || loading) return <Loading />;
  return (
    <View style={styles.container}>
      <Text style={{ color: "gray" }}>
        ________________________________________________________
      </Text>
      <Image source={{ uri: product.imageURL }} style={styles.img} />
      <VStack space={3} style={styles.caption}>
        <Text style={{ fontSize: 22, fontWeight: "bold" }}>{product.name}</Text>
        <Text style={{ fontSize: 16, color: "black" }}>{`RP${rupiah(
          product.price
        )}`}</Text>
      </VStack>
      <VStack space={3} style={styles.caption}>
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>
          Pilih jenis kelamin
        </Text>
        <Radio.Group
          name="myRadioGroup"
          accessibilityLabel="Pick your favorite number"
          onChange={(value) =>
            setFormProduct({ ...formProduct, kelamin: value })
          }
        >
          <Radio value="Pria" my={1}>
            Pria
          </Radio>
          <Radio value="Wanita" my={1}>
            Wanita
          </Radio>
        </Radio.Group>
        <Text style={{ fontSize: 18, color: "black", fontWeight: "bold" }}>
          Pilih ukuran
        </Text>
        <HStack space={3} style={styles.buttonContainer}>
          {formProduct.ukuran === "S" ? (
            <Button style={styles.choosenButton}>
              <Text style={styles.choosenInnerButton}>S</Text>
            </Button>
          ) : (
            <Button
              style={styles.button}
              onPress={() => setFormProduct({ ...formProduct, ukuran: "S" })}
            >
              <Text style={styles.innerButton}>S</Text>
            </Button>
          )}
          {formProduct.ukuran === "M" ? (
            <Button style={styles.choosenButton}>
              <Text style={styles.choosenInnerButton}>M</Text>
            </Button>
          ) : (
            <Button
              style={styles.button}
              onPress={() => setFormProduct({ ...formProduct, ukuran: "M" })}
            >
              <Text style={styles.innerButton}>M</Text>
            </Button>
          )}
          {formProduct.ukuran === "L" ? (
            <Button style={styles.choosenButton}>
              <Text style={styles.choosenInnerButton}>L</Text>
            </Button>
          ) : (
            <Button style={styles.button}>
              <Text
                style={styles.innerButton}
                onPress={() => setFormProduct({ ...formProduct, ukuran: "L" })}
              >
                L
              </Text>
            </Button>
          )}
          {formProduct.ukuran === "XL" ? (
            <Button style={styles.choosenButton}>
              <Text style={styles.choosenInnerButton}>XL</Text>
            </Button>
          ) : (
            <Button
              style={styles.button}
              onPress={() => setFormProduct({ ...formProduct, ukuran: "XL" })}
            >
              <Text style={styles.innerButton}>XL</Text>
            </Button>
          )}
        </HStack>
      </VStack>
      <View style={styles.footer}>
        {!formProduct.ukuran || !formProduct.kelamin ? (
          <Button
            style={styles.keranjangButtonDisable}
            leftIcon={<Ionicons name="add" size={26} color="white" />}
          >
            <Heading style={{ fontSize: 16, color: "white" }}>
              Keranjang
            </Heading>
          </Button>
        ) : (
          <Button
            style={styles.keranjangButton}
            leftIcon={<Ionicons name="add" size={26} color="white" />}
            onPress={onSubmit}
          >
            <Heading style={{ fontSize: 16, color: "white" }}>
              Keranjang
            </Heading>
          </Button>
        )}
        <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
          <Modal.Content style={styles.modal}>
            <Modal.CloseButton />
            <Modal.Header>
              <Image
                source={{
                  uri: "https://ik.imagekit.io/fnzl2pmmqv2d/undraw_shopping_app_flsj_uk-2CXgzGcc.png?ik-sdk-version=javascript-1.4.3&updatedAt=1643925813078",
                }}
                style={styles.modalImage}
              />
              <Heading style={styles.modalTitle}>
                Produk berhasil ditambahkan
              </Heading>
              <Text style={styles.modalCaption}>
                Cek keranjangmu untuk lihat produk
              </Text>
              <Button
                style={styles.modalButton}
                onPress={() => navigation.navigate("Keranjang")}
              >
                <Heading style={{ fontSize: 16, color: "white" }}>
                  Lihat keranjang
                </Heading>
              </Button>
            </Modal.Header>
          </Modal.Content>
        </Modal>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    // justifyContent: "center",
  },
  img: {
    marginTop: 10,
    borderColor: "black",
    width: "50%",
    height: 200,
  },
  caption: {
    paddingVertical: 20,
    alignSelf: "flex-start",
    borderBottomWidth: 1,
    borderColor: "gray",
    width: "100%",
    paddingLeft: 15,
  },
  text: {
    fontWeight: "bold",
    fontSize: 20,
  },
  buttonContainer: {
    flexDirection: "row",
  },
  button: {
    width: 50,
    backgroundColor: "#fff",
    borderWidth: 0.5,
    borderColor: "gray",
  },
  innerButton: {
    color: "gray",
  },
  choosenButton: {
    width: 50,
    // backgroundColor: "primary",
    borderWidth: 1,
    borderColor: "black",
  },
  choosenInnerButton: {
    color: "white",
  },
  footer: {
    width: "100%",
    borderTopColor: "black",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    marginTop: 110,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowRadius: 50,
    shadowOpacity: 1.0,
    elevation: 1,
  },
  keranjangButton: {
    flexDirection: "row",
    marginTop: 15,
    backgroundColor: "#275ab3",
    marginHorizontal: 12.5,
  },
  keranjangButtonDisable: {
    flexDirection: "row",
    marginTop: 15,
    backgroundColor: "gray",
    marginHorizontal: 12.5,
  },
  modal: {
    width: 350,
    justifyContent: "center",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 16,
    textAlign: "center",
  },
  modalCaption: {
    fontSize: 14,
    color: "gray",
    textAlign: "center",
  },
  modalButton: {
    marginTop: 20,
    backgroundColor: "#275ab3",
  },
  modalImage: {
    marginTop: 10,
    width: 200,
    height: 150,
    alignSelf: "center",
  },
});
