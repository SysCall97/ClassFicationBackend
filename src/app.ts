import express, {Application, Request, Response} from 'express';
import cors from 'cors';
import userRoute from './routes/userRoute';
import classRoute from './routes/classRoute';
import { authenticateMiddleware } from './middleware';
import authRoute from './routes/authRoute';
import { MongoDB } from './database';

require('dotenv').config();

const startApp = () => {
    const app: Application = express();
    app.use(express.json());
    app.use(cors());
    
    app.get('/', (req: Request, res: Response) => res.send('Everything is working fine'));
    app.use('/user', userRoute);
    app.use('/auth', authRoute);
    app.use('/class', authenticateMiddleware, classRoute);
    
    const port = process.env.PORT || 5000;
    
    app.listen(port, () => console.log("Server is running"));
}

const db = new MongoDB();
db.connect(startApp);
