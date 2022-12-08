const { expect } = require('chai')
const { describe } = require('mocha')
const{ Model} = require('sequelize')
const Sinon = require('sinon')
const registerService = require('../../../service/registerService')

describe('Testando Register Service',() => {
  it('Cadastando um usuário com sucesso', async () => {
    const createdValidUser = {
      id: 4,
      name: 'novousuariovalido',
      email: 'naotemessemail@deliveryapp.com',
      password: '3c28d2b0881bf46457a853e0b07531c6',
      role: 'customer'
    }

    Sinon.stub(Model, 'findOne').resolves()

    Sinon.stub(Model, 'create').resolves(createdValidUser)

    const result = await registerService.registerUser('novousuariovalido',
    'meuemailnovo@deliveryapp.com','fulana@123' )

    expect(result).to.deep.equal(createdValidUser)

    Sinon.restore()
  })

  it('Lançando uma exceção ao passar um usuário com email já existente', async () => {
    Sinon.stub(Model, 'findOne').resolves({email: 'emailexistenteo@deliveryapp.com' })

    Sinon.stub(Model, 'create').resolves()

    try {
      await registerService.registerUser('novousuariovalido',
      'emailexistenteo@deliveryapp.com','fulana@123')
    } catch (error) {
      expect(error.message).to.be.equal('Conflict')
    }
    Sinon.restore()
  })

  it('Lançando uma exceção ao passar um usuário com nome já existente', async () => {
    Sinon.stub(Model, 'findOne').resolves({name: 'novousuariovalido' })

    Sinon.stub(Model, 'create').resolves()

    try {
      await registerService.registerUser('novousuariovalido',
      'emailexistenteo@deliveryapp.com','fulana@123')
    } catch (error) {
      expect(error.message).to.be.equal('Conflict')
    }
    Sinon.restore()
  })
})