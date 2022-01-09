import React, { ReactElement } from "react";
import { IPlaces } from "../models/places.interface";
import PlaceListGroup from "./PlaceListGroup";

interface IProps extends IPlaces {}

export default function PlaceList({
  cognitivePaths = [],
  observationBuildings = [],
  observationTowers = [],
  pedestrianTrails = [],
}: IProps): ReactElement {
  return (
    <>
      <PlaceListGroup
        color="green"
        name="Pažintiniai takai"
        places={cognitivePaths}
      />
      <PlaceListGroup
        color="lime"
        name="Pesčiūjų takai"
        places={pedestrianTrails}
      />
      <PlaceListGroup
        color="indigo"
        name="Apžvalgos bokštai"
        places={observationTowers}
      />
      <PlaceListGroup
        color="purple"
        name="Pastatai"
        places={observationBuildings}
      />
    </>
  );
}
