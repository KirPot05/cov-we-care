import express from "express";
import indexRouter from "./routes/index.js";
import adminRouter from "./routes/admin.js";
import userRouter from "./routes/user.js";
import {config} from 'dotenv'

// Express Stuff
const app = express();
// For Fetching Environment Variables
config();

const port = process.env.PORT;


// MiddleWares
app.use(express.json());
app.use(express.urlencoded({extended: true}));


// Routes
app.use('/', indexRouter);
app.use('/admin', adminRouter);
app.use('/user', userRouter);



// Listening
app.listen(port, () => {
    console.log("App Listening at http://localhost:5000");
});
