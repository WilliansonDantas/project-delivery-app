const { expect } = require('chai')
const { describe } = require('mocha')
const{ Model} = require('sequelize')
const Sinon = require('sinon')
const productService = require('../../../service/requestProductsServices')
const { allProducts } = require('../mocks/allProducts')

describe('Testando Products Service', () => {
  it('Trazendo todos os produtos', async() => {
    Sinon.stub(Model, 'findAll').resolves(allProducts)

    const result = await productService.getProducts()

    expect(result).to.deep.equal(allProducts)
    
    Sinon.restore()
  })
})
