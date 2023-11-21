import { runCmdFromCallee } from "./util";

export const buildTypes = () => {
  const typeCmdParts = ["tsc", "--noEmit"];
  runCmdFromCallee("yarn", typeCmdParts);
};
