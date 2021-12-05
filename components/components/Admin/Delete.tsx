import { useState, useEffect } from "react";

import classes from "./Add.module.scss";

import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Button from "@mui/material/Button";
import PublishRoundedIcon from "@mui/icons-material/PublishRounded";
import CircularProgress from "@mui/material/CircularProgress";

import { storage } from "../../../lib/firebase";
import { ref, listAll, StorageReference, deleteObject } from "firebase/storage";

interface Year {
  semester1: string[];
  semester2: string[];
  year: string;
}

interface Props {
  response: Year[];
}

const Index = (props: Props) => {
  const { response } = props;

  const [value, setValue] = useState<string | null>();
  const [type, setType] = useState("");
  const [modules, setModules] = useState<string[]>();
  const [show, setShow] = useState(false);
  const [spinnerShow, setSpinnerShow] = useState(false);
  const [spinnerDelete, setSpinnerDelete] = useState(false);
  const [file, setFile] = useState("");
  const [files, setFiles] = useState<StorageReference[]>([]);

  useEffect(() => {
    const year1 = response[1].semester1.concat(response[0].semester2);
    const year2 = response[0].semester1.concat(response[1].semester2);
    const year3 = response[2].semester1.concat(response[2].semester2);

    const options = year1.concat(year2, year3);

    setModules(options);
  }, []);

  useEffect(() => {
    const getFiles = async () => {
      if (type) {
        try {
          setShow(true);
          setSpinnerShow(true);
          const refFiles = ref(storage, `${value}/${type}`);
          const res = await listAll(refFiles);

          setFiles(res.items);
          setSpinnerShow(false);
        } catch (error: any) {
          setSpinnerShow(false);
          setShow(false);
          if (error.response) {
            alert(JSON.stringify(error.response));
          }
          alert(JSON.stringify(error.message));
        }
      }
    };
    getFiles();
  }, [type]);

  const handleChange = async (event: SelectChangeEvent) => {
    setType(event.target.value as string);
  };

  const handleFileChange = (event: SelectChangeEvent) => {
    setFile(event.target.value as string);
  };

  const onSubmit = async (e: any) => {
    e.preventDefault();

    if (!value || value == "") {
      alert("Select a Module");
    } else {
      try {
        setSpinnerDelete(true);
        const fileRef = ref(storage, `${value}/${type}/${file}`);
        await deleteObject(fileRef);
        alert("Delete Was successful");
        setSpinnerDelete(false);
      } catch (error: any) {
        if (error.response) {
          console.log(error.response.data);
        }
        console.log(error);
        alert("something went wrong :(");
      }
    }
  };

  return (
    <form className={classes.add} onSubmit={onSubmit}>
      <Autocomplete
        value={value}
        onChange={(event: any, newValue: string | null) => {
          setValue(newValue);
        }}
        style={{ marginBottom: "20px" }}
        className={classes.field}
        id="grouped-demo"
        options={modules ? modules : []}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Module" />}
      />

      {value && (
        <FormControl style={{ marginBottom: "20px" }} className={classes.field}>
          <InputLabel id="demo-simple-select-label">Type</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={type}
            label="Type"
            onChange={handleChange}
            required
          >
            <MenuItem value=""></MenuItem>
            <MenuItem value="cours">cours</MenuItem>
            <MenuItem value="tds">tds</MenuItem>
            <MenuItem value="exams">exams</MenuItem>
            <MenuItem value="projects">projects</MenuItem>
          </Select>
        </FormControl>
      )}

      {!show ? (
        <div></div>
      ) : spinnerShow ? (
        <CircularProgress />
      ) : (
        <FormControl style={{ marginBottom: "20px" }} className={classes.field}>
          <InputLabel id="demo-simple-select-file">File</InputLabel>
          <Select
            labelId="demo-simple-select-file"
            id="demo-simple-select"
            value={file}
            label="File"
            onChange={handleFileChange}
            required
          >
            {files.map((e, id) => (
              <MenuItem key={id} value={e.name}>{e.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
      )}

      {!spinnerDelete ? (
        <button className={`${classes.btn} ${classes.delete}`}>Delete</button>
      ) : (
        <CircularProgress style={{ color: "#e74c3c" }} />
      )}
    </form>
  );
};

export default Index;
