export function notFound(_req, res) {
  res.status(404).json({ error: "Route not found" });
}

// eslint-disable-next-line no-unused-vars
export function errorHandler(err, _req, res, _next) {
  const status = err.status || 500;
  if (status >= 500) console.error(err);
  res.status(status).json({
    error: status >= 500 && !err.status ? "Something went wrong" : err.message,
    ...(err.details ? { details: err.details } : {}),
  });
}
