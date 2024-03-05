import instance from "./axios";

export async function fetchUserData() {
  try {
    const token = localStorage.getItem("bfm-client-token");
    const response = await instance.get("/main/user", {
      headers: {
        token: token,
      },
    });

    if (response.status === 401) {
      throw new Error("You Need to Login Click Here 👆");
    } else if (response.status === 200) {
      return Promise.resolve(response?.data?.data);
    } else {
      throw new Error("Something went wrong");
    }
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function checkUserDataByToken(token) {
  try {
    const response = await instance.get("check/token", {
      headers: {
        token: token,
      },
    });

    return Promise.resolve(response?.data);
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function getSellerProfile(token) {
  try {
    const response = await instance.get("main/seller", {
      headers: {
        token: token,
      },
    });

    return Promise.resolve(response?.data);
  } catch (error) {
    return Promise.reject(error);
  }
}
