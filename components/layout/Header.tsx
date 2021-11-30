// import { useState } from "react";
import classes from "./Header.module.scss";
// import DrawerComp from "./DrawerComp";
import "animate.css";

// import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import LogoutRoundedIcon from "@mui/icons-material/ExitToAppRounded";

import { signOut } from "next-auth/client";
import { useRouter } from "next/router";

interface Props {
  name: string | null | undefined;
}

const Header = (props: Props) => {
  const { name } = props;
  const router = useRouter();

  // const [open, setOpen] = useState(false);

  const logOutHandler = async () => {
    await signOut();
    // router.push("/");
  };

  return (
    <header className={classes.header}>
      <nav>
        <div className={classes.nav}>
          <img src="/img/logo.png" />
          {/* <div style={{ display: "flex", alignItems: "center" }}> */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              color: "#fff",
              fontSize: "25px",
              cursor: "pointer",
            }}
            onClick={logOutHandler}
          >
            Logout{" "}
            <LogoutRoundedIcon
              style={{ marginLeft: "10px", fontSize: "30px" }}
            />
          </div>
          {/* <MenuRoundedIcon
              onClick={() => setOpen(true)}
              style={{ color: "#fff", fontSize: "40px", cursor: "pointer" }}
            /> */}
          {/* </div> */}
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
      {/* <DrawerComp open={open} setOpen={setOpen} classes={classes} /> */}
    </header>
  );
};

export default Header;
