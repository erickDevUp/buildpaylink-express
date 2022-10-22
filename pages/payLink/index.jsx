
import PayLink from "component/App";
import ConfigCtx, { ConfigEdit } from "context/configEdit";
import withSession from "lib/session";
import Head from "next/head";
import { useState } from "react";
import { useContext } from "react";

export default function Paylink() {
  return (
    <div>
      <Head>
        <title>PayLink builder | build your PayLink</title>
        <meta
          name="description"
          content="Organize all your payment methods with PayLink."
        />
        <link
          rel="icon"
          type="image/svg+xml"
          href='/favicon.svg'
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="" />
        <meta property="og:title" content="" />
        <meta
          property="og:description"
          content="Organize all your payment methods with PayLink."
        />
        <meta
          property="og:image"
          content="./images/opengraph/paylink-opengraph.png"
        />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="" />
        <meta property="twitter:title" content="" />
        <meta
          property="twitter:description"
          content="Organize all your payment methods with PayLink."
        />
        <meta
          property="twitter:image"
          content="./images/opengraph/paylink-opengraph.png"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <ConfigEdit>
        <PayLink />
      </ConfigEdit>
    </div>
  );
}


export const getServerSideProps = withSession(async function ({ req, res }) {
  const user = req.session.get("user");

  if (user === undefined) {
    res.setHeader("location", "/login");
    res.statusCode = 302;
    res.end();
    return { props: {} };
  }

  return {
    props: { user: req.session.get("user") },
  };
});



