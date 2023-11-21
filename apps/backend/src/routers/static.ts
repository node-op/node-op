import { resolve } from "path";
import { Request, Response, Router, static as staticMiddle } from "express";

export const StaticRouter = Router();

const staticDir = resolve(__dirname, "..", "..", "..", "frontend", "dist");

StaticRouter.use(staticMiddle(staticDir));

StaticRouter.use("*", (req: Request, res: Response) => {
  res.sendFile(resolve(staticDir, "index.html"));
});
