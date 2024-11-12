//main server file ENTRY POINT FOR THE BACKEND APPLICATION
//mongodb+srv://nnatuanyafrank:<db_password>@cluster0.bgh02.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
import express, { Request, Response, NextFunction } from 'express'
import cors from 'cors'
import { errorMiddleware, notFoundMiddleware } from './middleware/error.js';
import { ConnectDB } from './config/db.js';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import session from 'express-session';
import passport from './config/passport.js';
import googleRouter from './controller/googleauth.js';


const port : string | number = process.env.PORT || 5000;
const app = express();

//middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(cors());

// Sessions
app.use(session({ 
    secret: process.env.SESSION_SECRET as string,
    resave: false, 
    saveUninitialized: false, //dont create a session if something is not stored
    }));

//passport middleware
app.use(passport.initialize());
app.use(passport.session());

//
app.use('/auth', googleRouter )


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