const { User } = require('../database/models');

const registerUser = async (name, email, password) => {
  const checkedEmail = await User.findOne({ where: { email } });
  const checkedName = await User.findOne({ where: { name } });
  if ((checkedEmail && checkedEmail.email === email)
   || (checkedName && checkedName.name === name)) {
    throw new Error('Conflict');
  }

  return User.create({ name, email, password, role: 'customer' });
};

module.exports = { registerUser };