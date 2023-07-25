import request from "supertest";
import app from "../config/app";

jest.useRealTimers();

describe("SignUp Routes", () => {
  test("Should return an account on success", async () => {
    await request(app)
      .post("/api/signup")
      .send({
        name: "Rodrigo",
        email: "rodriigosantos01@gmail.com",
        password: "123",
        passwordConfirmation: "123",
      })
      .expect(200);
  });
});
