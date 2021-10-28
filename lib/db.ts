import { MongoClient } from "mongodb";

export const connectToDatabase = async () => {
  const client = await MongoClient.connect(
    `mongodb+srv://${process.env.username}:${process.env.password}@iid-archive-database.wb1a0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
  );

  return client;
};
