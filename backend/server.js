import express, { urlencoded } from 'express';
import dotenv from 'dotenv'
dotenv.config();
const port = process.env.port || PORT;
import userRoutes from './routes/userRoutes.js';
import connectDB from './config/db.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import cookieParser from 'cookie-parser';

connectDB();

const app = express();
// body parser middlerware
app.use(express.json()); // ro parse raw json
app.use(express.urlencoded({ extended: true })); // it will allow us to send form data

//cookie parser
app.use(cookieParser());

app.use('/api/users', userRoutes)

app.get('/', (req,res) => 
    res.send('server is ready'));

// error handlers
app.use(notFound);
app.use(errorHandler);

app.listen(port , () => {
    console.log(`server started on ${port}`)
});
