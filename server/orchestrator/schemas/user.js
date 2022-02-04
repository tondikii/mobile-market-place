const { gql } = require("apollo-server");
const axios = require("axios");

const typeDefs = gql`
  type AccessToken {
    access_token: String
    error: String
  }

  type Message {
    message: String
    error: String
  }

  type Mutation {
    register(email: String password: String namaLengkap: String nomorHP: String): Message
    login(email: String password: String): AccessToken
  }
`;

const resolvers = {
  Mutation: {
    register: async (_, args) => {
      try {
        console.log(args);
        const { data: user } = await axios.post(
          "https://tsn-test-mobile.herokuapp.com/register",
          args
        );
        console.log({data});
        return { message: "Sign Up Succesful" };
      } catch (err) {
        console.log(err);
        return { error: "error register" };
      }
    },
    login: async (_, args) => {
      try {
        console.log(args);
        const { data } = await axios.post(
          "https://tsn-test-mobile.herokuapp.com/login",
          args
        );
        return data;
      } catch (err) {
        console.log(err);
        return { error: "error login" };
      }
    },
  },
};

module.exports = { typeDefs, resolvers };