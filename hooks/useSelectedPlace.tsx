import { createContext, useContext, useEffect, useRef } from "react";
import { IPlace } from "../models/place.interface";

interface ISelectedPlaceContext {
  place?: IPlace;
  setPlace?: (place: IPlace) => void;
}

export const SelectedPlaceContext = createContext<ISelectedPlaceContext>({
  place: undefined,
  setPlace: undefined,
});

export function useSelectedPlace() {
  const selectedValue = useContext(SelectedPlaceContext);

  return {
    selectedPlace: selectedValue.place,
    selectPlace: selectedValue.setPlace,
  };
}

export function useSelectedPlaceChanged(cb: (place: IPlace) => void) {
  const { selectedPlace } = useSelectedPlace();
  const placeRef = useRef(selectedPlace);

  useEffect(() => {
    if (placeRef.current !== selectedPlace && selectedPlace) {
      placeRef.current = selectedPlace;
      cb(selectedPlace);
    }
  }, [cb, selectedPlace]);
}
