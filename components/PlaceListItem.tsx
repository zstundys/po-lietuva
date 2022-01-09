import React, { ReactElement } from "react";
import { IPlace } from "../models/place.interface";

interface Props {
  place: IPlace;
}

export default function PlaceListItem({ place }: Props): ReactElement {
  return (
    <div className="py-1 ">
      {place.name} <br />
      {place.latitude} {place.longitude}
    </div>
  );
}
