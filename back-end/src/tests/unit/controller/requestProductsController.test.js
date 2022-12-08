const chai = require('chai');
const Sinon = require('sinon');
const chaiHttp = require('chai-http');
const sinonChai = require('sinon-chai');
const { describe } = require('mocha')
const { expect } = chai;
const { allProducts } = require('../mocks/allProducts')
const{ Model} = require('sequelize')
const jwt = require('jsonwebtoken');


const app = require('../../../api/app');
chai.use(sinonChai);
chai.use(chaiHttp);

describe('Teste camada de Controller endpoint products', () => {
  it('Request produtos sem token sucesso', async () => {
    const response = await chai
      .request(app)
      .get('/products');

    expect(response.status).to.be.equal(403);
    expect(JSON.parse(response.text)).to.deep.equal({ message: 'jwt must be provided' });

  });
  it('Request produtos sem token sucesso', async () => {
    Sinon.stub(Model, 'findAll').resolves(allProducts)
    Sinon.stub(jwt,'verify').resolves(true);
    const response = await chai
      .request(app)
      .get('/products');

    expect(response.status).to.be.equal(201);
    expect(JSON.parse(response.text)).to.deep.equal(allProducts);

  });

})