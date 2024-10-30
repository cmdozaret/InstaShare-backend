module.exports = async (req, res) => {
    try {
        return res.status(200).json(req.user);
    } catch (error) {
        return res.status(error.status || 500).json({
            message: error.message || 'Error getting user',
        });
    }
}
