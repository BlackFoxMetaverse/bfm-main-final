import axios from "axios";

const instance = axios.create({
  // baseURL: "https://form.blackfoxmetaverse.io/api",
  // baseURL: "http://localhost:4000",
  baseURL: "http://3.110.249.51/api",
});

export default instance;
