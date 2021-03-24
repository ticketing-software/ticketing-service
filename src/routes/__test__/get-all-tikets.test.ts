import request from "supertest";
import { app } from "../../app";
import jwt from "jsonwebtoken";

test("Can fetch a list of tickets", async () => {
  const payload = {
    id: "asaeoih",
    email: "test@test.com",
  };

  const token = jwt.sign(payload, "asdf");

  const createdCookie = `user=${token}`;

  //   Creating one ticket
  await request(app)
    .post("/api/ticket")
    .set("Cookie", createdCookie)
    .send({ title: "Some Custom Title", price: 20.0 })
    .expect(201);

  // Creating two tickets
  await request(app)
    .post("/api/ticket")
    .set("Cookie", createdCookie)
    .send({ title: "Some other title", price: 20.0 })
    .expect(201);

  const response = await request(app).get("/api/tickets").send().expect(200);

  expect(response.body.length).toEqual(2);
});
