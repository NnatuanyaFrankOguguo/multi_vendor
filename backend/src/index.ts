//main server file ENTRY POINT FOR THE BACKEND APPLICATION
//mongodb+srv://nnatuanyafrank:<db_password>@cluster0.bgh02.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
import express, { Request, Response, NextFunction } from 'express'
import cors from 'cors'
import { errorMiddleware, notFoundMiddleware } from './middleware/error.js';
import { ConnectDB } from './config/db.js';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';



const port : string | number = process.env.PORT || 5000;
const app = express();

//middleware
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(cors());


ConnectDB();

//when the server is running
app.get('/', (req : Request, res : Response) => {
    res.send('Welcome to the Backend Server, Happy Coding')
})

//Error handling middleware
app.use(notFoundMiddleware);
app.use(errorMiddleware);

app.listen(port, () => {
    console.log(`Server is listening on port http://localhost:${port}` )
});