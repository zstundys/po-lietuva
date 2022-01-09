import { GoogleMap, LoadScript } from "@react-google-maps/api";
import React, { ReactElement } from "react";

interface Props {}

export default function MapView({}: Props): ReactElement {
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
        {/* Child components, such as markers, info windows, etc. */}
        <></>
      </GoogleMap>
    </LoadScript>
  );
}
