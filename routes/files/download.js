const path = require('path');
const fs = require('fs');
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
      console.log('Im getting here');
      const file = await File.findById(req.params.id).cache({
        time: 10,
      });
      res.set({
        'Content-Type': file.file_mimetype,
      });

      // const stat = fs.statSync(path.join(__dirname, '..', file.file_path));

      console.log('STAT: ', path.join(__dirname, '..', file.file_path));
      console.log('Im getting here 2');
      res.download(path.join(__dirname, '..', file.file_path));
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
