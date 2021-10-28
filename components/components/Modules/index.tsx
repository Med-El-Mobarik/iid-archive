import classes from "./modules.module.scss";
// import { first_year, second_year, third_year } from "../../../data/years";
import Semester from "./Semester";

interface Module {
  semester1: string[];
  semester2: string[];
  year: string;
}

interface Props {
  year: string | null | undefined;
  response: Module[];
}

const Modules = (props: Props) => {
  const { year, response } = props;

  const Year =
    year === "first_year"
      ? response[1]
      : year === "second_year"
      ? response[0]
      : response[2];

  return (
    <div className={classes.container}>
      <Semester
        year={year}
        semester="semester_one"
        name={"Semester 1"}
        classes={classes}
        data={Year?.semester1!}
      />
      <Semester
        year={year}
        semester="semester_two"
        name={"Semester 2"}
        classes={classes}
        data={Year?.semester2!}
      />
    </div>
  );
};

export default Modules;
