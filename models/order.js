import mongoose from 'mongoose'
import { OrderStatusEnum } from './enums'

var orderSchema = new mongoose.Schema(
  {
    userId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User'
    },
    orderPricing: {
        finalAmount: Number,
        reductionAmount: Number,
        baseAmount: Number
    },
    products: [
        {
            productId: {
                type: mongoose.SchemaTypes.ObjectId,
                ref: 'Product'
            },
            quantity: {
              type: Number,
              default: 1
            },
            price: Number
        }
    ],
    deliveryAddress: String,
    status: {
        type: String,
        enum: Object.values(OrderStatusEnum),
        default: OrderStatusEnum.CREATED
    },
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  }
)

export default module = mongoose.model('Order', orderSchema, "orders")
