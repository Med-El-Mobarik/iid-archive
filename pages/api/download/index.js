import { getSession } from "next-auth/client";

import fs from "fs";
import path from "path";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const session = await getSession({ req: req });
    if (!session) {
      res.status(401).json({ message: "Not authenticated!" });
      return;
    }

    const { module, file } = req.query;

    if (!module || !file) {
      return res.status(404).send("<h1>404 Not Found</h1>");
    }

    try {
      const filePath = path.resolve(".", "files", module, `${file}.pdf`);
      const buffer = fs.readFileSync(filePath);

      res.setHeader("Content-type", "application/pdf");
      res.setHeader("Content-disposition", `attachment; filename= ${file}.pdf`);
      res.send(buffer);
    } catch (error) {
      return res.status(404).send("<h1>404 Not Found</h1>");
    }
  }
}
