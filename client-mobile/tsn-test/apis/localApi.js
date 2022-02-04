import axios from "axios";
const instance = axios.create({
  baseURL: "https://tsn-test-mobile.herokuapp.com/"
})
export default instance