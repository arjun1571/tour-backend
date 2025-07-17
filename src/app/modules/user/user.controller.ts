import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status-codes";
import { UserServices } from "./user.service";

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await UserServices.createUserService(req.body);

    res.status(httpStatus.CREATED).json({
      message: "User Create Successfully",
      user,
    });
  } catch (error: any) {
    console.log(error);
    next(error);
  }
};

export const UserControllers = {
  createUser,
};
function createUserService(body: any) {
  throw new Error("Function not implemented.");
}
