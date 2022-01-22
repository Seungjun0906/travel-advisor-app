import React, { useState, useEffect } from "react";
import { CssBaseline, Grid } from "@material-ui/core";

import { getPlacesData } from "./api/index";

import Header from "./components/Header/Header";
import List from "./components/List/List";
import Map from "./components/Map/Map";

const App = () => {
  const [places, setPlaces] = useState();
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const [coords, setCoords] = useState({});
  const [bounds, setBounds] = useState({});
  const [type, setType] = useState("restaurants");
  const [rating, setRating] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [childClicked, setChildClicked] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({ coords }) => {
      setCoords({
        lat: coords.latitude,
        lng: coords.longitude,
      });
    });
  }, []);

  useEffect(() => {
    const filteredPlaces = places?.filter((place) => place.rating > rating);

    setFilteredPlaces(filteredPlaces);
  }, [rating]);

  useEffect(() => {
    setIsLoading(!isLoading);
    // console.log(coords, bounds);
    if (bounds.sw && bounds.ne) {
      getPlacesData(bounds.sw, bounds.ne, type).then((data) => {
        setPlaces(data?.filter((place) => place.name && place.num_reviews > 0));
        setFilteredPlaces([]);
        setIsLoading(!isLoading);
      });
    }
  }, [bounds, type]);
  return (
    <>
      <CssBaseline />
      <Header setCoords={setCoords} />
      <Grid container spacing={3} style={{ width: "100%" }}>
        <Grid item xs={12} md={4}>
          <List
            places={filteredPlaces?.length ? filteredPlaces : places}
            childClicked={childClicked}
            isLoading={isLoading}
            type={type}
            setType={setType}
            rating={rating}
            setRating={setRating}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <Map
            setCoords={setCoords}
            setBounds={setBounds}
            coords={coords}
            places={filteredPlaces?.length ? filteredPlaces : places}
            setChildClicked={setChildClicked}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default App;
