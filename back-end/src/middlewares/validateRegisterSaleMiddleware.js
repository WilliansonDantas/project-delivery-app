const { registerSaleSchema } = require('../joi/schemas');

const registerSaleValidation = (req, res, next) => {
  const { body: { user,
      seller,
      totalPrice,
      deliveryAddress,
      deliveryNumber, 
      status,
      products } } = req;

    const { error } = registerSaleSchema.validate({ user,
      seller,
      totalPrice,
      deliveryAddress,
      deliveryNumber, 
      status,
      products });
      console.log(error);
    if (error) return res.status(400).json({ message: error.message });
   
    next();
};

module.exports = registerSaleValidation;