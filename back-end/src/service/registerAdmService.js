const { Op } = require('sequelize');
const { User } = require('../database/models');

const registerAdmUser = async (name, email, password, role) => {
  // const checkedEmail = await User.findOne({ where: { email } });
  const checkedName = await User.findOne({ where: { 
    [
      Op.or
    ]: [{email}, {name}]
   } });
  if (checkedEmail || checkedName) {
    throw new Error('Conflict');
  }
  return User.create({ name, email, password, role });
};

module.exports = { registerAdmUser };