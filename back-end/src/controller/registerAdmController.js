const md5 = require('md5');
const { registerAdmUser } = require('../service/registerAdmService');

const registerAdm = async (req, res) => {
  const { body: { name, email, password, role } } = req;
  try {
    await registerAdmUser(name, email, md5(password), role);
    return res.status(201).json('Created');
  } catch (error) {
    return res.status(409).json(error.message);
  }
};

module.exports = { registerAdm };
