import mongoose from 'mongoose'
import { Roles, GenderEnum } from './enums'

var userSchema = new mongoose.Schema(
  {
    firstname: String,
    lastname: String,
    email: String,
    password: String,
    role: {
        type: String,
        enum: Object.values(Roles)
    },
    phone: String,
    address: String,
    dateOfBirth: String,
    gender: {
      type: String,
      enum: Object.values(GenderEnum)
    },
    fidelityPoints: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  }
)

export default module = mongoose.model('User', userSchema, "users")
