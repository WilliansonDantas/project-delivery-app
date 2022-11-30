const error = (err, _req, res, _next) =>
 res.status(500).json({ message: `Internal server error: ${err.message}` });

module.exports = error;