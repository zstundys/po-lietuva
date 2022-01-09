import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import React, { ReactElement } from "react";
import { IPlaces } from "../models/places.interface";

interface Props {
  places: IPlaces;
}

export default function MapView({ places }: Props): ReactElement {
  const [map, setMap] = React.useState(null);

  const onLoad = React.useCallback(function callback(map) {
    // const bounds = new window.google.maps.LatLngBounds();
    // map.fitBounds();
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  return (
    <LoadScript googleMapsApiKey="AIzaSyA_BAxuHmv7DgwTh2KDAtAbQanTItTNE_A">
      <GoogleMap
        mapContainerClassName="w-screen h-screen"
        center={{
          lat: 55.1214873,
          lng: 24.2983297,
        }}
        zoom={8}
        options={{ streetViewControl: false, mapTypeControl: false }}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        {places.observationTowers.map((p) => (
          <Marker
            key={p.slug}
            position={{ lat: p.latitude, lng: p.longitude }}
            icon={"/markers/observational-tower.svg"}
          />
        ))}
        {places.observationBuildings.map((p) => (
          <Marker
            key={p.slug}
            position={{ lat: p.latitude, lng: p.longitude }}
            icon={"/markers/building.svg"}
          />
        ))}
        {places.cognitivePaths.map((p) => (
          <Marker
            key={p.slug}
            position={{ lat: p.latitude, lng: p.longitude }}
            icon={"/markers/cognitive-path.svg"}
          />
        ))}
        {places.pedestrianTrails.map((p) => (
          <Marker
            key={p.slug}
            position={{ lat: p.latitude, lng: p.longitude }}
            icon={"/markers/pedestrian-trail.svg"}
          />
        ))}
      </GoogleMap>
    </LoadScript>
  );
}