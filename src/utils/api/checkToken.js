import axios from "../axios";

export default async function checkToken(token) {
  try {
    const response = await axios.get("/check/token", {
      headers: { token: token },
    });
    const { uid, phone_number, isUser, isSeller, data } = response.data;
    let { seller, user } = data;

    if (isSeller && seller.images.length <= 6) {
      let arr = Array(6).fill(null);
      for (let i = 0; i < seller.images.length; i++) {
        arr[i] = seller.images[i];
      }
      seller.images = arr;
    }

    return Promise.resolve({ uid, phone_number, isSeller, seller });
  } catch (error) {
    return Promise.reject(error);
  }
}
