const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ?? 500;
  const nodeEnv = process.env.NODE_ENV === "production";
  res.status(statusCode).json({
    success: false,
    message: err.message,
    stack: nodeEnv ? null : err.stack,
  });
};

module.exports = errorHandler;
