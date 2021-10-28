import { getSession } from "next-auth/client";
import { connectToDatabase } from "../../../lib/db";
// import { storage } from "../../../lib/firebase";
// import { listAll, ref } from "firebase/storage";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const session = await getSession({ req: req });

    if (!session) {
      res.status(401).json({ message: "Not authenticated!" });
      return;
    }

    // const listRef = ref(storage, "/");
    // listAll(listRef)
    //   .then((res) => {
    //     console.log(res);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });

    const client = await connectToDatabase();
    const yearsCollection = client.db().collection("years");

    const modules = await yearsCollection.find().toArray();
    if (!modules) {
      client.close();
      return res.status(404).send("Something strange happened!");
    }

    res.status(200).json(modules);

    client.close();
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
