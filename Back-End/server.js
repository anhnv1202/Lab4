import express from "express"
import * as dotenv from 'dotenv'
import { productRouter,categoryRouter} from './routes/index.js'
import connectDB from "./database/database.js"
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import cors from 'cors'
dotenv.config()
const app = express()

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use(express.static(__dirname));
app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

app.get('/', (req, res)=>{
    res.send("Welcome to Home RESTful API")
})

app.use('/products', productRouter)
app.use('/categories', categoryRouter)
const port = process.env.PORT || 8080

app.listen(port, ()=>{
    connectDB()
    console.log(`Server is running on port ${port}`);
})