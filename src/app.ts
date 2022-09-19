import express, {Application, Request, Response} from 'express';
import cors from 'cors';
import { MongoDB } from './database';
import { IDb } from './interfaces';
import cluster from 'cluster';
import { cpus } from 'os';
import { router } from './routes';

import { authenticateMiddleware, checkJoinedClassMiddleware } from './middleware';
import GetAssignment from './controllers/_class/assignment/GetAssignment';

require('dotenv').config();

const startApp = () => {
    const app: Application = express();
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }))
    app.use(cors());
    
    app.get('/', (req: Request, res: Response) => res.send('Everything is working fine'));

    app.get("/assignment/:map_id", GetAssignment.getAssignmentPdf);
    app.use("/api/v1", router);
    
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

