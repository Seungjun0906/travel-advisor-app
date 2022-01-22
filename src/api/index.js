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
        "x-rapidapi-key": "3883905021mshc654b899be3c9cfp192f92jsn36e4d6fdf2f9",
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
