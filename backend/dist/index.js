//main server file ENTRY POINT FOR THE BACKEND APPLICATION
//mongodb+srv://nnatuanyafrank:<db_password>@cluster0.bgh02.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
import express from 'express';
import cors from 'cors';
import { errorMiddleware, notFoundMiddleware } from './middleware/error.js';
import { ConnectDB } from './config/db.js';
const port = process.env.PORT || 5000;
const app = express();
//middleware
app.use(express.json());
app.use(cors());
ConnectDB();
app.get('/', (req, res) => {
    res.send('Welcome to the Backend Server, Happy Coding');
});
//Error handling middleware
app.use(notFoundMiddleware);
app.use(errorMiddleware);
app.listen(port, () => {
    console.log(`Server is listening on port http://localhost:${port}`);
});
