import { Request, Response, Router } from "express";
import { body } from "express-validator";
import { validationRequest } from "../middlewares/validate-request";
import { checkUser } from "../middlewares/check-current-user";
import { Ticket } from "../models/ticket";

const route = Router();

route.post(
  "/api/ticket",
  checkUser,
  [
    body("title").not().isEmpty().withMessage("Title is required"),
    body("price")
      .isFloat({ gt: 0 })
      .withMessage("Price Must be greater than zero"),
  ],
  validationRequest,
  (request: Request, response: Response) => {
    const { title, price } = request.body;

    const payload = request.currentUser;

    if (payload) {
      const ticket = Ticket.build({ title, price, userId: payload.id });
      // const ticket = new Ticket({ title, price, userId: payload.id });
      ticket.save();

      response.status(201).send({ ticket });
    } else {
      response.send({ message: "Didn't Receive Cookie" });
    }
  }
);

export { route as ticketRoute };
