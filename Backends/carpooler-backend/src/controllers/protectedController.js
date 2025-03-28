exports.getProtected = (req, res) => {
    res.status(200).json({ message: 'This is a protected route' });
};