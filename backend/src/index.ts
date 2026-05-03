import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import galleryRouter from './routes/gallery.js';
import crewRouter from './routes/crew.js';
import weaponsRouter from './routes/weapons.js';
import statsRouter from './routes/stats.js';
import enlistRouter from './routes/enlist.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/gallery', galleryRouter);
app.use('/api/crew', crewRouter);
app.use('/api/weapons', weaponsRouter);
app.use('/api/stats', statsRouter);
app.use('/api/enlist', enlistRouter);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Chaos Control Backend running on port ${PORT}`);
  console.log(`📊 API: http://localhost:${PORT}/api/health`);
});
