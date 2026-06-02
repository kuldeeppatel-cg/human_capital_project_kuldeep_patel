import express from 'express';
import cors from 'cors';
import pricesRoutes from './routes/prices.routes.js';
import countriesRoutes from './routes/countries.routes.js';
import indicatorsRoutes from './routes/indicators.routes.js';
import timeRoutes from './routes/time.routes.js';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Server is running' });
});

// Mount Routes
app.use('/prices', pricesRoutes); // Directly mounts /prices as requested
app.use('/api/prices', pricesRoutes); // Conventionally mounts /api/prices
app.use('/countries', countriesRoutes);
app.use('/api/countries', countriesRoutes);
app.use('/indicators', indicatorsRoutes);
app.use('/api/indicators', indicatorsRoutes);
app.use('/', timeRoutes);
app.use('/api', timeRoutes);



// Catch-all 404 handler
app.use((req, res, next) => {
  res.status(404).json({ message: `Route not found - ${req.originalUrl}` });
});

// Global error handler
app.use((err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack
  });
});

export default app;
