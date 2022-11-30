const { User } = require('../database/models');

const getUser = async (email, password) => {
  const userData = await User.findOne({ where: { email } });

  if (!userData) throw new Error('User not found');

  console.log(userData);
  if (userData && userData.password === password) return userData;

  throw new Error('Invalid fields');
};

module.exports = { getUser };
