const chai = require('chai');
const Sinon = require('sinon');
const {User} = require('../../../database/models');
const chaiHttp = require('chai-http');
const sinonChai = require('sinon-chai');
const { describe } = require('mocha')
const registerService = require('../../../service/registerService');
const { expect } = chai;
const{ Model} = require('sequelize')

const app = require('../../../api/app');
chai.use(sinonChai);
chai.use(chaiHttp);

describe('Testes camada de Controller endpoint /register', () => {
  it('Request register com sucesso', async () => {
    const validUserData = {
      id:12,
      name:'Cliente Zé Gaita',
      email:'zegaita@email.com',
      password:'1c37466c159755ce1fa181bd247cb925',
      role:'customer',
    };
    Sinon.stub(Model, 'findOne').resolves();
    Sinon.stub(Model, 'create').resolves(validUserData);
    const response = await chai
      .request(app)
      .post('/register')
      .send({ 
        name:'Cliente Zé Gaita',
        email:'zegaita@email.com',
        password: '$#zebirita#$'
      });
      expect(response.status).to.be.equal(201);
      expect(response.text).to.be.equal('"Created"');
  });
  it('Request register sem sucesso', async () => {
    const validUserData = {
      id:12,
      name:'Cliente Zé Gaita',
      email:'zegaita@email.com',
      password:'1c37466c159755ce1fa181bd247cb925',
      role:'customer',
    };
    Sinon.stub(Model, 'findOne').resolves(validUserData);
    Sinon.stub(Model, 'create').resolves();
    const response = await chai
      .request(app)
      .post('/register')
      .send({ 
        name:'Cliente Zé Gaita',
        email:'zegaita@email.com',
        password: '$#zebirita#$'
      });
      expect(response.status).to.be.equal(409);
      expect(response.text).to.be.equal('"Conflict"');
  });
  it('Request register body incompleto name', async () => {
    const response = await chai
      .request(app)
      .post('/register')
      .send({ 
        email:'zegaita@email.com',
        password: '$#zebirita#$'
      });
      expect(response.status).to.be.equal(400);
      expect(JSON.parse(response.text)).to.deep.equal({message:"Invalid fields"});
  });
  it('Request register body incompleto email', async () => {
    const response = await chai
      .request(app)
      .post('/register')
      .send({ 
        name:'Cliente Zé Gaita',
        password: '$#zebirita#$'
      });
      expect(response.status).to.be.equal(400);
      expect(JSON.parse(response.text)).to.deep.equal({message:"Invalid fields"});
  });
  it('Request register body incompleto password', async () => {
    const response = await chai
      .request(app)
      .post('/register')
      .send({ 
        name:'Cliente Zé Gaita',
        email:'zegaita@email.com',
      });
      expect(response.status).to.be.equal(400);
      expect(JSON.parse(response.text)).to.deep.equal({message:"Invalid fields"});
  });
  afterEach(Sinon.restore);

});
