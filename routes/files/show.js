const { Router } = require('express');
const File = require('../../models/file');
const requireAuth = require('../../middlewares/require-auth');
const currentUser = require('../../middlewares/current-user');

const showFilesRouter = Router();

showFilesRouter.get(
  '/api/files/getAllFiles',
  currentUser,
  requireAuth,
  async (req, res) => {
    try {
      const files = await File.find({});
      const filesByCreationDate = files.sort(
        (a, b) => b.createdAt - a.createdAt
      );
      res.send(filesByCreationDate);
    } catch (error) {
      res.status(400).send({
        errors: [
          {
            msg:
              'Encountered and error while getting list of files. Please try again later.',
          },
        ],
      });
    }
  }
);

module.exports = showFilesRouter;
