const errorHandler = (err, req, res, next) => {
  console.error(err);
  res.status(500).send({
    errors: [{ msg: 'Something went wrong' }],
  });
  throw new Error();
};

module.exports = errorHandler;
