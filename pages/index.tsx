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
        <MapView />
        <div className="absolute inset-y-8 left-8 bg-white rounded-xl p-8 w-96 overflow-auto">
          <h1 className="text-3xl">Po Lietuvą!</h1>
          <PlaceList
            cognitivePaths={places.cognitivePaths}
            observationBuildings={places.observationBuildings}
            observationTowers={places.observationTowers}
            pedestrianTrails={places.pedestrianTrails}
          />
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

      return matter(fileData).data as IPlace;
    });
  }
}

export default Home;
