const requireAuth = (req, res, next) => {
  if (!req.currentUser) {
    res.status(401).send({
      errors: [{ msg: 'Yoo are not authorized to perform this operation' }],
    });
    throw new Error();
  }

  next();
};

module.exports = requireAuth;
