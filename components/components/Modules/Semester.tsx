import { useRouter } from "next/router";
import Link from "next/link";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

interface Props {
  data: string[];
  classes: {
    readonly [key: string]: string;
  };
  name: string;
  year: string;
  semester: string;
}

const Semester = (props: Props) => {
  const router = useRouter();

  const { data, name, classes, year, semester } = props;

  return (
    <div className={classes.semester}>
      <h3 style={{ color: "#79AADB" }}>{name}</h3>
      <ul>
        {data.map((module, id) => (
          <li
            onClick={() => {
              // router.push(`/modules1/${year}/${semester}/${module}`);
              router.push({
                pathname: "/modules/module",
                query: { name: module },
              });
            }}
            key={id}
          >
            <ArrowForwardIosIcon
              style={{ fontSize: "14px", marginRight: "10px" }}
            />{" "}
            {module}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Semester;
