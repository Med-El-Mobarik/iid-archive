import Row from "./row";
import classes from "./Content.module.scss";

interface Props {
  cours: string[];
  tds: string[];
  exams: string[];
  module: string;
}

const index = (props: Props) => {
  const { cours, tds, exams, module } = props;

  const rows = [
    { name: "Cours", files: cours, type:"cours" },
    { name: "Tds/Tps", files: tds, type:"tds" },
    { name: "Exams/Projects", files: exams, type:"exams" },
  ];

  return (
    <div className={classes.content}>
      <h2 style={{ color: "#2980b9" }}>{module}</h2>
      {rows.map((e, id) => (
        <div className={classes.row} key={id}>
          <Row module={module} classes={classes} name={e.name} files={e.files} type={e.type}/>
        </div>
      ))}
    </div>
  );
};

export default index;
