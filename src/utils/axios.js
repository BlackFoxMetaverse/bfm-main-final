import axios from "axios";

const instance = axios.create({
  // baseURL: "https://form.blackfoxmetaverse.io/api",
  // baseURL: "http://localhost:4000",
  baseURL: "http://3.110.249.51/api",
  // baseURL: "https://boar-trusting-urgently.ngrok-free.app",
});

export default instance;
