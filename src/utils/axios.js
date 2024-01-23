import axios from "axios";

const instance = axios.create({
  baseURL: "https://form.blackfoxmetaverse.io/api/user",
  // baseURL: "http://localhost:4000/user",
});

export default instance;
