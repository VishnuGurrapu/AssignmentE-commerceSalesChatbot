import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    index: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    index: true
  },
  price: {
    type: Number,
    required: true,
    index: true
  },
  stock: {
    type: Number,
    required: true,
    default: 0
  },
  image: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

// Text index for search functionality
productSchema.index({
  name: 'text',
  description: 'text',
  category: 'text'
});

export const Product = mongoose.model('Product', productSchema);