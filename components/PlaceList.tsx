import React, { ReactElement } from "react";
import { useIsVisited } from "../hooks/useVisited";
import { IPlaces } from "../models/places.interface";
import PlaceListGroup from "./PlaceListGroup";

interface IProps extends IPlaces {}

export default function PlaceList({
  cognitivePaths = [],
  observationBuildings = [],
  observationTowers = [],
  pedestrianTrails = [],
}: IProps): ReactElement {
  const isVisited = useIsVisited();
  const visitedPlaces = [
    ...cognitivePaths.filter((cg) => isVisited(cg.slug)),
    ...pedestrianTrails.filter((cg) => isVisited(cg.slug)),
    ...observationTowers.filter((cg) => isVisited(cg.slug)),
    ...observationBuildings.filter((cg) => isVisited(cg.slug)),
  ];

  return (
    <>
      <PlaceListGroup
        color="green"
        name="Pažintiniai takai"
        places={cognitivePaths}
        showVisitedCount
      />
      <PlaceListGroup
        color="lime"
        name="Pesčiūjų takai"
        places={pedestrianTrails}
        showVisitedCount
      />
      <PlaceListGroup
        color="indigo"
        name="Apžvalgos bokštai"
        places={observationTowers}
        showVisitedCount
      />
      <PlaceListGroup
        color="purple"
        name="Pastatai"
        places={observationBuildings}
        showVisitedCount
      />
      {visitedPlaces.length ? (
        <>
          <hr className="mb-3" />
          <PlaceListGroup
            color="pink"
            name="Aplankyta"
            places={visitedPlaces}
          />
        </>
      ) : null}
    </>
  );
}
