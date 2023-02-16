
import productModel from "../models/productModel.js"
import fs from 'fs'
import slugify from "slugify";



// creating products
export const createProductController = async (req, res) => {
    try {
        const {
          name,
          description,
          price,
          category,
          quantity,
          shipping
        } = req.fields;
        const {photo} = req.files

        // validation
        switch (true) {
          case !name:
            return res.status(500).send({ error: "Name is Required" });
          case !description:
            return res.status(500).send({ error: "Description is Required" });
          case !price:
            return res.status(500).send({ error: "Price is Required" });
          case !category:
            return res.status(500).send({ error: "Category is Required" });
          case !quantity:
            return res.status(500).send({ error: "Quantity is Required" });
          case photo && photo.size > 1000000:
            return res
              .status(500)
              .send({ error: "photo is Required and should be less then 1mb" });
        }
           const products = new productModel({
             ...req.fields,
             slug: slugify(name),
           });
           if (photo) {
             products.photo.data = fs.readFileSync(photo.path);
             products.photo.contentType = photo.type;
           }
           await products.save();
           res.status(201).send({
             success: true,
             message: "Product Created Successfully",
             products,
           });
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            error,
            message:'Error while creating Products.'
        })
    }
}


// get products
export const getProductController = async (req, res) => {
    try {
        const products = await productModel.find({}).populate('category').select("-photo").limit(12).sort({createdAt:-1})
        res.status(200).send({
          success:true,
          totalProducts: products.length,
          message: 'All Products',
          products
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
          success: false,
          message:'Error while getting Products.',
          error
        })
    }
}

// get Single products
export const getSingleProductController = async (req, res) => {
  try {
    const product = await productModel.findOne({
      slug: req.params.slug
    }).select("-photo").populate('category')
    res.status(200).send({
      success: true,
      message: "Single Products fetched",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getting single Products.",
      error,
    });
  }
};

//get photo controller
export const productPhotoController = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.pid).select("photo")
    if(product.photo.data){
      res.set('Content-type', product.photo.contentType)
      return res.status(200).send(product.photo.data)
    }
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success: false,
      message: 'Error while fetching photo',
      error
    })
  }
}

// Product Delete
export const deleteProductController = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.params.pid).select("-photo")
    res.status(200).send({
      success: true,
      message:'Product Deleted Successfully.'
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success: false,
      message:'Error while deleting Products',
      error
    })
  }
}

// Update Product Controller
export const updateProductController = async (req, res) => {
  try {
    const { name, description, price, category, quantity, shipping } =
      req.fields;
    const { photo } = req.files;

    // validation
    switch (true) {
      case !name:
        return res.status(500).send({ error: "Name is Required" });
      case !description:
        return res.status(500).send({ error: "Description is Required" });
      case !price:
        return res.status(500).send({ error: "Price is Required" });
      case !category:
        return res.status(500).send({ error: "Category is Required" });
      case !quantity:
        return res.status(500).send({ error: "Quantity is Required" });
      case photo && photo.size > 1000000:
        return res
          .status(500)
          .send({ error: "photo is Required and should be less then 1mb" });
    }
    const products = await productModel.findByIdAndUpdate(req.params.pid,
      {...req.fields, slug:slugify(name)},
      {new: true}
      )
    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
    }
    await products.save();
    res.status(201).send({
      success: true,
      message: "Product Updated Successfully",
      products,
    }); 
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success: false,
      message:'Error while updating products',
      error
    })
  }
}