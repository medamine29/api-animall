import mongoose from 'mongoose'

var productSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    price: String,
    category: String,
    imageUrl: String,
    fidelityPoints: Number,
    stock: {
      type: Boolean,
      default: true
    },
    isBestSale: {
      type: Boolean,
      default: false
    },
    isNew: {
      type: Boolean,
      default: false
    },
    category: String,
    subCategory: String
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  }
)

export default module = mongoose.model('Product', productSchema, "products")
