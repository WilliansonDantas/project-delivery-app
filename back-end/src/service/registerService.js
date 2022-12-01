const { User } = require('../database/models');

const registerUser = async (name, email, password) => {
  const checkedEmail = await User.findOne({ where: { email } });
  const checkedName = await User.findOne({ where: { name } });
  if (checkedEmail || checkedName) {
    throw new Error('Usuário já cadastrado');
  }
  return User.create({ name, email, password, role: 'customer' });
};

module.exports = registerUser;