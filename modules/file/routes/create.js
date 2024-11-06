const AdmZip = require('adm-zip');

const { sequelize } = require('../../../common/db');
const { models } = sequelize;

module.exports = async function (req, res) {
  try {
    const userId = req.loggedUser.id;

    // const fileName = req.file.originalname;
    const originalName = req.file.originalname;
    const fileName = originalName.substring(0, originalName.lastIndexOf("."));
    const fileBuffer = req.file.buffer;
    // Get size in Bytes
    let fileOriginalSize = req.file.size;
    // Calculate size in megabytes
    fileOriginalSize = fileOriginalSize / (1024 * 1024);
    // Round to two decimal places
    fileOriginalSize = Math.round((fileOriginalSize + Number.EPSILON) * 100) / 100;


    try {
      // Create ZIP file
      const zip = new AdmZip();
      zip.addFile(originalName, fileBuffer);
      const zippedFile = zip.toBuffer();
      let zippedSize = zippedFile.length;
      zippedSize = zippedSize / (1024 * 1024);
      // Round to two decimal places
      zippedSize = Math.round((zippedSize + Number.EPSILON) * 100) / 100;

      // Save the zipped file to the database
      const file = {
        name: `${fileName}`,
        type: req.file.mimetype,
        data: zippedFile,
        originalSize: `${fileOriginalSize} MB`,
        zippedSize: `${zippedSize} MB`,
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
