import fs from "fs-extra";
import matter from "gray-matter";
import type { GetStaticPropsResult, NextPage } from "next";
import Head from "next/head";
import MapView from "../components/MapView";
import PlaceList from "../components/PlaceList";
import { IPlace } from "../models/place.interface";
import { IPlaces } from "../models/places.interface";

interface IProps {
  places: IPlaces;
}

const Home: NextPage<IProps> = ({ places }) => {
  return (
    <>
      <Head>
        <title>Po Lietuvą!</title>
        <meta
          name="description"
          content="Pažintiniai takai, pesčiūjų takai, apžvalgos bokštai, pastatai Lietuvoje"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <MapView places={places} />
        <div className="absolute inset-y-8 left-8 bg-white rounded-lg  w-96 overflow-hidden ">
          <div className="p-8 overflow-y-scroll absolute inset-0">
            <h1 className="text-3xl mb-4">Po Lietuvą!</h1>
            <PlaceList
              cognitivePaths={places.cognitivePaths}
              observationBuildings={places.observationBuildings}
              observationTowers={places.observationTowers}
              pedestrianTrails={places.pedestrianTrails}
            />
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
