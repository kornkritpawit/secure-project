const mongoose = require('mongoose'),
  uniqueValidator = require('mongoose-unique-validator')

const schema = new mongoose.Schema(
  {
    Name: { type: String },
    description: { type: String },
    price: { type: Number },
    available: { type: Number }

    // author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
)

// Apply the uniqueValidator plugin to userSchema.
schema.plugin(uniqueValidator, { status: 400 })

// Custom JSON Response
schema.methods.toJSON = function () {
  return {
    id: this._id,
    Name: this.title,
    description: this.description,
    // author: this.author,
    price: this.price,
    available: this.available,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt,
  }
}

// Custom field before save
schema.pre('save', function (next) {
  next()
})

module.exports = mongoose.model('Product', schema)
