import request from "supertest";
import app from "../../app";

describe("requestValidatorMiddleware", () => {
  it("returns 200 response when no validation rules exist", async () => {
    const response = await request(app)
      .delete("/api/account/member")
      .send({ account_id: 123 });

    expect(response.statusCode).toBe(200);
  });

  it("returns 200 response when all validation rules pass", async () => {
    const response = await request(app).put("/api/account/profile").send({
      name: "Matthew",
      job_title: "Software Engineer",
      photo_url: "https://assets.co-hire.com/cord-wordmark.svg",
    });

    expect(response.statusCode).toBe(200);
  });

  it("returns validation errors when required query params not provided", async () => {
    const response = await request(app).get("/api/account/search");

    expect(response.body).toEqual({
      errors: expect.arrayContaining(["'page' is required."]),
    });
    expect(response.statusCode).toBe(400);
  });

  it("returns validation errors when required query params are invalid type", async () => {
    const response = await request(app).get("/api/account/search?page=hello");

    expect(response.body).toEqual({
      errors: expect.arrayContaining(["'page' must be of type 'integer'."]),
    });
    expect(response.statusCode).toBe(400);
  });

  it("returns validation errors when required body properties not provided", async () => {
    const response = await request(app).delete("/api/account/member").send({});

    expect(response.body).toEqual({
      errors: ["'account_id' is required."],
    });
    expect(response.statusCode).toBe(400);
  });

  it("returns validation errors when provided body properties are invalid type", async () => {
    const response = await request(app)
      .delete("/api/account/member")
      .send({ account_id: "invalid" });

    expect(response.body).toEqual({
      errors: ["'account_id' must be of type 'integer'."],
    });
    expect(response.statusCode).toBe(400);
  });

  it("returns validation error when unexpected query parameter is provided", async () => {
    const response = await request(app).get("/api/account/role?name=invalid");

    expect(response.body).toEqual({
      errors: ["Unexpected query parameter 'name' was provided."],
    });
    expect(response.statusCode).toBe(400);
  });

  it("returns validation error when unexpected body parameter is provided", async () => {
    const response = await request(app)
      .delete("/api/account/member")
      .send({ account_id: 1, name: "invalid" });

    expect(response.body).toEqual({
      errors: ["Unexpected body parameter 'name' was provided."],
    });
    expect(response.statusCode).toBe(400);
  });
});
