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
      <PlaceListGroup name="Pažintiniai takai" places={cognitivePaths} />
      <PlaceListGroup name="Pesčiūjų takai" places={pedestrianTrails} />
      <PlaceListGroup name="Apžvalgos bokštai" places={observationTowers} />
      <PlaceListGroup name="Pastatai" places={observationBuildings} />
    </>
  );
}
