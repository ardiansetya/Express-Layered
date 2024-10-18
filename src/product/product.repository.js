// berkomunikasi dengan database
// orm / raw query
// agar kalkau mau ganti orm tinggal ganti disini aja gais

const prisma = require('../db')

const findProduct = async () => {
  const product = await prisma.products.findMany()

  return product
}

const findProductById = async (id) => {
   const product = await prisma.products.findUnique({
      where:{
         id,
      }
   })

   return product
}

const findProductByName = async (name) => {
   const product = await prisma.products.findFirst({
      where: {
         name,
      }
   })
   return product

}



const insertData = async (newProductData) => {
   const product = await prisma.products.create({
      data: {
         name: newProductData.name,
         price: newProductData.price,
         description: newProductData.description,
         image: newProductData.image
      }
   })
   
   return product
}




const updateData = async (id, productData) => {
   const product = await prisma.products.update({
      where: {
         id,
      },
      data: {
         name: productData.name,
         price: productData.price,
         description: productData.description,
         image: productData.image
      }
   })

   return product

}

const deleteData = async (id) => {
   await prisma.products.delete({
      where: {
         id,
      }
   })
}



module.exports =  {
   findProduct,
   findProductById,
   findProductByName,
   insertData,
   updateData,
   deleteData
}   