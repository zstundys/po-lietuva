import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/solid";
import React, { ReactElement } from "react";
import { IPlace } from "../models/place.interface";
import PlaceListItem from "./PlaceListItem";

interface Props {
  name: string;
  places: IPlace[];
  color: "lime" | "green" | "indigo" | "purple";
}

const buttonClassMap: Record<Props["color"], string> = {
  green:
    "text-green-900 bg-green-100 hover:bg-green-200 focus-visible:ring-green-500",
  lime: "text-lime-900 bg-lime-100 hover:bg-lime-200 focus-visible:ring-lime-500",
  indigo:
    "text-indigo-900 bg-indigo-100 hover:bg-indigo-200 focus-visible:ring-indigo-500",
  purple:
    "text-purple-900 bg-purple-100 hover:bg-purple-200 focus-visible:ring-purple-500",
};
const iconClassMap: Record<Props["color"], string> = {
  green: "text-green-500",
  lime: "text-lime-500",
  indigo: "text-indigo-500",
  purple: "text-purple-500",
};

export default function PlaceListGroup({
  name,
  places,
  color,
}: Props): ReactElement {
  const buttonColor = buttonClassMap[color];
  const iconColor = iconClassMap[color];

  return (
    <>
      <Disclosure>
        {({ open }) => (
          <>
            <Disclosure.Button
              className={`flex mb-3 justify-between w-full px-4 py-2 text-sm font-medium text-left rounded-lg focus:outline-none focus-visible:ring focus-visible:ring-opacity-75 ${buttonColor}`}
            >
              <span>
                {name} ({places.length})
              </span>
              <ChevronUpIcon
                className={`${
                  open ? "transform rotate-180" : ""
                } w-5 h-5 ${iconColor}`}
              />
            </Disclosure.Button>
            <Disclosure.Panel className="px-4 mb-3 text-sm text-gray-500">
              <ol>
                {places.map((p) => (
                  <li
                    className="border-t border-t-slate-300 first:border-t-0"
                    key={p.slug}
                  >
                    <PlaceListItem place={p} />
                  </li>
                ))}
              </ol>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </>
  );
}