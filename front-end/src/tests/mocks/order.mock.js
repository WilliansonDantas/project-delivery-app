const order = [
  {
    id: 1,
    userId: 3,
    sellerId: 2,
    totalPrice: '2.20',
    deliveryAddress: 'Rua tal',
    deliveryNumber: '50',
    saleDate: '11/12/2022',
    status: 'In progress 10',
  },
];

const orderEmTransito = [
  {
    id: 1,
    userId: 3,
    sellerId: 2,
    totalPrice: '2.20',
    deliveryAddress: 'Rua tal',
    deliveryNumber: '50',
    saleDate: '11/12/2022',
    status: 'Em Trânsito',
  },
];

const orderByOrderID = {
  orderId: '1',
  totalPrice: '2.20',
  deliveryAddress: 'Rua tal',
  deliveryNumber: '50',
  saleDate: '2022-12-14T21:14:27.000Z',
  status: 'Em Trânsito',
  costumerId: 3,
  costumerName: 'Cliente Zé Birita',
  sellerId: 2,
  sellerName: 'Fulana Pereira',
  products: [
    {
      name: 'Skol Lata 250ml',
      price: '2.20',
      quantity: 2,
    },
  ],
};

module.exports = { order, orderEmTransito, orderByOrderID };
