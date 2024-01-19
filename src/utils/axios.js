import axios from "axios";

const instance = axios.create({
  baseURL: "http://3.110.249.51/api",
  // baseURL: "http://localhost:4000",
});

export default instance;
