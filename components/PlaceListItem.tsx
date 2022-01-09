/* eslint-disable react/no-children-prop */
import { Disclosure, Switch } from "@headlessui/react";
import { BadgeCheckIcon, ChevronUpIcon, XIcon } from "@heroicons/react/solid";
import classNames from "classnames";
import React, { ReactElement, useState } from "react";
import ReactMarkdown from "react-markdown";
import { IPlace } from "../models/place.interface";

interface Props {
  place: IPlace;
}

export default function PlaceListItem({ place }: Props): ReactElement {
  const [enabled, setEnabled] = useState(false);

  return (
    <Disclosure>
      {({ open }) => (
        <>
          <Disclosure.Button
            className={`text-black flex justify-between w-full py-2 text-sm font-medium text-left rounded-lg focus:outline-none focus-visible:ring focus-visible:ring-opacity-75`}
          >
            {place.name}
            <ChevronUpIcon
              className={classNames("w-5 h-5", {
                "transform rotate-180": open,
              })}
            />
          </Disclosure.Button>
          <Disclosure.Panel className=" text-xs text-slate-500">
            <div className="mb-4">
              <Switch
                checked={enabled}
                onChange={setEnabled}
                className={classNames(
                  "relative inline-flex items-center h-6 rounded-full pl-1 pr-2 ",
                  {
                    "bg-lime-600": enabled,
                    "text-white": enabled,
                    "bg-slate-200": !enabled,
                  }
                )}
              >
                <span
                  className={classNames(
                    `inline-block w-4 h-4 transform bg-white  rounded-full mr-2`,
                    {
                      "text-lime-600": enabled,
                    }
                  )}
                >
                  {enabled && <BadgeCheckIcon />}
                  {!enabled && <XIcon className="scale-75" />}
                </span>
                Aplankyta
              </Switch>
            </div>
            <ReactMarkdown
              className="prose prose-img:rounded-lg prose-img:my-4 mb-4"
              children={place.description}
            />
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
