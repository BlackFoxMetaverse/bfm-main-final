import instance from "./axios";

export default async function fetchUserData() {
  try {
    const token = localStorage.getItem("bfm-client-token");
    const response = await instance.get("/main/user", {
      headers: {
        token: token,
      },
    });

    if (response.status === 201) {
      throw new Error("You Need to Login Click Here 👆");
    } else if (response.status === 200) {
      return response?.data?.data;
    } else {
      throw new Error("Something went wrong");
    }
  } catch (error) {
    return error?.message;
  }
}
