import { getSession } from "next-auth/client";
const formidable = require("formidable");
import { storage } from "../../../lib/firebase";
import { ref, uploadBytes } from "firebase/storage";

import fs from "fs";
import path from "path";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const session = await getSession({ req: req });
    if (!session) {
      res.status(401).json({ message: "Not authenticated!" });
      return;
    }

    if (!req.query.module || !req.query.type) {
      return res.status(400).json({ message: "Bad request" });
    }

    const form = new formidable.IncomingForm({
      multiples: true,
      keepExtensions: true,
    });

    form.parse(req, (err, fields, files) => {
      if (err) {
        res.status(400).json({ message: "Something went wrong!" });
        return reject(err);
      }

      //   console.log(files.file);

      files.file.map((file) => {
        const fileRef = ref(
          storage,
          `${req.query.module}/${req.query.type}/${file.name}`
        );
        // fileRef
        //   .put(file)
        //   .then((snapshot) => {
        //     console.log("Created!");
        //   })
        //   .catch((error) => {
        //     console.log(error);
        //   });

        // uploadBytes(fileRef, file)
        //   .then((snapshot) => {
        //     console.log("Uploaded a blob or file!");
        //   })
        //   .catch((error) => {
        //     console.log(error);
        //   });
      });

      console.log(fields, files);
      res.status(200).json({ fields, files });
    });
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};
