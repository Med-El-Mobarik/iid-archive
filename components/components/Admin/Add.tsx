import { useState } from "react";

import classes from "./Add.module.scss";

import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Button from "@mui/material/Button";
import PublishRoundedIcon from "@mui/icons-material/PublishRounded";
import axios from "axios";

import { storage } from "../../../lib/firebase";
import { ref, uploadBytes } from "firebase/storage";

const Index = () => {
  const [type, setType] = useState("cours");
  const [selectedFiles, setSelectedFiles] = useState<any[]>([]);
  //   const [currentFile, setCurrentFile] = useState("");
  //   const [percent, setPercent] = useState(0);

  const handleChange = (event: SelectChangeEvent) => {
    setType(event.target.value as string);
  };

  const handleFileChange = (event: any) => {
    setSelectedFiles(event.target.files);
  };

  const onSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const module = document.getElementById("module-name") as HTMLInputElement;

      //   console.log(selectedFiles);

      Array.from(selectedFiles).map((file) => {
        const fileRef = ref(storage, `${module.value}/${type}/${file.name}`);

        const uploadTask = uploadBytes(fileRef, file);

        uploadTask
          .then(() => {
            console.log(`${file.name} uploaded!`);
          })
          .catch((error) => {
            console.log(error);
          });
      });
    } catch (error: any) {
      if (error.response) {
        console.log(error.response.data);
      }
      console.log(error);
      alert("something went wrong :(");
    }
  };

  return (
    <form className={classes.add} onSubmit={onSubmit}>
      <TextField
        className={classes.field}
        id="module-name"
        label="Module"
        variant="outlined"
        required
      />
      <FormControl className={classes.field}>
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
          <MenuItem value="exam">exam</MenuItem>
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
        <PublishRoundedIcon /> Import File
        <input
          multiple
          required
          onChange={handleFileChange}
          id="asset-file"
          type="file"
          hidden
        />
      </Button>
      <button className={classes.btn}>Submit</button>
      {/* {currentFile && ( */}
      {/* <div style={{ marginTop: "20px" }}>
        {currentFile}: {percent}%
      </div> */}
      {/* )} */}
    </form>
  );
};

export default Index;
