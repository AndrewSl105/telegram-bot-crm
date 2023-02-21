import express from 'express'
import dotenv from 'dotenv'
import connectDB from "./config/db.js";
import {getKanbanData, updateTaskStatus} from "./controllers/kanban.js";
import cors from "cors";

dotenv.config()

connectDB()

const app = express();

const PORT = 5000;
app.use(cors())

app.use(express.json())

const router = express.Router()

router.route('/').get(getKanbanData).post(updateTaskStatus)

app.use('/api/kanban', router)


app.listen(
    PORT,
    console.log("server is running")
)

