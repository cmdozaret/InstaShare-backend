const archiver = require('archiver');
const { Readable } = require('stream');

const { sequelize } = require('../../../common/db');
const { models } = sequelize;

// Function to zip the file
function zipFile(fileBuffer, fileName) {
  const archive = archiver('zip');
  const stream = new Readable();

  stream._read = () => { }; // No-op
  archive.append(fileBuffer, { name: fileName });
  archive.finalize();

  return new Promise((resolve, reject) => {
    const chunks = [];
    archive.on('data', (chunk) => chunks.push(chunk));
    archive.on('end', () => resolve(Buffer.concat(chunks)));
    archive.on('error', (err) => reject(err));
    stream.pipe(archive);
  });
};


module.exports = async function (req, res) {
  try {
    const userId = req.loggedUser.id;

    const fileName = req.file.originalname;
    const fileType = req.file.mimetype;
    const fileBuffer = req.file.buffer;

    try {
      // Zip the file
      // const zippedFile = await zipFile(fileBuffer, fileName);

      // Save the zipped file to the database
      const file = {
        name: `${fileName}`,
        // type: 'application/zip',
        type: fileType,
        // data: zippedFile,
        data: fileBuffer,
        UserId: userId,
      };
      await models.File.create(file);
    } catch (error) {
      res.status(500).send('Error zipping file: ' + error.message);
    }
    return res.status(201).json({
      message: 'File uploaded successfully',
    });
  }
  catch (error) {
    return res.status(error.status || 500).json({
      message: error.message || 'Error uploading the file',
    })
  }
}
