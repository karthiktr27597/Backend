import express from "express";
import { studentRouter } from "./Day3/Routes/router.js";
import cros from 'cros';
import dotenv from "dotenv";

dotenv.config

const PORT = process.env.PORT

// initiating server
const app = express();

//sample test
app.get("/", (req, res) => {
    res.send("working good")
})

// middle wares

app.use(express.json());
app.use(cros())

// application middlewares

app.use('/student/', studentRouter)


// listen a server
app.listen(PORT, () => console.log(`Server started in localhost:${PORT}`))
