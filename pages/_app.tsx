import { AppProps } from "next/app";
import "../styles/style.css";

function MyApp({ Component, pageProps, router }: AppProps) {
  return <Component key={router.route} {...pageProps} />;
}

export default MyApp;
