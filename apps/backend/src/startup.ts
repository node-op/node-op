import { createServer } from "./index";
import { localDb } from "./local-db";

export const is_local_dev = process.env.NODE_ENV === "local";
export const is_test = process.env.NODE_ENV === "test";

const init_db = async () => {
  let url = process.env.MONGO_URI ?? "";
  if (is_test || is_local_dev) {
    url = await localDb();
  }
  console.log("connecting to:", url);
  return url;
};

const init = async () => {
  const url = await init_db();
  await createServer(url);
};

init();
