const bcrypt = require('bcryptjs');
const { z } = require('zod');
const Developer = require('../models/Developer');
const env = require('../config/env');
const { generateApiKey } = require('../utils/apiKey');
const { signAuthToken, buildCookieOptions } = require('../utils/jwt');

const registerSchema = z.object({
  username: z.string().min(3).max(50),
  email: z.string().email(),
  password: z.string().min(8).max(100)
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(100)
});

function mapDeveloper(developer) {
  return {
    id: developer._id,
    username: developer.username,
    email: developer.email,
    apiKey: developer.apiKey,
    createdAt: developer.createdAt
  };
}

async function register(req, res) {
  const input = registerSchema.parse(req.body);

  const existing = await Developer.findOne({ email: input.email.toLowerCase() }).lean();
  if (existing) {
    return res.status(409).json({ message: 'Email already exists.' });
  }

  const passwordHash = await bcrypt.hash(input.password, 12);
  const developer = await Developer.create({
    username: input.username,
    email: input.email.toLowerCase(),
    passwordHash,
    apiKey: generateApiKey()
  });

  const token = signAuthToken({ sub: developer._id.toString(), email: developer.email });
  res.cookie(env.cookieName, token, buildCookieOptions());

  return res.status(201).json({ developer: mapDeveloper(developer) });
}

async function login(req, res) {
  const input = loginSchema.parse(req.body);

  const developer = await Developer.findOne({ email: input.email.toLowerCase() });
  if (!developer) {
    return res.status(401).json({ message: 'Invalid email or password.' });
  }

  const isMatch = await bcrypt.compare(input.password, developer.passwordHash);
  if (!isMatch) {
    return res.status(401).json({ message: 'Invalid email or password.' });
  }

  const token = signAuthToken({ sub: developer._id.toString(), email: developer.email });
  res.cookie(env.cookieName, token, buildCookieOptions());

  return res.status(200).json({ developer: mapDeveloper(developer) });
}

async function logout(req, res) {
  const cookieOptions = buildCookieOptions();
  const { maxAge, ...clearOptions } = cookieOptions;
  void maxAge;
  res.clearCookie(env.cookieName, clearOptions);
  return res.status(200).json({ message: 'Logged out.' });
}

async function me(req, res) {
  const developer = await Developer.findById(req.user.id).lean();

  if (!developer) {
    return res.status(404).json({ message: 'Developer not found.' });
  }

  return res.status(200).json({ developer: mapDeveloper(developer) });
}

module.exports = {
  register,
  login,
  logout,
  me
};
