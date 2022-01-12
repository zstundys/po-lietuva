import type { AppProps } from "next/app";
import { useAnalytics } from "../hooks/useAnalytics";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  useAnalytics();

  return <Component {...pageProps} />;
}

export default MyApp;
