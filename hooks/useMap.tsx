import { useCallback } from "react";
import { IPlace } from "../models/place.interface";

let map: google.maps.Map | null;

export function useMap() {
  const setMap = useCallback((v: google.maps.Map | null) => {
    map = v;
  }, []);

  const focusMarker = useCallback((place: IPlace) => {
    map?.panTo({ lat: place.latitude, lng: place.longitude });
    const zoomLevel = map?.getZoom() || 0;

    if (zoomLevel < 12) {
      map?.setZoom(12);
    }
  }, []);

  return { map, setMap, focusMarker };
}
