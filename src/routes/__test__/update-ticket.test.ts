import request from "supertest";
import { app } from "../../app";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";

test("should return 404 if id doesn't exist", async () => {
  const payload = {
    id: "asaeoih",
    email: "test@test.com",
  };

  const token = jwt.sign(payload, "asdf");

  const createdCookie = `user=${token}`;

  const mongooseId = new mongoose.Types.ObjectId().toHexString();

  await request(app)
    .put(`/api/tickets/${mongooseId}`)
    .set("Cookie", createdCookie)
    .send({
      title: "sahdfo",
      price: 20.0,
    })
    .expect(404);
});

test("should return 401 if user is not authenticated", async () => {
  const mongooseId = new mongoose.Types.ObjectId().toHexString();

  await request(app)
    .put(`/api/tickets/${mongooseId}`)
    // .set("Cookie", createdCookie)
    .send({
      title: "sahdfo",
      price: 20.0,
    })
    .expect(403);
});

test("Returns a 401 if user doesn't own the ticket", async () => {
  // Need to create two separate users

  // Creating a ticket
  const payload1 = {
    id: "asaeoih",
    email: "test@test.com",
  };

  const token1 = jwt.sign(payload1, "asdf");

  const createdCookie1 = `user=${token1}`;

  const response1 = await request(app)
    .post("/api/ticket")
    .set("Cookie", createdCookie1)
    .send({ title: "Some Custom Title", price: 20.0 })
    .expect(201);

  //   Creating another user and trying to update

  const payload2 = {
    id: "ashefuhoiawde",
    email: "test@test.com",
  };

  const token2 = jwt.sign(payload2, "asdf");

  const createdCookie2 = `user=${token2}`;

  await request(app)
    .put(`/api/tickets/${response1.body.ticket.id}`)
    .set("Cookie", createdCookie2)
    .send({
      title: "Updated by another user",
      price: 23.0,
    })
    .expect(401);
});

test("Returns a 400 if the user provides an invalid title or price", async () => {
  const payload = {
    id: "asaeoih",
    email: "test@test.com",
  };

  const token = jwt.sign(payload, "asdf");

  const createdCookie = `user=${token}`;

  // const mongooseId = new mongoose.Types.ObjectId().toHexString();

  const response = await request(app)
    .post("/api/ticket")
    .set("Cookie", createdCookie)
    .send({ title: "Some Custom Title", price: 20.0 })
    .expect(201);

  // Missing the title
  await request(app)
    .put(`/api/tickets/${response.body.ticket.id}`)
    .set("Cookie", createdCookie)
    .send({
      price: 0.0,
    })
    .expect(400);

  // Missing the price
  await request(app)
    .put(`/api/tickets/${response.body.ticket.id}`)
    .set("Cookie", createdCookie)
    .send({
      title: "Updated by another user",
    })
    .expect(400);
});

test("Should update the ticket provided valid inputs ", async () => {
  const payload = {
    id: "asaeoih",
    email: "test@test.com",
  };

  const token = jwt.sign(payload, "asdf");

  const createdCookie = `user=${token}`;

  const response = await request(app)
    .post("/api/ticket")
    .set("Cookie", createdCookie)
    .send({ title: "Some Custom Title", price: 20.0 })
    .expect(201);

  const updateResponse2 = await request(app)
    .put(`/api/tickets/${response.body.ticket.id}`)
    .set("Cookie", createdCookie)
    .send({
      title: "Updated by another user",
      price: 300.23,
    })
    .expect(200);

  expect(updateResponse2.body.title).toEqual("Updated by another user");
  expect(updateResponse2.body.price).toEqual(300.23);

  const getResponse = await request(app)
    .get(`/api/tickets/${updateResponse2.body.id}`)
    // .set("Cookie", createdCookie)
    .expect(200);

  expect(getResponse.body.title).toEqual("Updated by another user");
  expect(getResponse.body.price).toEqual(300.23);
});
