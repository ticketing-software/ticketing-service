import { Router, Request, Response } from "express";
import { body } from "express-validator";
import { validationRequest } from "../middlewares/validate-request";
import { Ticket } from "../models/ticket";

const route = Router();

route.post(
  "/api/tickets",
  [
    body("title").not().isEmpty().withMessage("Title is not required"),
    body("price")
      .isFloat({ gt: 0 })
      .withMessage("Price Must be greater than zero"),
  ],
  validationRequest,
  (request: Request, response: Response) => {
    const { title, price } = request.body;

    // const existingTicket = Ticket.find({ title });

    const ticket = Ticket.build({ title, price });

    response.status(201).send({ ticket });
  }
);

export { route as createNewRoute };
