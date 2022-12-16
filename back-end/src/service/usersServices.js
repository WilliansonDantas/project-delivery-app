const { User } = require('../database/models');

const getUsers = async () => User.findAll();

const userDelete = async (id) => User.destroy({ where: { id } });

module.exports = { getUsers, userDelete };