// layer handle req dan res
// error handling
// handle validasi body

const express = require('express')
const router = express.Router()

const prisma = require('../db')
const { getAllProducts, getProductById, createProduct, deleteDataById, editDataById } = require('./product.services')


router.get('/', async (req, res) => {
   const products = await getAllProducts();

   res.send(products)
})

router.get('/:id', async (req, res) => {

   

   try {
      const productId = parseInt(req.params.id)
      const product = await getProductById(productId)

      if (typeof productId != 'number') {
         throw Error('ID is not a number')
      }

      if (!product) {
         throw Error('product not found')
      }
      
      res.send({
         data: product,
         message: `Succsess`
      })
   } catch (err) {
      res.status(400).send(err.message)
   }


})

router.post('/', async (req, res) => {
   try {
      const newProductdata = req.body
      const product = await createProduct(newProductdata)

      res.status(200).send({
         data: product,
         message: 'Create Data Succsessfully'
      })
   } catch (err) {
      res.status(400).send(err.message)
   }

})

router.put('/:id', async (req, res) => {
   try {
      const productId = parseInt(req.params.id)
      const productData = req.body

      // Validation
      if (!(productData.name && productData.description && productData.price && productData.image)) {
         throw Error('Some Fields are Missing')
      }

      const product = await editDataById(productId, productData)

      return res.status(200).send({
         data: product,
         message: 'Data Edit Succsessfully!'
      })
   } catch (err) {
      res.status(400).send(err.message)

   }
})

router.patch('/:id', async (req, res) => {
   try {
      const productId = req.params.id
      const productData = req.body

      const product = await editDataById(productId, productData)

      return res.status(200).send({
         data: product,
         message: 'Data Edit Succsessfully!'
      })
   } catch (err) {
      res.status(400).send(err.message)
   }

})

router.delete('/:id', async (req, res) => {
   try {
      const productId = req.params.id
      await deleteDataById(parseInt(productId))
      
      res.status(200).send('Product Deleted!')
   } catch (err) {
      return res.status(400).send('product not found!')
      
   }
})



module.exports = router

