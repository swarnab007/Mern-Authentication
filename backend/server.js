import express from 'express';
import dotenv from 'dotenv';
import connectDB from './lib/db.js';
import authRoutes from './routes/authRoute.js';
import cookieParser from 'cookie-parser';

const app = express();
dotenv.config('./.env');

connectDB();

app.get('/', (req, res) => {
    res.send('Server is ready');
});

app.use(express.json()); // to parse the body of the request
app.use(cookieParser());    // to parse the cookies

app.use('/api/auth', authRoutes);

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});