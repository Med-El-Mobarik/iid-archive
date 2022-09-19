import PictureAsPdfOutlinedIcon from '@mui/icons-material/FileDownload';
import { storage } from "../../../lib/firebase";
import { ref, getDownloadURL } from "firebase/storage";
// import axios, { AxiosResponse } from "axios";

interface Props {
  files: string[];
  name: string;
  classes: {
    readonly [key: string]: string;
  };
  module: string;
  type: string;
}

const row = (props: Props) => {
  const { files, name, module, type } = props;

  return (
    <div>
      <h3>{name}</h3>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {files.map((file, id) => (
          <div
            onClick={async () => {
              try {
                const fileRef = ref(storage, `${module}/${type}/${file}`);
                const fileUrl = await getDownloadURL(fileRef);
                window.open(fileUrl);
              } catch (error) {
                alert("Sorry we couldn't find This file");
              }
            }}
            key={id}
            style={{
              display: "flex",
              margin: "0 15px 10px 0",
              cursor: "pointer",
            }}
          >
            <PictureAsPdfOutlinedIcon style={{ color: "tomato" }} /> {file}
          </div>
        ))}
      </div>
    </div>
  );
};

export default row;
