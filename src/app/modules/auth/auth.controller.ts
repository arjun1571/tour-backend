import httpStatus from "http-status-codes";
import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { AuthService } from "./auth.service";

const credentialsLogin = catchAsync(async (req: Request, res: Response) => {
  const logInInfo = await AuthService.credentialsLogin(req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Login Successfully",
    data: logInInfo,
  });
});
const getNewAccessToken = catchAsync(async (req: Request, res: Response) => {
  // const refreshToken = req.cookies.refreshToken;
  const refreshToken = req.headers.authorization;
  const tokenInfo = await AuthService.getNewAccessToken(refreshToken as string);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Login Successfully",
    data: tokenInfo,
  });
});

export const AuthController = {
  credentialsLogin,
  getNewAccessToken,
};
