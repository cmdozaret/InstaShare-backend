const AdmZip = require('adm-zip');

const { sequelize } = require('../../../common/db');
const { models } = sequelize;

module.exports = async function (req, res) {
  try {
    const userId = req.loggedUser.id;

    const fileName = req.file.originalname;
    const fileType = req.file.mimetype;
    const fileBuffer = req.file.buffer;

    try {
      // Create ZIP file
      const zip = new AdmZip();
      zip.addFile(fileName, fileBuffer);
      const zippedFile = zip.toBuffer();

      // Save the zipped file to the database
      const file = {
        name: `${fileName}`,
        type: 'application/zip',
        data: zippedFile,
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
