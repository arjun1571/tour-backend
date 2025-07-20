import httpStatus from "http-status-codes";
import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { AuthService } from "./auth.service";
import AppError from "../../errorHelpers/AppError";
import { setAuthCooke } from "../../utils/setCooke";
import { createUserTokens } from "../../utils/userToken";
import { envVars } from "../../config/env";
import { JwtPayload } from "jsonwebtoken";

const credentialsLogin = catchAsync(async (req: Request, res: Response) => {
  const logInInfo = await AuthService.credentialsLogin(req.body);

  setAuthCooke(res, logInInfo);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Login Successfully",
    data: logInInfo,
  });
});
const getNewAccessToken = catchAsync(async (req: Request, res: Response) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    throw new AppError(httpStatus.BAD_REQUEST, "No Token received");
  }
  const tokenInfo = await AuthService.getNewAccessToken(refreshToken as string);

  setAuthCooke(res, tokenInfo);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "New Access Token Successfully",
    data: tokenInfo,
  });
});
const logOut = catchAsync(async (req: Request, res: Response) => {
  res.clearCookie("accessToken", {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
  });
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
  });

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Log out Successfully",
    data: null,
  });
});
const resetPassword = catchAsync(async (req: Request, res: Response) => {
  const decodedToken = req.user;
  const newPassword = req.body.newPassword;
  const oldPassword = req.body.oldPassword;

  await AuthService.resetPassword(
    oldPassword,
    newPassword,
    decodedToken as JwtPayload
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Password Change Successfully",
    data: null,
  });
});
const googleCallBackController = catchAsync(
  async (req: Request, res: Response) => {
    const user = req.user;
    let redirectTo = req.query.state ? (req.query.state as string) : "";

    if (redirectTo.startsWith("/")) {
      redirectTo = redirectTo.slice(1);
    }

    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, "User Not Found");
    }

    const tokenInfo = createUserTokens(user);

    setAuthCooke(res, tokenInfo);

    res.redirect(envVars.FRONTEND_URL);

    res.redirect(`${envVars.FRONTEND_URL}/${redirectTo}`);
  }
);

export const AuthController = {
  credentialsLogin,
  getNewAccessToken,
  logOut,
  resetPassword,
  googleCallBackController,
};
