import { Request, Response, NextFunction } from "express";
import { Ticket } from "../models/ticket";

async function checkTicket(
  request: Request,
  response: Response,
  next: NextFunction
) {
  console.log("Middleware");

  try {
    const ticket = await Ticket.findById(request.params.id);

    next();
  } catch (error) {
    throw new Error("Not Found Bitch");
  }

  //   next();
}

export { checkTicket };
