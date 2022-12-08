const chai = require('chai');
const Sinon = require('sinon');
const {User} = require('../../../database/models');
const chaiHttp = require('chai-http');
const sinonChai = require('sinon-chai');
const { describe } = require('mocha')
const LoginService = require('../../../service/loginService');
const { expect } = chai;

const app = require('../../../api/app');
chai.use(sinonChai);
chai.use(chaiHttp);

describe('Testes camada Controller rota Login', () => {
  it('Request de login com sucesso', async () => {
    const validUserData = {
      id:3,
      name:'Cliente Zé Birita',
      email:'zebirita@email.com',
      password:'1c37466c159755ce1fa181bd247cb925',
      role:'customer',
    };
    Sinon.stub(LoginService, 'getUser').resolves(validUserData);
    const response = await chai
      .request(app)
      .post('/login')
      .send({ 
        email: 'zebirita@email.com',
        password: '$#zebirita#$'
      });
    expect(response.status).to.be.equal(200);
    expect(JSON.parse(response.text)).to.haveOwnProperty('name');
    expect(JSON.parse(response.text)).to.haveOwnProperty('role');
    expect(JSON.parse(response.text)).to.haveOwnProperty('email');
    expect(JSON.parse(response.text)).to.haveOwnProperty('token');
  });
  it('Request de login com email invalido', async () => {
    
    Sinon.stub(User, 'findOne').resolves()
    const response = await chai
      .request(app)
      .post('/login')
      .send({ 
        email: 'zebirita@email.com',
        password: '$#zebrita#$'
      });
    expect(response.status).to.be.equal(404);
    expect(JSON.parse(response.text)).to.be.deep.equal({"message":"User not found"});
  });
  it('Request de login com password invalido', async () => {
    
    const validUserData = {
      id:3,
      name:'Cliente Zé Birita',
      email:'zebirita@email.com',
      password:'1c37466c159755ce1fa181bd247cb925',
      role:'customer',
    };
    Sinon.stub(User, 'findOne').resolves(validUserData);

    const response = await chai
      .request(app)
      .post('/login')
      .send({ 
        email: 'zebirita@email.com',
        password: '$#zebta#$'
      });
    expect(response.status).to.be.equal(404);
    expect(JSON.parse(response.text)).to.be.deep.equal({"message": "Invalid fields"});
  });
  it('Request de login com body imcompleto', async () => {
  
    const response = await chai
      .request(app)
      .post('/login')
      .send({ 
        email: 'zebirita@email.com',
      });
    expect(response.status).to.be.equal(400);
    expect(JSON.parse(response.text)).to.be.deep.equal({"message": "Invalid fields"});
  })
  afterEach(Sinon.restore);

})