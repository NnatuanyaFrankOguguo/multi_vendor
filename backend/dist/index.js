//main server file ENTRY POINT FOR THE BACKEND APPLICATION
//mongodb+srv://nnatuanyafrank:<db_password>@cluster0.bgh02.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
import express from 'express';
import cors from 'cors';
import { errorMiddleware, notFoundMiddleware } from './middleware/error.js';
import { ConnectDB } from './config/db.js';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import passport from './config/passport.js';
//Importing routes
import googleRouter from './controller/googleauth.js';
import userRouter from './controller/Usercontroller.js';
const port = process.env.PORT || 5000;
const app = express();
//middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(cors());
// Sessions
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false, //dont create a session if something is not stored
}));
//passport middleware
app.use(passport.initialize());
app.use(passport.session());
//API ENDPOINTS
app.use('/auth', googleRouter);
app.use('/images', express.static('uploads'));
app.use('/api/users', userRouter);
ConnectDB();
//when the server is running
app.get('/', (req, res) => {
    res.send('Welcome to the Backend Server, Happy Coding');
});
//Error handling middleware
app.use(errorMiddleware);
app.use(notFoundMiddleware);
app.listen(port, () => {
    console.log(`Server is listening on port http://localhost:${port}`);
});
