import { Dispatch, SetStateAction } from "react";

import HomeIcon from "@mui/icons-material/Home";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Drawer from "@mui/material/Drawer";

const sideMenuElements = [
  {
    name: "Home",
    icon: <HomeIcon style={{ marginRight: "10px" }} />,
  },
  {
    name: "First Year",
    icon: <ArrowForwardIosIcon style={{ marginRight: "10px" }} />,
  },
  {
    name: "Second Year",
    icon: <ArrowForwardIosIcon style={{ marginRight: "10px" }} />,
  },
  {
    name: "Third Year",
    icon: <ArrowForwardIosIcon style={{ marginRight: "10px" }} />,
  },
];

interface Props {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  classes: {
    readonly [key: string]: string;
  };
}

const DrawerComp = (props: Props) => {
  const { open, setOpen, classes } = props;

  return (
    <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
      <div className={classes.sidemenu}>
        {sideMenuElements.map((elem, id) => (
            <div key={id} className={classes.element}>
              {elem.icon}
              {elem.name}
            </div>
        ))}
      </div>
    </Drawer>
  );
};

export default DrawerComp;
