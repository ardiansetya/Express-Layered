// untuk handle bisnis logic
// dipisah agar function reuseable dan tanggung jawab terpisah

const prisma = require('../db')

const { findProduct, findProductById, insertData, updateData, deleteData, findProductByName } = require('./product.repository')


const getAllProducts = async () => {
   const products = findProduct()
   return products;
}

const getProductById = async (productId) => {


   const product = await findProductById(productId)
   return product
}

const createProduct = async (newProductData) => {


 
      const productName = await findProductByName(newProductData.name)
      if (productName) {
         throw new Error('Product name is already exist!')
      }

      const createProduct = await insertData(newProductData)

      return createProduct
   




}

const editDataById = async (productId, productData) => {

   const product = await updateData(productId, productData)

   return product
}

const deleteDataById = async (id) => {

   // cek id apakah ada atau tidak
   await findProductById(id)

   await deleteData(id)
}


module.exports = {
   getAllProducts,
   getProductById,
   createProduct, editDataById,
   deleteDataById
}