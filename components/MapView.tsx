import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import classNames from "classnames";
import React, { ReactElement, useState } from "react";
import { useMap } from "../hooks/useMap";
import { useSelectedPlace } from "../hooks/useSelectedPlace";
import { useIsVisited } from "../hooks/useVisited";
import { IPlaces } from "../models/places.interface";

interface Props {
  places: IPlaces;
}

const apiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY as string;

export default function MapView({ places }: Props): ReactElement {
  const { setMap } = useMap();
  const { selectPlace } = useSelectedPlace();
  const isVisited = useIsVisited();
  const [loaded, setLoaded] = useState(false);

  const onLoad = React.useCallback(
    (map: google.maps.Map) => {
      setLoaded(true);
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
        mapContainerClassName={classNames("fixed inset-0 w-screen h-screen", {
          invisible: !loaded,
        })}
        options={{
          disableDefaultUI: true,
          clickableIcons: false,
        }}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        {places.observationTowers.map((p) => (
          <Marker
            key={p.slug}
            title={`Apžvalgos bokštai / ${p.name}`}
            position={{ lat: p.latitude, lng: p.longitude }}
            onClick={() => selectPlace?.(p)}
            icon={
              isVisited(p.slug)
                ? "/markers/visited.png"
                : "/markers/observational-tower.png"
            }
          />
        ))}
        {places.observationBuildings.map((p) => (
          <Marker
            key={p.slug}
            title={`Pastatai / ${p.name}`}
            position={{ lat: p.latitude, lng: p.longitude }}
            onClick={() => selectPlace?.(p)}
            icon={
              isVisited(p.slug)
                ? "/markers/visited.png"
                : "/markers/building.png"
            }
          />
        ))}
        {places.cognitivePaths.map((p) => (
          <Marker
            key={p.slug}
            title={`Pažintiniai takai / ${p.name}`}
            position={{ lat: p.latitude, lng: p.longitude }}
            onClick={() => selectPlace?.(p)}
            icon={
              isVisited(p.slug)
                ? "/markers/visited.png"
                : "/markers/cognitive-path.png"
            }
          />
        ))}
        {places.pedestrianTrails.map((p) => (
          <Marker
            key={p.slug}
            title={`Pesčiūjų takai / ${p.name}`}
            position={{ lat: p.latitude, lng: p.longitude }}
            onClick={() => selectPlace?.(p)}
            icon={
              isVisited(p.slug)
                ? "/markers/visited.png"
                : "/markers/pedestrian-trail.png"
            }
          />
        ))}
      </GoogleMap>
    </LoadScript>
  );
}
