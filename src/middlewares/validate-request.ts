import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

function validationRequest(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const errors = validationResult(request);

  if (!errors.isEmpty()) {
    response.send({ error: errors.array() });
  } else {
    next();
  }
}

export { validationRequest };
