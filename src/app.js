import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import userRoutes from './routes/userRoutes.js';
import transactionRoutes from './routes/transactionRoutes.js';
import dashboardRoutes from './routes/dashboardRoutes.js';
import swaggerUi from 'swagger-ui-express';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Minimal Swagger Document
const swaggerDocument = {
  openapi: '3.0.0',
  info: { title: 'Finance Backend API', version: '1.0.0' },
  servers: [{ url: 'http://localhost:5000' }],
  components: {
    securitySchemes: { bearerAuth: { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' } }
  },
  security: [{ bearerAuth: [] }],
  paths: {
    '/api/users/login': { post: { tags: ['Auth'], summary: 'Login' } },
    '/api/users': { post: { tags: ['Auth'], summary: 'Register' }, get: { tags: ['Users'], summary: 'List Users' } },
    '/api/transactions': { post: { tags: ['Transactions'], summary: 'Create' }, get: { tags: ['Transactions'], summary: 'List' } },
    '/api/dashboard/summary': { get: { tags: ['Dashboard'], summary: 'Summary' } }
  }
};

app.get('/', (req, res) => {
  res.send('API is running...');
});

app.use('/api/users', userRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(notFound);
app.use(errorHandler);

export default app;
