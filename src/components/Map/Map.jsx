import React from "react";
import GoogleMapReact from "google-map-react";
import { Paper, Typography, useMediaQuery } from "@material-ui/core";
import { LocationOnOutlined } from "@material-ui/icons";
import { Rating } from "@material-ui/lab";

import useStyles from "./styles";

const GOOGLEMAP_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

const Map = ({ setCoords, setBounds, coords, places, setChildClicked }) => {
  const classes = useStyles();
  const isDesktop = useMediaQuery("(min-width:600px)");

  const childClickHandler = (child) => {
    setChildClicked(child);
  };

  return (
    <div className={classes.mapContainer}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: GOOGLEMAP_KEY }}
        defaultCenter={coords}
        center={coords}
        defaultZoom={14}
        margin={[50, 50, 50, 50]}
        options={""}
        onChange={(e) => {
          setCoords({ lat: e.center.lat, lng: e.center.lng });
          setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw });
        }}
        onChildClick={childClickHandler}
      >
        {places?.map((place, i) => {
          // console.log(place);
          return (
            <div
              className={classes.markerContainer}
              lat={Number(place.latitude)}
              lng={Number(place.longitude)}
              key={i}
            >
              {!isDesktop ? (
                <LocationOnOutlined color="secondary" fontSize="large" />
              ) : (
                <Paper elevation={3} className={classes.paper}>
                  <Typography
                    className={classes.typography}
                    variant="subtitle2"
                    gutterBottom
                  >
                    {place.name}
                  </Typography>
                  <img
                    className={classes.pointer}
                    src={
                      place.photo
                        ? place.photo.images.large.url
                        : "https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg"
                    }
                    alt={place.name}
                  />
                  <Rating size="small" value={Number(place.rating)} readOnly />
                </Paper>
              )}
            </div>
          );
        })}
      </GoogleMapReact>
    </div>
  );
};

export default Map;
