const cron = require('node-cron');
const fs = require('fs');
const path = require('path');
const zlib = require('zlib');
const File = require('../models/file');
const status = require('../constants/status');

const compressFiles = cron.schedule('*/10 * * * * *', async function () {
  const files = await File.find({ status: status.notProcessed });
  if (files.length === 0) {
    console.log('There are no files to compress');
    return;
  }

  console.log('compressing: ', files);

  Promise.all(
    files.map((file) => {
      return new Promise((resolve, reject) => {
        const fileContents = fs.createReadStream(
          path.join(__dirname, '..', file.file_path)
        );
        const writeStream = fs.createWriteStream(
          `${path.join(__dirname, '..', file.file_path)}.gz`
        );
        const zip = zlib.createGzip();

        fileContents
          .pipe(zip)
          .pipe(writeStream)
          .on('finish', (err) => {
            if (err) {
              return reject(err);
            }

            const stat = fs.statSync(writeStream.path);
            file.file_path = `${file.file_path}.gz`;
            file.size = stat.size;
            file.status = status.processed;

            let currentFile;
            File.findOne({ _id: file._id }, (err, res) => {
              if (err) {
                console.error(err);
                return;
              }

              currentFile = res;
              currentFile.set({
                file_path: `${file.file_path}.gz`,
                size: stat.size,
                status: status.processed,
              });
              currentFile.save();
            });

            writeStream.close(() => resolve());
          });
      });
    })
  )
    .then(() => {
      console.log('FILES: ');
    })
    .catch((err) => console.error(err));
});

module.exports = compressFiles;
