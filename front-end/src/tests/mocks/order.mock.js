const skolLata = 'Skol Lata 250ml';

const fulana = 'Fulana Pereira';

const zeBirita = 'Cliente Zé Birita';

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
  saleDate: '2022-12-14',
  status: 'Em Trânsito',
  costumerId: 3,
  costumerName: zeBirita,
  sellerId: 2,
  sellerName: fulana,
  products: [
    {
      name: skolLata,
      price: '2.20',
      quantity: 2,
    },
  ],
};

const orderByOrderIdPendente = {
  orderId: '1',
  totalPrice: '2.20',
  deliveryAddress: 'Rua tal',
  deliveryNumber: '50',
  saleDate: '2022-12-14',
  status: 'Pendente',
  costumerId: 3,
  costumerName: zeBirita,
  sellerId: 2,
  sellerName: fulana,
  products: [
    {
      name: skolLata,
      price: '2.20',
      quantity: 2,
    },
  ],
};

const orderByOrderIdEmTransito = {
  orderId: '1',
  totalPrice: '2.20',
  deliveryAddress: 'Rua tal',
  deliveryNumber: '50',
  saleDate: '2022-08-14',
  status: 'Pendente',
  costumerId: 3,
  costumerName: zeBirita,
  sellerId: 2,
  sellerName: fulana,
  products: [
    {
      name: skolLata,
      price: '2.20',
      quantity: 2,
    },
  ],
};

const orderByOrderIdPreparando = {
  orderId: '1',
  totalPrice: '2.20',
  deliveryAddress: 'Rua tal',
  deliveryNumber: '50',
  saleDate: '2022-12-14T21:14:27.000Z',
  status: 'Preparando',
  costumerId: 3,
  costumerName: zeBirita,
  sellerId: 2,
  sellerName: fulana,
  products: [
    {
      name: skolLata,
      price: '2.20',
      quantity: 2,
    },
  ],
};

const orderByOrderIdEntregue = {
  orderId: '1',
  totalPrice: '2.20',
  deliveryAddress: 'Rua tal',
  deliveryNumber: '50',
  saleDate: '2022-12-14T21:14:27.000Z',
  status: 'Entregue',
  costumerId: 3,
  costumerName: zeBirita,
  sellerId: 2,
  sellerName: fulana,
  products: [
    {
      name: skolLata,
      price: '2.20',
      quantity: 2,
    },
  ],
};

module.exports = {
  order,
  orderEmTransito,
  orderByOrderID,
  orderByOrderIdPendente,
  orderByOrderIdEmTransito,
  orderByOrderIdPreparando,
  orderByOrderIdEntregue };
