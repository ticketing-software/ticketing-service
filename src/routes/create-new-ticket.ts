import { Router, Request, Response } from "express";

const route = Router();

route.post("/api/tickets", (request: Request, response: Response) => {});

export { route as createNewRoute };
