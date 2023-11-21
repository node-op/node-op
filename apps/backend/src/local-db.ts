import { MongoMemoryServer } from "mongodb-memory-server";

let mongod: MongoMemoryServer;

export let mongo_url = process.env.MONGO_URI;

export const localDb = async (): Promise<string> => {
  const { MongoMemoryServer } = await import("mongodb-memory-server");
  if (!mongod) mongod = await MongoMemoryServer.create({});
  mongo_url = mongod.getUri() as string;
  return mongo_url;
};
