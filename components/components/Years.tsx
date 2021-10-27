import { Dispatch, SetStateAction } from "react";
import classes from "./Years.module.scss";

import ArrowForwardIosIcon from "@mui/icons-material/KeyboardArrowDown";

interface Props {
  setYear: Dispatch<SetStateAction<string>>;
}

const Years = (props: Props) => {
  const { setYear } = props;

  return (
    <div className={classes.years}>
      <div onClick={() => setYear("first_year")} className={classes.year}>
        First Year <ArrowForwardIosIcon />
      </div>
      <div onClick={() => setYear("second_year")} className={classes.year}>
        Second Year <ArrowForwardIosIcon />
      </div>
      <div onClick={() => setYear("third_year")} className={classes.year}>
        Third Year <ArrowForwardIosIcon />
      </div>
    </div>
  );
};

export default Years;
