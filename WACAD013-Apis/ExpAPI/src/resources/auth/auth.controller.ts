import type { Request, Response } from "express";
import { UserType } from "../userType/userType.constants.js";
import { handleError } from "./auth.errors.js";
import { createUser } from "../user/user.service.js";
import type { LoginDto, SignupDto } from "./auth.types.js";
import { checkCredential } from "./auth.services.js";

const signup = async (req: Request, res: Response) => {
  const data = req.body as SignupDto;
  try {
    const user = await createUser({
      ...data,
      userTypeId: UserType.CLIENT});
    res.status(201);
  } catch (err) {
    handleError(err, res);
  }
};

const login = async (req: Request, res: Response) => {
  const data = req.body as LoginDto;
  try {
    const user = await checkCredential(data);
    if (!user)
      return res.status(401)

    req.session.userId = user.id;
    req.session.userTypeId = user.userTypeId;
    res.status(200)
  } catch (err) {
    handleError(err, res);
  }
};

const logout = async (req: Request, res: Response) => {
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
      res.status(400)
    } else {
      res.status(200)
    }
  });
};

export default { signup, login, logout };