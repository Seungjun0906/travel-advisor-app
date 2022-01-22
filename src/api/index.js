import axios from "axios";

const getPlacesData = async (sw, ne, type) => {
  try {
    const options = {
      params: {
        bl_latitude: sw.lat,
        bl_longitude: sw.lng,
        tr_latitude: ne.lat,
        tr_longitude: ne.lng,
      },
      headers: {
        "x-rapidapi-host": "travel-advisor.p.rapidapi.com",
        "x-rapidapi-key": process.env.REACT_APP_RAPIDAPI_API_KEY,
      },
    };
    const { data } = await axios.get(
      `https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`,
      options
    );

    return data.data;
  } catch (err) {
    console.log(err);
  }
};

export { getPlacesData };
