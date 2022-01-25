import { RequestValidator } from "../requestValidatorMiddleware";

describe("RequestValidator", () => {
  it("logs validation error when boolean is not valid type", () => {
    const validator = new RequestValidator();

    validator.validateType({ name: "candidate", type: "boolean" }, "true");

    expect(validator.errors.length).toBe(1);
    expect(validator.errors[0]).toBe("'candidate' must be of type 'boolean'.");
  });

  it("does not log validation error when boolean is valid type", () => {
    const validator = new RequestValidator();

    validator.validateType({ name: "candidate", type: "boolean" }, true);

    expect(validator.errors).toEqual([]);
  });

  it("logs validation error when string is not valid type", () => {
    const validator = new RequestValidator();

    validator.validateType({ name: "name", type: "string" }, 123);

    expect(validator.errors.length).toBe(1);
    expect(validator.errors[0]).toBe("'name' must be of type 'string'.");
  });

  it("does not log validation error when string is valid type", () => {
    const validator = new RequestValidator();

    validator.validateType({ name: "name", type: "string" }, "Matt");

    expect(validator.errors).toEqual([]);
  });

  it("logs validation error when integer is not valid type", () => {
    const validator = new RequestValidator();

    validator.validateType({ name: "age", type: "integer" }, "hello");

    expect(validator.errors.length).toBe(1);
    expect(validator.errors[0]).toBe("'age' must be of type 'integer'.");
  });

  it("does not log validation error when integer is valid type", () => {
    const validator = new RequestValidator();

    validator.validateType({ name: "age", type: "integer" }, 26);

    expect(validator.errors).toEqual([]);
  });

  it("logs validation error when array is not valid type", () => {
    const validator = new RequestValidator();

    validator.validateType(
      { name: "names", type: "array", items: { type: "string" } },
      123
    );

    expect(validator.errors.length).toBe(1);
    expect(validator.errors[0]).toBe(
      "'names' must be an array of type 'string'."
    );
  });

  it("logs validation error when array does not contain valid type items", () => {
    const validator = new RequestValidator();

    validator.validateType(
      { name: "numbers", type: "array", items: { type: "string" } },
      [20, 21, 22]
    );

    expect(validator.errors.length).toBe(3);
    expect(validator.errors).toEqual([
      "'numbers[0]' must be of type 'string'.",
      "'numbers[1]' must be of type 'string'.",
      "'numbers[2]' must be of type 'string'.",
    ]);
  });

  it("does not log validation error when array is valid type", () => {
    const validator = new RequestValidator();

    validator.validateType(
      { name: "numbers", type: "array", items: { type: "integer" } },
      [1, 2, 3]
    );

    expect(validator.errors).toEqual([]);
  });
});
