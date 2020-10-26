const { Router } = require('express');
const currentUser = require('../../middlewares/current-user.js');

const currentUserRouter = Router();

currentUserRouter.get('/api/users/currentuser', currentUser, (req, res) => {
  res.send({ currentUser: req.currentUser || null });
});

module.exports = currentUserRouter;
