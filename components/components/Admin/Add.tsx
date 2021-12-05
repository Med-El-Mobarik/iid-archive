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

import { storage } from "../../../lib/firebase";
import { ref, uploadBytes } from "firebase/storage";

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
  const [type, setType] = useState("cours");
  const [selectedFile, setSelectedFile] = useState<any>();
  const [text1, setText1] = useState<string>("");
  const [modules, setModules] = useState<string[]>();
  const [importFile, setImportFile] = useState("Import File");

  useEffect(() => {
    const year1 = response[1].semester1.concat(response[0].semester2);
    const year2 = response[0].semester1.concat(response[1].semester2);
    const year3 = response[2].semester1.concat(response[2].semester2);

    const options = year1.concat(year2, year3);

    setModules(options);
  }, []);

  const handleChange = (event: SelectChangeEvent) => {
    setType(event.target.value as string);
  };

  const handleFileChange = (event: any) => {
    setSelectedFile(event.target.files[0]);
    setImportFile(
      event.target.files[0] ? event.target.files[0].name : selectedFile?.name
    );
  };

  const onSubmit = async (e: any) => {
    e.preventDefault();

    console.log(value);

    if (!value || value == "") {
      alert("Select a Module");
    } else {
      try {
        setText1(`Wait for ${selectedFile?.name!} ...`);
        const fileRef = ref(storage, `${value}/${type}/${selectedFile?.name!}`);

        const uploadTask = uploadBytes(fileRef, selectedFile!);

        uploadTask
          .then(() => {
            setText1(`${selectedFile.name} uploaded!`);
          })
          .catch((error) => {
            console.log(error);
          });
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
        // groupBy={(option) => option.year}
        // getOptionLabel={(option) => option.title}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Module" />}
      />

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
          <MenuItem value="cours">cours</MenuItem>
          <MenuItem value="tds">tds</MenuItem>
          <MenuItem value="exams">exams</MenuItem>
          <MenuItem value="projects">projects</MenuItem>
        </Select>
      </FormControl>
      <Button
        style={{ width: "300px", backgroundColor: "#7f8c8d" }}
        variant="contained"
        onClick={() => {
          document.getElementById("asset-file")?.click();
        }}
        className={classes.button}
      >
        <PublishRoundedIcon /> {importFile}
        <input
          required
          onChange={handleFileChange}
          id="asset-file"
          type="file"
          hidden
        />
      </Button>
      <button className={classes.btn}>Submit</button>
      <div id="wait-file" style={{ marginTop: "20px" }}>
        {text1}
      </div>
    </form>
  );
};

export default Index;
