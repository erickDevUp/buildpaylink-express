import ConfigCtx from "context/configEdit";
import Image from "next/image";
import { useContext } from "react";

import theme1 from "../../public/images/themes/theme1.jpg";
import theme2 from "../../public/images/themes/theme2.jpg";
import theme3 from "../../public/images/themes/theme3.jpg";
import theme4 from "../../public/images/themes/theme4.jpg";

import styles from "../../styles/Home.module.scss";

const SelectThemes = () => {
  
  const { Config, setConfig } = useContext(ConfigCtx);

  const changeTheme = (e) => {
    setConfig({
      ...Config,
      theme: e.target.name,
    });
  };

  return (
    <div className="d-flex justify-content-center align-items-center mt-5 mb-5">
      <Image
        src={theme1}
        className={(Config.theme=="minimalist_dark_theme"&&styles.theme_select) +' '+ styles.theme_img}
        name="minimalist_dark_theme"
        onClick={(e) => changeTheme(e)}
        objectFit="cover"
      />
      <Image
        src={theme2}
        className={(Config.theme=="minimalist_theme"&&styles.theme_select) +' '+ styles.theme_img}
        name="minimalist_theme"
        onClick={(e) => changeTheme(e)}
        objectFit="cover"
      />
      <Image
        src={theme3}
        className={(Config.theme=="swordfest_dark_theme"&&styles.theme_select) +' '+ styles.theme_img}
        name="swordfest_dark_theme"
        onClick={(e) => changeTheme(e)}
        objectFit="cover"
      />
      <Image
        src={theme4}
        className={(Config.theme=="swordfest_theme"&&styles.theme_select) +' '+ styles.theme_img}
        name="swordfest_theme"
        onClick={(e) => changeTheme(e)}
        objectFit="cover"
      />
    </div>
  );
};

export default SelectThemes;
