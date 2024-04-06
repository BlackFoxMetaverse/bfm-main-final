import instance from "./axios";
import { getUserPreciseLocation } from "./location";

async function getCity() {
  try {
    const location = await getUserPreciseLocation();

    const response = await instance.get(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.latitude},${location.longitude}&key=AIzaSyC1grh5x3O9oQt5Qa79sbzdeffrKL9qjko`
    );

    const data = response.data.plus_code.compound_code;

    const dataArr = data.split(",");
    const cityArr = dataArr[0].split(" ");
    const city = cityArr[1];
    const country = dataArr[2];

    const address = country ? `${city}, ${country}` : `${city}`;

    return Promise.resolve(address);
  } catch (error) {
    return Promise.reject(error);
  }
}

export default getCity;
