const errorHandler = (err, req, res, next) => {
  console.error(err);
  res.status(500).send({
    errors: [{ message: 'Something went wrong' }],
  });
  throw new Error();
};

module.exports = errorHandler;
