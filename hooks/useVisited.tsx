import { useCallback, useMemo } from "react";
import { createLocalStorageStateHook } from "use-local-storage-state";
import { IPlace } from "../models/place.interface";

interface VisitedState {
  isVisited: boolean;
  setVisited: (isVisited: boolean) => void;
}

const useVisitedState = createLocalStorageStateHook<IPlace["slug"][]>(
  "visited",
  []
);

export function useVisitedCount(places: IPlace[]): number {
  const [visitedArr] = useVisitedState();

  return places.filter((place) => visitedArr.includes(place.slug)).length;
}

export function useIsVisited(): (slug: IPlace["slug"]) => boolean {
  const [visitedArr] = useVisitedState();

  return (slug) => visitedArr.includes(slug);
}

export function useVisited(slug: string): VisitedState {
  const [visitedArr, setVisitedArr] = useVisitedState();

  const visited = useMemo(() => new Set(visitedArr), [visitedArr]);

  const setVisited = useCallback(
    (isVisited) => {
      if (isVisited) {
        visited.add(slug);
      } else {
        visited.delete(slug);
      }

      setVisitedArr(Array.from(visited));
    },
    [slug, visited, setVisitedArr]
  );

  return {
    setVisited,
    isVisited: visited.has(slug),
  };
}
