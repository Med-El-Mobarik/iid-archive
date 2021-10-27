import { useState } from "react";
import classes from "./Header.module.scss";
import DrawerComp from "./DrawerComp";
import "animate.css";

import MenuRoundedIcon from "@mui/icons-material/MenuRounded";

interface Props {
  name: string | null | undefined;
}

const Header = (props: Props) => {
  const { name } = props;

  const [open, setOpen] = useState(false);

  return (
    <header className={classes.header}>
      <nav>
        <div className={classes.nav}>
          <img src="/img/logo.png" />
          <MenuRoundedIcon
            onClick={() => setOpen(true)}
            style={{ color: "#fff", fontSize: "40px", cursor: "pointer" }}
          />
        </div>
      </nav>
      <div className={classes.container}>
        <h1 className="animate__animated animate__fadeInLeft">
          Welcome {name} <br />{" "}
          <span>
            This platform is created by El Mobarik Mohamed to help you access to
            the archive
          </span>
        </h1>
      </div>
      <DrawerComp open={open} setOpen={setOpen} classes={classes} />
    </header>
  );
};

export default Header;
