import { NextFunction, Request, Response, Router } from "express";
import { AppRoutes, UserCreatePayload, UserLoginPayload, UserLoginResponse } from "shapes";
import { User, authenticate, createToken } from "../models/user";

const router = Router();

export const userLogin = async (
  req: Request<unknown, unknown, UserLoginPayload>,
  res: Response<UserLoginResponse>,
  next: NextFunction,
) => {
  const { username, password } = req.body;
  try {
    const userFound = await authenticate(username, password);
    const token = await createToken(userFound?.id || "");
    res.cookie("token", token, { maxAge: 900000, httpOnly: true });
    res.send({ token });
  } catch (error) {
    next(error);
  }
};

router.post(AppRoutes.login, userLogin);

export const createUser = async (
  req: Request<unknown, unknown, UserCreatePayload>,
  res: Response<UserLoginResponse>,
  next: NextFunction,
) => {
  const { username, password, email } = req.body;
  try {
    const builtUser = await User.create({ username, password, email });
    const token = await createToken(builtUser?.id || "");
    res.cookie("token", token, { maxAge: 900000, httpOnly: true });
    res.send({ token });
  } catch (error) {
    next(error);
  }
};

router.post(AppRoutes.register, createUser);

export const UserRouter = router;
