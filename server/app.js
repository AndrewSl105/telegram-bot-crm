import express from 'express'
import dotenv from 'dotenv'
import connectDB from "./config/db.js";
import {editCard, getKanbanData, getKanbanBoardsList, addNewBoard, deleteBoard, addCard} from "./controllers/kanban.js";
import cors from "cors";
import {registerUser, logIn} from "./controllers/user.js";

dotenv.config()

connectDB()

const app = express();

const PORT = 5000;
app.use(cors())

app.use(express.json())

const kanbanRoutes = express.Router()
const userRoutes = express.Router()

kanbanRoutes.route('/').get(getKanbanData).post(editCard)
kanbanRoutes.route('/getList').get(getKanbanBoardsList)
kanbanRoutes.route('/addBoard').post(addNewBoard)
kanbanRoutes.route('/deleteBoard').delete(deleteBoard)
kanbanRoutes.route('/addCard').post(addCard)

app.use('/api/kanban', kanbanRoutes)

userRoutes.route('/sign-up').post(registerUser)
userRoutes.route('/log-in').post(logIn)

app.use('/api/user', userRoutes)

app.listen(
    process.env.DEFAULT_PORT || PORT,
    console.log("server is running")
)

