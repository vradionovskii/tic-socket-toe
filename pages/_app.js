import "../styles/style.css";

function MyApp({ Component, pageProps, router }) {
  return <Component key={router.route} {...pageProps} />;
}

export default MyApp;
