//Here is my server.js file
import express from 'express';
import cors from 'cors';
import ideaRoutes from './routes/ideaRoutes.js';

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/ideas', ideaRoutes);


// Base route for health check
app.get('/', (req, res) => {
  res.send('IdeaBoard API is running...');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
