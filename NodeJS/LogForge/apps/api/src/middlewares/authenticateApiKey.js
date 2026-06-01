const Developer = require('../models/Developer');

async function authenticateApiKey(req, res, next) {
  const apiKey = req.header('x-api-key');

  if (!apiKey) {
    return res.status(401).json({ message: 'x-api-key header is required.' });
  }

  const developer = await Developer.findOne({ apiKey }).lean();

  if (!developer) {
    return res.status(401).json({ message: 'Invalid API key.' });
  }

  req.apiDeveloper = {
    id: developer._id.toString(),
    email: developer.email,
    username: developer.username
  };

  return next();
}

module.exports = authenticateApiKey;