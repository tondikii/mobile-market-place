require("dotenv").config()
const { ApolloServer, gql } = require("apollo-server");
const axios = require("axios");
const redis = require("./redis")

const typeDefs = gql`
  type Message {
    message: String
  }

  type User {
    id: ID
    email: String
    nomorHP: String
    namaLengkap: String
  }

  type Product {
    id: ID
    name: String
    price: String
    imageURL: String
  }

  type UserProduct {
    id: ID
    UserId: ID
    ProductId: ID
    size: String
    kelamin: String
    User: User
    Product: Product
  }

  type AccessToken {
    access_token: String
  }

  type Query {
    getProducts(access_token: String): [Product]
    getDetail(
      access_token: String
      id: ID
    ): Product
    getUserProducts(
      access_token: String
    ): [UserProduct]
  }

  type Mutation {
    register(
      email: String
      password: String
      namaLengkap: String
      nomorHP: String
    ): Message
    login(
      email: String
      password: String
    ): AccessToken
    addUserProduct(
      access_token: String
      ProductId: ID
      size: String
      kelamin: String
    ): Message
  }
`;

const resolvers = {
  Query: {
    getProducts: async (_, args) => {
      try {
        console.log(args);
        const { data } = await axios.get("https://tsn-test-mobile.herokuapp.com/products", {headers: args});
        console.log({ data });
        return data
      } catch (err) {
        return err
      }
    },
    getDetail: async (_, args) => {
      try {
        console.log(args);
        const { data } = await axios.get(`https://tsn-test-mobile.herokuapp.com/products/${args.id}`, {headers: args});
        console.log({ data });
        return data
      } catch (err) {
        return err
      }
    },
    getUserProducts: async (_, args) => {
      try {
        console.log(args);
        const { data } = await axios.get(`https://tsn-test-mobile.herokuapp.com/user-products`, {headers: args});
        console.log({ data });
        return data
      } catch (err) {
        return err
      }
    },
  },
  Mutation: {
    login: async (_, args) => {
      try {
        console.log(args);
        const { data } = await axios.post("https://tsn-test-mobile.herokuapp.com/login", args);
        console.log({ data });
        return data
      } catch (err) {
        return err
      }
    },
    register: async (_, args) => {
      try {
        console.log(args);
        const { data } = await axios.post("https://tsn-test-mobile.herokuapp.com/register", args);
        console.log({ data });
        return {message: "sukses register"}
      } catch (err) {
        return err
      }
    },
    addUserProduct: async (_, args) => {
      try {
        console.log(args);
        const { data } = await axios.post(`https://tsn-test-mobile.herokuapp.com/user-products/${args.ProductId}`, args, {headers: {access_token: args.access_token}});
        console.log({ data });
        return {message: "sukses menambahkan produk ke keranjang"}
      } catch (err) {
        return err
      }
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
