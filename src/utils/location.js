import axios from "@/utils/axios";

export function getUserPreciseLocation() {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      const options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      };

      navigator.geolocation.getCurrentPosition(
        function (position) {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
          resolve([longitude, latitude]);
        },
        function (error) {
          console.error(`Error getting location: ${error.message}`);
          reject(error);
        },
        options
      );
    } else {
      console.error("Geolocation is not supported by this browser");
      reject(new Error("Geolocation is not supported"));
    }
  });
}

export async function updateUserLocation(token) {
  try {
    const coordinates = await getUserPreciseLocation();

    await axios.put(
      "/user/updateLocation",
      {
        coordinates: coordinates,
      },
      {
        headers: {
          idToken: token,
        },
      }
    );

    console.log("User location updated successfully.");
    return Promise.resolve(true);
  } catch (error) {
    console.error("Error updating user location:", error.message);
    return Promise.reject(false);
  }
}
