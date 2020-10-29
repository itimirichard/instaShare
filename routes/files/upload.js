const path = require('path');
const { Router } = require('express');
const File = require('../../models/file');
const upload = require('../../services/upload');
const status = require('../../constants/status');
const requireAuth = require('../../middlewares/require-auth');
const currentUser = require('../../middlewares/current-user');

const uploadRouter = Router();

uploadRouter.post(
  '/api/files/upload',
  currentUser,
  requireAuth,
  upload.single('file'),
  async (req, res) => {
    console.log(req);
    try {
      const { name } = req.body;
      const { path, mimetype } = req.file;
      const file = new File({
        name,
        status: status.notProcessed,
        file_path: path,
        file_mimetype: mimetype,
      });
      await file.save();
      res.send('file uploaded successfully.');
    } catch (error) {
      res.status(400).send({
        errors: [
          {
            msg:
              'Encountered and error while uploading file. Please try again later.',
          },
        ],
      });
    }
  }
);

module.exports = uploadRouter;
