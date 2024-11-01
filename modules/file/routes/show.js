module.exports = async (req, res) => {
    try {
        const file = req.file;
        res.set({
            'Content-Type': file.type,
            'Content-Disposition': `attachment; filename="${file.name}.${file.type.split('/')[1]}"`,
        });
        return res.send(file.data);
    } catch (error) {
        return res.status(error.status || 500).json({
            message: error.message || 'Error getting file',
        });
    }
}
