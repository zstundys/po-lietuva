import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/solid";
import classNames from "classnames";
import React, { ReactElement, useRef } from "react";
import { useSelectedPlaceChanged } from "../hooks/useSelectedPlace";
import { useVisitedCount } from "../hooks/useVisited";
import { IPlace } from "../models/place.interface";
import PlaceListItem from "./PlaceListItem";

interface Props {
  name: string;
  places: IPlace[];
  color: "lime" | "green" | "indigo" | "purple" | "pink";
  showVisitedCount?: boolean;
}

const buttonClassMap: Record<Props["color"], string> = {
  green:
    "text-green-900 bg-green-100 hover:bg-green-200 focus-visible:ring-green-500",
  lime: "text-lime-900 bg-lime-100 hover:bg-lime-200 focus-visible:ring-lime-500",
  indigo:
    "text-indigo-900 bg-indigo-100 hover:bg-indigo-200 focus-visible:ring-indigo-500",
  purple:
    "text-purple-900 bg-purple-100 hover:bg-purple-200 focus-visible:ring-purple-500",
  pink: "text-pink-900 bg-pink-100 hover:bg-pink-200 focus-visible:ring-pink-500",
};
const iconClassMap: Record<Props["color"], string> = {
  green: "text-green-500",
  lime: "text-lime-500",
  indigo: "text-indigo-500",
  purple: "text-purple-500",
  pink: "text-pink-500",
};
const iconMap: Record<Props["color"], string> = {
  green: "fas fa-hiking",
  lime: "fas fa-walking",
  indigo: "fas fa-binoculars",
  purple: "fas fa-dungeon",
  pink: "fas fa-check",
};

export default function PlaceListGroup({
  name,
  places,
  color,
  showVisitedCount,
}: Props): ReactElement {
  const buttonColor = buttonClassMap[color];
  const iconColor = iconClassMap[color];
  const visitedCount = useVisitedCount(places);
  const openRef = useRef<boolean>(false);
  const buttonRef = useRef<HTMLButtonElement>();
  useSelectedPlaceChanged((p) => {
    if (places.some((pp) => pp.slug === p.slug) && openRef.current === false) {
      buttonRef.current?.click();
    }
  });

  return (
    <>
      <Disclosure>
        {({ open }) => {
          openRef.current = open;
          return (
            <>
              <Disclosure.Button
                ref={buttonRef as any}
                className={`flex mb-3 text-lg items-center w-full px-4 py-2  text-left rounded-full focus:outline-none focus-visible:ring focus-visible:ring-opacity-75 ${buttonColor} transition-colors`}
              >
                <i
                  aria-hidden="true"
                  className={classNames(
                    iconMap[color],
                    "mr-2 text-xl text-center h-5 w-5"
                  )}
                ></i>
                <span>{name}</span>
                <span className="ml-auto opacity-80">
                  {visitedCount && showVisitedCount ? (
                    <>
                      {visitedCount} iš {places.length}
                    </>
                  ) : (
                    <>{places.length}</>
                  )}
                </span>
                <ChevronUpIcon
                  className={`ml-2 ${
                    open ? "transform rotate-180" : ""
                  } w-5 h-5 ${iconColor}`}
                />
              </Disclosure.Button>
              <Disclosure.Panel unmount={false} className="px-4 mb-3">
                <ol>
                  {places.map((p) => (
                    <li
                      className="border-t border-t-slate-200 first:border-t-0"
                      key={p.slug}
                    >
                      <PlaceListItem place={p} />
                    </li>
                  ))}
                </ol>
              </Disclosure.Panel>
            </>
          );
        }}
      </Disclosure>
    </>
  );
}
