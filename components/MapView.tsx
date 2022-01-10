import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import React, { ReactElement } from "react";
import { useMap } from "../hooks/useMap";
import { useIsVisited } from "../hooks/useVisited";
import { IPlaces } from "../models/places.interface";

interface Props {
  places: IPlaces;
}

const apiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY as string;

export default function MapView({ places }: Props): ReactElement {
  const { setMap } = useMap();
  const isVisited = useIsVisited();

  const onLoad = React.useCallback(
    (map: google.maps.Map) => {
      map.setCenter({ lat: 55.1214873, lng: 22.7983297 });
      map.setZoom(8);
      setMap(map);
    },
    [setMap]
  );

  const onUnmount = React.useCallback(() => {
    setMap(null);
  }, [setMap]);

  return (
    <LoadScript googleMapsApiKey={apiKey}>
      <GoogleMap
        mapContainerClassName="w-screen h-screen"
        options={{ streetViewControl: false, mapTypeControl: false }}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        {places.observationTowers.map((p) => (
          <Marker
            key={p.slug}
            title={`Apžvalgos bokštai / ${p.name}`}
            clickable={false}
            position={{ lat: p.latitude, lng: p.longitude }}
            icon={
              isVisited(p.slug)
                ? "/markers/visited.svg"
                : "/markers/observational-tower.svg"
            }
          />
        ))}
        {places.observationBuildings.map((p) => (
          <Marker
            key={p.slug}
            title={`Pastatai / ${p.name}`}
            clickable={false}
            position={{ lat: p.latitude, lng: p.longitude }}
            icon={
              isVisited(p.slug)
                ? "/markers/visited.svg"
                : "/markers/building.svg"
            }
          />
        ))}
        {places.cognitivePaths.map((p) => (
          <Marker
            key={p.slug}
            title={`Pažintiniai takai / ${p.name}`}
            clickable={false}
            position={{ lat: p.latitude, lng: p.longitude }}
            icon={
              isVisited(p.slug)
                ? "/markers/visited.svg"
                : "/markers/cognitive-path.svg"
            }
          />
        ))}
        {places.pedestrianTrails.map((p) => (
          <Marker
            key={p.slug}
            title={`Pesčiūjų takai / ${p.name}`}
            clickable={false}
            position={{ lat: p.latitude, lng: p.longitude }}
            icon={
              isVisited(p.slug)
                ? "/markers/visited.svg"
                : "/markers/pedestrian-trail.svg"
            }
          />
        ))}
      </GoogleMap>
    </LoadScript>
  );
}
