import express, {Application, Request, Response} from 'express';
import cors from 'cors';
import userRoute from './routes/userRoute';
import classRoute from './routes/classRoute';
import { authenticateMiddleware } from './middleware';
import authRoute from './routes/authRoute';
import { MongoDB } from './database';
import { IDb } from './interfaces';
import seedRoute from './routes/seedRoute';
import cluster from 'cluster';
import { cpus } from 'os';

require('dotenv').config();

const startApp = () => {
    const app: Application = express();
    app.use(express.json());
    app.use(cors());
    
    app.get('/', (req: Request, res: Response) => res.send('Everything is working fine'));
    app.use('/seed', seedRoute)
    app.use('/user', userRoute);
    app.use('/auth', authRoute);
    app.use('/class', authenticateMiddleware, classRoute);
    
    const port = process.env.PORT || 5000;
    
    app.listen(port, () => console.log(`[server]: Server is running at http://localhost:${port}`));
}


if(cluster.isPrimary) {
    console.log(`Primary ${process.pid} is running`);
    const numCPUs = cpus().length;

    for (let i = 0; i < numCPUs; i++) {
        cluster.fork()
    }

    cluster.on("exit", (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} died`)
    })
} else {
    const db: IDb = new MongoDB();
    db.connect(startApp);
    console.log(`Worker ${process.pid} started`);
}

