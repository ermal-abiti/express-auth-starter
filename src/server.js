import express from 'express';
import cors from 'cors';
import { connectToMongo } from './database/mongo.js';
import dotenv from 'dotenv';
dotenv.config();
import authRoutes from './routes/authRoutes.js';

const app = express();

// Use Middlewares
app.use(express.json());
app.use(cors());

// Connect to mongodb
connectToMongo();


app.get('/api', (req, res) => {
    res.json({
        message: 'Express with JWT Auth API 1.0',
        env: process.env.ENVIRONMENT,
    });
});

app.use('/api/auth', authRoutes);

app.listen(5050, ()=> {
    console.log(`server started running at http://localhost:5050`);
})
