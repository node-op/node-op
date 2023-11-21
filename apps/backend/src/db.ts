import mongoose from "mongoose";
import { mongo_url } from "./local-db";

const connectOpts: mongoose.ConnectOptions = {};

const url: string = mongo_url || "";
let connection: typeof mongoose;

export const startMongoose = async (urlOverride?: string) => {
  if (connection) {
    return connection;
  }
  // create connection
  console.log(`Connecting to mongo on ${urlOverride ?? url}`);
  connection = await mongoose.connect(urlOverride ?? url, connectOpts);

  // reset
  if (process.env.CLEAR_ALL_DATA) {
    console.log(`Resetting mongo on ${urlOverride ?? url}`);
    connection.connection.db.dropDatabase();
    connection = await mongoose.connect(urlOverride ?? url, connectOpts);
  }
  console.log(`Started and created mongo connection on ${urlOverride ?? url}`);
  return connection;
};

export { connection };
