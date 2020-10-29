const path = require('path');
const { Router } = require('express');
const File = require('../../models/file');
const requireAuth = require('../../middlewares/require-auth');
const currentUser = require('../../middlewares/current-user');

const downloadRouter = Router();

downloadRouter.get(
  '/api/files/download/:id',
  currentUser,
  requireAuth,
  async (req, res) => {
    try {
      const file = await File.findById(req.params.id);
      res.set({
        'Content-Type': file.file_mimetype,
      });
      res.sendFile(path.join(__dirname, '..', file.file_path));
    } catch (error) {
      res.status(400).send({
        errors: [
          {
            msg:
              'Encountered an error while downloading file. Please try again later.',
          },
        ],
      });
    }
  }
);

module.exports = downloadRouter;
