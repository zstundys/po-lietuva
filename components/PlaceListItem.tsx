/* eslint-disable react/no-children-prop */
import { Disclosure, Switch } from "@headlessui/react";
import { BadgeCheckIcon, ChevronUpIcon, XIcon } from "@heroicons/react/solid";
import classNames from "classnames";
import React, { ReactElement, useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import { useMap } from "../hooks/useMap";
import { useVisited } from "../hooks/useVisited";
import { IPlace } from "../models/place.interface";

interface Props {
  place: IPlace;
}

export default function PlaceListItem({ place }: Props): ReactElement {
  const { isVisited, setVisited } = useVisited(place.slug);

  return (
    <Disclosure>
      {({ open }) => {
        return (
          <>
            <Content
              place={place}
              isVisited={isVisited}
              isOpen={open}
              setVisited={setVisited}
            />
          </>
        );
      }}
    </Disclosure>
  );
}

interface ContentProps {
  place: IPlace;
  isVisited: boolean;
  setVisited: (isVisited: boolean) => void;
  isOpen: boolean;
}

function Content({
  place,
  isVisited,
  setVisited,
  isOpen,
}: ContentProps): JSX.Element {
  const ref = useRef(isOpen);
  const { focusMarker } = useMap();

  useEffect(() => {
    if (ref.current !== isOpen) {
      if (isOpen) {
        focusMarker(place);
      }

      ref.current = isOpen;
    }
  }, [isOpen, place, focusMarker]);

  return (
    <>
      <Disclosure.Button
        className={classNames(
          `flex justify-between w-full py-2 font-medium text-left rounded-lg focus:outline-none focus-visible:ring focus-visible:ring-opacity-75 `,
          {
            "line-through": isVisited,
            "text-black": !isVisited,
            "text-slate-500": isVisited,
          }
        )}
      >
        {place.name}
        <ChevronUpIcon
          className={classNames("w-5 h-5 transition-transform", {
            "transform  rotate-180": open,
          })}
        />
      </Disclosure.Button>
      <Disclosure.Panel className="text-xs text-slate-500">
        <div className="mb-4 flex items-center justify-between">
          <Switch
            title={
              isVisited
                ? "Pažymėti kaip neaplankytą"
                : "Pažymėti kaip aplankytą"
            }
            checked={isVisited}
            onChange={setVisited}
            className={classNames(
              "relative inline-flex items-center h-8 rounded-full pl-2 pr-3 transition-colors ",
              {
                "bg-lime-600": isVisited,
                "text-white": isVisited,
                "bg-slate-200": !isVisited,
              }
            )}
          >
            <span
              className={classNames(
                `inline-block w-5 h-5 transform bg-white transition-colors rounded-full mr-2`,
                {
                  "text-lime-600": isVisited,
                }
              )}
            >
              {isVisited && <BadgeCheckIcon />}
              {!isVisited && <XIcon className="scale-75" />}
            </span>
            Aplankyta
          </Switch>

          <div className="flex gap-4">
            <button
              title="Rodyti žemėlapyje"
              type="button"
              onClick={() => focusMarker(place)}
              className="hover:text-slate-700 text-2xl"
            >
              <i className="fas fa-map-marked"></i>
            </button>
            <a
              title='Nuorodos per "Google Maps"'
              href={`https://www.google.com/maps/dir/?api=1&destination=${place.latitude}%2C${place.longitude}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-slate-700 text-2xl"
            >
              <i className="fas fa-directions"></i>
            </a>
          </div>
        </div>
        <ReactMarkdown
          className="prose prose-img:rounded-lg prose-img:my-4 mb-4 break-words"
          children={place.description}
        />
      </Disclosure.Panel>
    </>
  );
}
