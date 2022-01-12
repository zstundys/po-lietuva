import { ChevronLeftIcon } from "@heroicons/react/solid";
import classNames from "classnames";
import fs from "fs-extra";
import matter from "gray-matter";
import type { GetStaticPropsResult, NextPage } from "next";
import Head from "next/head";
import Script from "next/script";
import { useState } from "react";
import MapView from "../components/MapView";
import PlaceList from "../components/PlaceList";
import { IPlace } from "../models/place.interface";
import { IPlaces } from "../models/places.interface";

interface IProps {
  places: IPlaces;
}

const Home: NextPage<IProps> = ({ places }) => {
  const [isCollapsed, setCollapsed] = useState(false);

  return (
    <>
      <Script
        src="https://kit.fontawesome.com/f611f9ec07.js"
        crossOrigin="anonymous"
      />
      <Head>
        <title>Pažink Lietuvą!</title>
        <meta
          name="description"
          content="Pažintiniai takai, pesčiūjų takai, apžvalgos bokštai, pastatai Lietuvoje"
        />
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
      </Head>

      <main>
        <MapView places={places} />
        <div
          onClick={() => (isCollapsed ? setCollapsed(!isCollapsed) : null)}
          className={classNames(
            "absolute inset-4 bottom-auto lg:inset-8  max-w-sm max-h-screen overflow-hidden bg-white rounded-lg transition-transform duration-500 ",
            {
              "-translate-x-full": isCollapsed,
              "shadow-xl": !isCollapsed,
            }
          )}
        >
          <div
            className={classNames(
              "p-4 lg:p-8 lg:absolute inset-0 flex flex-col",
              {
                "overflow-y-scroll": !isCollapsed,
                "overflow-y-hidden": isCollapsed,
              }
            )}
            style={{ maxHeight: "calc(100vh - 32px)" }}
          >
            <div className="flex items-center justify-between  mb-4">
              <h1 className="text-2xl lg:text-3xl">Pažink Lietuvą!</h1>
              <button
                onClick={() => setCollapsed(!isCollapsed)}
                type="button"
                title="Suskleisti/Išskleisti"
                className={classNames(
                  "w-8 h-8 rounded-full text-slate-500 hover:text-slate-700",
                  {
                    "translate-x-7": isCollapsed,
                    "bg-white": isCollapsed,
                  }
                )}
              >
                <ChevronLeftIcon
                  className={classNames("transition-transform", {
                    "rotate-180": isCollapsed,
                  })}
                ></ChevronLeftIcon>
              </button>
            </div>
            <PlaceList
              cognitivePaths={places.cognitivePaths}
              observationBuildings={places.observationBuildings}
              observationTowers={places.observationTowers}
              pedestrianTrails={places.pedestrianTrails}
            />
            <div className="text-slate-400 mt-auto text-right">
              Su 💖 nuo{" "}
              <a
                target="_blank"
                href="https://nesedeknamuose.lt/"
                rel="noopener noreferrer"
                className="hover:text-slate-600 font-semibold"
              >
                nesedėknamuose.lt
              </a>
              <br />
              Projekto autorius:{" "}
              <a
                target="_blank"
                href="https://www.linkedin.com/in/%C5%BEanas-stundys-896623162/"
                rel="noopener noreferrer"
                className="hover:text-slate-600 font-semibold"
              >
                Žanas Stundys
              </a>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export function getStaticProps(): GetStaticPropsResult<IProps> {
  return { props: { places: getPlaces() } };
}

export const CONTENT_DIR = "content";

function getPlaces(): IPlaces {
  return {
    cognitivePaths: parsePlaceDir("content/pazintiniai-takai"),
    observationBuildings: parsePlaceDir("content/pastatai"),
    observationTowers: parsePlaceDir("content/bokstai"),
    pedestrianTrails: parsePlaceDir("content/pesciuju-takai"),
  };

  function parsePlaceDir(dir: string): IPlace[] {
    const pathsFiles = fs.readdirSync(dir);

    return pathsFiles.map<IPlace>((file) => {
      const fileData = fs.readFileSync(`${dir}/${file}`).toString();

      const content = matter(fileData);
      const fm = content.data as Omit<IPlace, "description">;
      return { ...fm, description: content.content };
    });
  }
}

export default Home;
