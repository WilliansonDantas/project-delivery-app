const { getUsers, userDelete } = require('../service/usersServices');

const request = async (req, res) => {
  try {
    const users = await getUsers();
    return res.status(201).json(users); 
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    await userDelete(id);
    return res.status(201).json(); 
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};
  
module.exports = { request, deleteUser };