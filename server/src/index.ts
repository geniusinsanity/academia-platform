import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

import authRoutes from './routes/authRoutes';
import courseRoutes from './routes/courseRoutes';
import { errorHandler } from './middleware/errorHandler';

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Academic Platform API is running');
});

app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
