import { useCallback } from "react";
import { IPlace } from "../models/place.interface";

let map: google.maps.Map | null;

export function useMap() {
  const setMap = useCallback((v: google.maps.Map | null) => {
    map = v;
  }, []);

  const focusMarker = useCallback((place: IPlace) => {
    const bounds = new google.maps.LatLngBounds();
    bounds.extend({ lat: place.latitude, lng: place.longitude });

    const offset = 0.02;
    const center = bounds.getCenter();
    bounds.extend(
      new google.maps.LatLng(center.lat() + offset, center.lng() + offset)
    );
    bounds.extend(
      new google.maps.LatLng(center.lat() - offset, center.lng() - offset)
    );

    map?.fitBounds(bounds, {
      left: 320 + 64,
    });
  }, []);

  return { map, setMap, focusMarker };
}
