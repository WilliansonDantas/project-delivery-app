const { Op } = require('sequelize');
const { User } = require('../database/models');

const registerAdmUser = async (name, email, password, role) => {
  const checked = await User.findOne({ where: { 
    [
      Op.or
    ] : [ { email }, { name } ]
   } });
  if (checked) {
    throw new Error('Conflict');
  }
  return User.create({ name, email, password, role });
};

module.exports = { registerAdmUser };