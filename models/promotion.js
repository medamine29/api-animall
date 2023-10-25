import mongoose from 'mongoose'

var promotionSchema = new mongoose.Schema(
  {
    title: String,
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  }
)

export default module = mongoose.model('Promotion', promotionSchema, "promotions")