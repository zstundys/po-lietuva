import type { AppProps } from "next/app";
import { useState } from "react";
import { useAnalytics } from "../hooks/useAnalytics";
import { SelectedPlaceContext } from "../hooks/useSelectedPlace";
import { IPlace } from "../models/place.interface";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  useAnalytics();
  const [place, setPlace] = useState<IPlace | undefined>(undefined);

  return (
    <SelectedPlaceContext.Provider
      value={{
        place,
        setPlace,
      }}
    >
      <Component {...pageProps} />
    </SelectedPlaceContext.Provider>
  );
}

export default MyApp;
