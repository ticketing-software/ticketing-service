import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import cookie from "cookie";
import UserCookieNotFound from "../errors/user-cookie-not-found";

declare global {
  namespace Express {
    interface Request {
      currentUser?: any;
    }
  }
}

function checkUser(request: Request, response: Response, next: NextFunction) {
  try {
    const theUsercookie = request.get("Cookie")?.toString();

    let theObject = cookie.parse(theUsercookie!);

    const payload = jwt.verify(theObject.user, "asdf");

    request.currentUser = payload;

    next();
  } catch (error) {
    throw new UserCookieNotFound("Unable to verify or validate cookie");
  }
}

export { checkUser };
