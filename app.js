import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import taksRoutes from './routes/taskRoutes.js';

dotenv.config();

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use('/task', taksRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});