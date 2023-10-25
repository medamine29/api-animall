import mongoose from 'mongoose'

var topicSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    userId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User'
    },
    comments: [
        {
            userId: {
                type: mongoose.SchemaTypes.ObjectId,
                ref: 'User'
            },
            date: {
                type: Date,
                default: Date.now
            },
            message: String
        }
    ],
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  }
)

export default module = mongoose.model('Topic', topicSchema, "topics")
