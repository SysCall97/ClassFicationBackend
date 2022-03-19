import express, {Application, Request, Response} from 'express';
import cors from 'cors';
import userRoute from './routes/userRoute';
// import db from './database/mongo'

require('dotenv').config();

// db.initializeDb();

const app: Application = express();
app.use(express.json());
app.use(cors());

app.get('/', (req: Request, res: Response) => res.send('Everything is working fine'))
app.use('/user', userRoute);

const port = process.env.PORT || 5000

app.listen(port, () => console.log("Server is running"));