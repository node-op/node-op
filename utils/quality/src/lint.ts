import { biomeConfig, runCmdFromHere } from "./util";

export const runRome = () => {
  const lintCmdParts = ["biome", "check", "--config-path", biomeConfig, process.cwd()];
  const formatCmdParts = ["biome", "format", "--config-path", biomeConfig, process.cwd()];
  runCmdFromHere("yarn", lintCmdParts);
  runCmdFromHere("yarn", formatCmdParts);
};

export const runRomeFix = () => {
  const lintCmdParts = ["biome", "check", "--config-path", biomeConfig, process.cwd(), "--apply-unsafe"];
  const formatCmdParts = ["biome", "format", "--config-path", biomeConfig, process.cwd(), "--write"];
  runCmdFromHere("yarn", lintCmdParts);
  runCmdFromHere("yarn", formatCmdParts);
};
