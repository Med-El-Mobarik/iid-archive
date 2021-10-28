import { Dispatch, SetStateAction } from "react";
import classes from "./Years.module.scss";

import ArrowForwardIosIcon from "@mui/icons-material/KeyboardArrowDown";

interface Props {
  setYear: Dispatch<SetStateAction<string | null | undefined>>;
  year: string | null | undefined;
}

const Years = (props: Props) => {
  const { setYear, year } = props;

  return (
    <div className={classes.years}>
      <div
        onClick={() => setYear("first_year")}
        className={classes.year}
        style={{
          backgroundColor: year === "first_year" ? "#2980b9" : "#fff",
          color: year === "first_year" ? "#fff" : "#555",
        }}
      >
        First Year <ArrowForwardIosIcon />
      </div>
      <div
        onClick={() => setYear("second_year")}
        className={classes.year}
        style={{
          backgroundColor: year === "second_year" ? "#2980b9" : "#fff",
          color: year === "second_year" ? "#fff" : "#555",
        }}
      >
        Second Year <ArrowForwardIosIcon />
      </div>
      <div
        onClick={() => setYear("third_year")}
        className={classes.year}
        style={{
          backgroundColor: year === "third_year" ? "#2980b9" : "#fff",
          color: year === "third_year" ? "#fff" : "#555",
        }}
      >
        Third Year <ArrowForwardIosIcon />
      </div>
    </div>
  );
};

export default Years;
