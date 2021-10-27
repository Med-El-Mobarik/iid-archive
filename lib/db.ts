import { MongoClient } from "mongodb";

export const connectToDatabase = async () => {
  const client = await MongoClient.connect(
    "mongodb+srv://med:4QqUx973Wpxe4QLg@iid-archive-database.wb1a0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
  );

  return client;
};
