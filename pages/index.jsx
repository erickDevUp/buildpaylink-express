import Hero from "component/components/hero/Hero";
import Payment from "component/components/payments/Payment";
import SocialMedia from "component/components/social-media/SocialMedia";
import Head from "next/head";
import PayLink from "/component/App";
import styles from "../styles/Home.module.scss";

import getConfig from "/public/paylink.config.json";
import { useEffect, useState } from "react";
import Link from "next/link";

const configThema = (theme) => {
  let thema;
  switch (theme) {
    case "minimalist_dark_theme":
      thema = styles.minimalist_dark_theme;
      break;
    case "minimalist_theme":
      thema = styles.minimalist_theme;
      break;
    case "swordfest_dark_theme":
      thema = styles.swordfest_dark_theme;
      break;
    case "swordfest_theme":
      thema = styles.swordfest_theme;
      break;
  }
  return thema;
};
export default function Home({prop}) {
  const [Config,setConf]=useState(prop)
  useEffect(()=>setConf(getConfig),[getConfig])


  return (
    <div className={configThema(Config.theme)}>
      
           
          <a  href="./payLink"className={styles.log_out}>Admin</a>

      <div className="d-flex flex-column justify-content-center align-items-center ">
        <Hero
          src={Config.properties.hero}
          alt={Config.properties.alt}
          name={Config.properties.name}
          description={Config.properties.description}
        />
        <section
          id="social-media"
          className="d-flex justify-content-center align-items-center mb-5"
        >
          {Config.Social.map(
            (i) =>
              i.link != "" && (
                <SocialMedia
                  label={i.label}
                  type={i.type}
                  href={i.link}
                  key={i.label}
                ></SocialMedia>
              )
          )}
        </section>

        <section
          id={styles.payment_options}
          className="d-flex flex-column align-items-center pb-4"
        >
          {Config.Payments.map(
            (i) =>
              i.value != "" && (
                <Payment
                  id={i.id}
                  label={i.label}
                  img={i.img}
                  value={i.value}
                  key={i.id}
                ></Payment>
              )
          )}
        </section>
        <a
            href="https://github.com/dlcastillop/paylink"
            target="_blank"
            className={styles.paylink_link + " my-3 text-decoration-none"}
          >
            <sub>
              Powered by <b>PayLink</b>
            </sub>
          </a>
      </div>
      
    </div>
  );
}


export async function getServerSideProps() {
  return {
    props: {
      prop: getConfig,
    },
  };
}
