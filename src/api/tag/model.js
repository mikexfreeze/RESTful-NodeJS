import mongoose, { Schema } from 'mongoose'

const tagSchema = new Schema({
  creator: {
    type: Schema.ObjectId,
    ref: 'User',
    required: true
  },
  label: {
    type: String
  },
  url: {
    type: String
  }
}, {
  timestamps: true
})

tagSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      creator: this.creator.view(full),
      label: this.label,
      url: this.url,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Tag', tagSchema)

export const schema = model.schema
export default model
