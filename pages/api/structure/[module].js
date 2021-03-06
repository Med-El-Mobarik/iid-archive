import { getSession } from "next-auth/client";
import { connectToDatabase } from "../../../lib/db";
import { storage } from "../../../lib/firebase";
import { ref, listAll } from "firebase/storage";

export default async function handler(req, res) {
  if (req.method === "GET") {
    // console.log(req.cookies);
    const session = await getSession({ req: req });

    // console.log("down5");
    // console.log(session);

    if (!session) {
      res.status(401).json({ message: "Not authenticated!" });
      return;
    }

    const { module } = req.query;
    if (!module) {
      return res.status(400).send("Something went worng");
    }

    let cours = [];
    let tds = [];
    let exams = [];
    let projects = [];

    try {
      const listRefCours = ref(storage, `${req.query.module}/cours`);
      const res1 = await listAll(listRefCours);
      res1.items.forEach(async (itemRef) => {
        cours.push(itemRef.name);
      });

      const listRefTds = ref(storage, `${req.query.module}/tds`);
      const res2 = await listAll(listRefTds);
      res2.items.forEach(async (itemRef) => {
        tds.push(itemRef.name);
      });

      const listRefExams = ref(storage, `${req.query.module}/exams`);
      const res3 = await listAll(listRefExams);
      res3.items.forEach(async (itemRef) => {
        exams.push(itemRef.name);
      });

      const listRefProjects = ref(storage, `${req.query.module}/projects`);
      const res4 = await listAll(listRefProjects);
      res4.items.forEach(async (itemRef) => {
        projects.push(itemRef.name);
      });

      // console.log({ cours, tds, exams });
      res.status(200).json({ cours, tds, exams, projects });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .send({ message: "Error from firebase tree structure!" });
    }
  } else {
    return null;
  }
}

export const config = {
  api: {
    Credential: true,
    origin: "http://localhost:3000",
  },
};
