import Head from "next/head";

export default function SEO({ title }) {
  const seo = {
    siteTitle: "Tic Socket Toe",
    siteDescription: "",
    URL: "",
    socialCover: "",
    keywords: "",
  };
  return (
    <>
      <Head>
        <title>{`${title ? `${title} | ` : ""}${seo.siteTitle}`}</title>
        <meta name="description" content={seo.siteDescription} />

        {/* Facebook / OpenGraph */}
        <meta property="og:description" content={seo.siteDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={seo.siteTitle} />
        <meta property="og:url" content={seo.URL} />
        <meta property="og:title" content={seo.title} />
        <meta
          property="og:image"
          content={
            seo.URL?.includes("https://") || seo.URL?.includes("http://")
              ? seo.URL + seo.socialCover
              : "https://" + seo.URL + seo.socialCover
          }
        />
        <meta property="og:image:alt" content={seo.siteTitle} />
        <meta property="og:image:width" content="442" />
        <meta property="og:image:height" content="498" />

        {/* Twitter */}
        <meta property="twitter:title" content={seo.title} />
        <meta property="twitter:description" content={seo.siteDescription} />
        <meta property="twitter:card" content="summary" />
        <meta
          property="twitter:image"
          content={
            seo.URL?.includes("https://") || seo.URL?.includes("http://")
              ? seo.URL + seo.socialCover
              : "https://" + seo.URL + seo.socialCover
          }
        />

        <meta property="keywords" content={seo.keywords} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* Favicons */}
        <link
          rel="apple-touch-icon"
          sizes="57x57"
          href="/favicon/favicon-57x57.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="60x60"
          href="/favicon/favicon-60x60.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="72x72"
          href="/favicon/favicon-72x72.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="76x76"
          href="/favicon/favicon-76x76.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="114x114"
          href="/favicon/favicon-114x114.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="120x120"
          href="/favicon/favicon-120x120.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="144x144"
          href="/favicon/favicon-144x144.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="152x152"
          href="/favicon/favicon-152x152.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicon/favicon-180x180.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon/favicon-16x16.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="96x96"
          href="/favicon/favicon-96x96.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href="/favicon/favicon-192x192.png"
        />
        <link
          rel="icon"
          type="image/x-icon"
          href="/favicon/favicon-144x144.png"
        />
        <meta name="msapplication-TileColor" content="#C8AC7F" />
        <meta
          name="msapplication-TileImage"
          content="/favicon/favicon-144x144.png"
        />
        <meta
          name="msapplication-config"
          content="/favicon/browserconfig.xml"
        />
        <link rel="manifest" href="/favicon/manifest.json" />
        <meta name="theme-color" content="#C8AC7F" />
        <link
          rel="mask-icon"
          href="/favicon/safari-pinned-tab.svg"
          color="#C8AC7F"
        />
      </Head>
    </>
  );
}
