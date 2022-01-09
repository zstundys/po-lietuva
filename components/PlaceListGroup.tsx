import React, { ReactElement } from "react";
import { IPlace } from "../models/place.interface";
import PlaceListItem from "./PlaceListItem";

interface Props {
  name: string;
  places: IPlace[];
}

export default function PlaceListGroup({ name, places }: Props): ReactElement {
  return (
    <>
      <p className="text-slate-500 text-xl">{name}</p>
      <ul>
        {places.map((p) => (
          <li
            className="border-t border-t-slate-300 first:border-t-0"
            key={p.slug}
          >
            <PlaceListItem place={p} />
          </li>
        ))}
      </ul>
    </>
  );
}
