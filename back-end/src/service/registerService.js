const { User } = require('../database/models');

const registerUser = async (name, email, password) => {
  const checkedEmail = User.findOne({ where: { email } });
  const checkedName = User.findOne({ where: { name } });
  if (checkedEmail || checkedName) {
    throw new Error('Usuário já cadastrado');
  }
  return User.create({ name, email, password });
};

module.exports = registerUser;