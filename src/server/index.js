import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import productsRouter from './routes/products.js';
import sessionsRouter from './routes/sessions.js';
import { generateMockProducts } from './utils/mockData.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/products', productsRouter);
app.use('/api/sessions', sessionsRouter);

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ecommerce-chatbot')
  .then(async () => {
    console.log('Connected to MongoDB');
    
    // Generate mock products if the database is empty
    const productCount = await mongoose.models.Product.countDocuments();
    if (productCount === 0) {
      await generateMockProducts();
    }
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});