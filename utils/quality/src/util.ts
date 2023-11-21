import { type SpawnOptions, spawnSync } from "child_process";
import { resolve } from "path";

export const rootDir = resolve(__dirname, "..", "..", "..");
export const configBase = resolve(__dirname, "..");
export const biomeConfig = resolve(__dirname, "configs");
export const jestConfig = resolve(biomeConfig, "jest.js");

export const runCmdFromHere = (cmd: string, args: string[]) => {
  const opts: SpawnOptions = {
    env: { ...process.env },
    shell: true,
    stdio: "inherit",
    cwd: configBase,
  };
  spawnSync(cmd, args, opts);
};

export const runCmdFromCallee = (cmd: string, args: string[]) => {
  const opts: SpawnOptions = {
    env: { ...process.env },
    shell: true,
    stdio: "inherit",
    cwd: process.cwd(),
  };
  spawnSync(cmd, args, opts);
};

export const runCmd = (
  cmd: string,
  args: string[],
  stdioOverride?: SpawnOptions["stdio"],
  cwd = process.cwd(),
  env = process.env,
) => {
  const opts: SpawnOptions = {
    env,
    shell: true,
    stdio: stdioOverride ?? "inherit",
    cwd,
  };
  return spawnSync(cmd, args, opts);
};

export const runCmdFromRoot = (
  cmd: string,
  args: string[],
  stdioOverride?: SpawnOptions["stdio"],
  env = process.env,
  cwd = rootDir,
) => {
  const opts: SpawnOptions = {
    env,
    shell: true,
    stdio: stdioOverride || "inherit",
    cwd,
  };
  return spawnSync(cmd, args, opts);
};
