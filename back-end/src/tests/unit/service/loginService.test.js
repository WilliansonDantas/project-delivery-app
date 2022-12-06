const { expect } = require('chai')
const { describe } = require('mocha')
const{ Model} = require('sequelize')
const Sinon = require('sinon')
const loginService = require('../../../service/loginService')


describe('Testando Login Service',() => {
  it('Fazendo um Login com usuário válido',async () => {
    const validUserData = {
      id: 2,
      email: 'fulana@deliveryapp.com',
      name: 'Fulana Pereira',
      password: '3c28d2b0881bf46457a853e0b07531c6',
      role: 'seller'
    } 

    Sinon.stub(Model, 'findOne').resolves(validUserData)

    const result = await loginService.getUser("fulana@deliveryapp.com", "3c28d2b0881bf46457a853e0b07531c6")

    expect(result).to.deep.equal(validUserData)

    Sinon.restore()
  })

  it('Deve ser lançado uma exceção ao ser passado um email não cadastrado', async() => {
    const userNotFound = 'User not found'

    Sinon.stub(Model, 'findOne').resolves()

    try {
      await loginService.getUser("naoexiste@deliveryapp.com", "3c28d2b0881bf46457a853e0b07531c6")
    } catch (error) {
      expect(error.message).to.be.equal(userNotFound)
    }

    Sinon.restore()
  })

  it('Deve ser lançado uma exceção ao ser passado um password inválido', async() => {
    const invalidpassword = 'Invalid fields'

    const validUserData = {
      id: 2,
      email: 'fulana@deliveryapp.com',
      name: 'Fulana Pereira',
      password: '3c28d2b0881bf46457a853e0b07531c6',
      role: 'seller'
    } 

    Sinon.stub(Model, 'findOne').resolves(validUserData)

    try {
      await loginService.getUser("fulana@deliveryapp.com", "invalidpassword")
    } catch (error) {
      expect(error.message).to.be.equal(invalidpassword)
    }

    Sinon.restore()
  })
})