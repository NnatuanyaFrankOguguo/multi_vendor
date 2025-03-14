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

//Importing routes
import googleRouter from './controller/googleauth.js';
import userRouter from './controller/Usercontroller.js';
import storeRouter from './controller/Storecontroller.js';
import productRouter from './controller/Productcontroller.js';
import eventRouter from './controller/Eventcontroller.js';
import couponRouter from './controller/Couponcontroller.js';


const  port : string | number = process.env.PORT || 5000;
const app = express();

//middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(cors({
    origin: 'http://localhost:5173', //allow connections from this origin
    credentials: true //allow cookies to be sent over http or https
    // allowedHeaders: ['Content-Type', 'Authorization']  //allow these headers to be sent with the request
 
}));

// Sessions
app.use(session({ 
    secret: process.env.SESSION_SECRET as string,
    resave: false, 
    saveUninitialized: false, //dont create a session if something is not stored
    }));

//passport middleware
app.use(passport.initialize());
app.use(passport.session());

//API ENDPOINTS
app.use('/auth', googleRouter)

app.use('/images', express.static('uploads'))

app.use('/api/users', userRouter)

app.use('/api/v2/stores', storeRouter)

app.use('/api/v2/products', productRouter)

app.use('/api/v2/events', eventRouter)

app.use('/api/v2/coupons', couponRouter)


ConnectDB();

//when the server is running
app.get('/', (req : Request, res : Response) => {
    res.send('Welcome to the Backend Server, Happy Coding')
})

//Error handling middleware
app.use(errorMiddleware);
app.use(notFoundMiddleware);


app.listen(port, () => {
    console.log(`Server is listening on port http://localhost:${port}` )
});