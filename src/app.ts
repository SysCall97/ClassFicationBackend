import express, {Application} from 'express';
import cors from 'cors';
import userRoute from './routes/userRoute';

require('dotenv').config();

const db = require('./database/mongo')

const app: Application = express();
app.use(express.json());
app.use(cors());

app.use('/user', userRoute);

const port = process.env.port || 5000

app.listen(port, () => console.log("Server is running"));