const { Router } = require('express');

const signoutRouter = Router();

signoutRouter.post('/api/users/signout', (req, res) => {
  req.session = null;

  res.send({});
});

module.exports = signoutRouter;
