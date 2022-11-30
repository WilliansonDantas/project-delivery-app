const { User } = require('../database/models');

const getUser = async (email, password) => {
  const userData = await User.findOne({ where: { email } });

  if (userData && userData.password === password) return userData;

  throw new Error('Invalid Fields');
};

module.exports = { getUser };
