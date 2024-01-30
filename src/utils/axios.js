import axios from "axios";

const instance = axios.create({
  // baseURL: "https://form.blackfoxmetaverse.io/api",
  baseURL: "http://localhost:4000",
});

export default instance;
