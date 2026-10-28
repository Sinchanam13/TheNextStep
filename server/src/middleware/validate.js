// Validates req.query against a zod schema and stores the result in req.valid.
export const validateQuery = (schema) => (req, _res, next) => {
  const result = schema.safeParse(req.query);
  if (!result.success) {
    const e = new Error("Invalid request parameters");
    e.status = 400;
    e.details = result.error.flatten().fieldErrors;
    return next(e);
  }
  req.valid = result.data;
  next();
};
