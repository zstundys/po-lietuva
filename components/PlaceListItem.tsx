/* eslint-disable react/no-children-prop */
import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/solid";
import React, { ReactElement } from "react";
import ReactMarkdown from "react-markdown";
import { IPlace } from "../models/place.interface";

interface Props {
  place: IPlace;
}

export default function PlaceListItem({ place }: Props): ReactElement {
  return (
    <Disclosure>
      {({ open }) => (
        <>
          <Disclosure.Button
            className={`text-black flex justify-between w-full py-2 text-sm font-medium text-left rounded-lg focus:outline-none focus-visible:ring focus-visible:ring-opacity-75`}
          >
            {place.name}
            <ChevronUpIcon
              className={`${open ? "transform rotate-180" : ""} w-5 h-5 `}
            />
          </Disclosure.Button>
          <Disclosure.Panel className="prose text-xs text-gray-500 prose-img:rounded-lg">
            <ReactMarkdown children={place.description} />
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
