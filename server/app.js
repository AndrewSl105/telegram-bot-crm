import express from 'express'
import dotenv from 'dotenv'
import connectDB from "./config/db.js";
import {editCard, getKanbanData, getKanbanBoardsList, addNewBoard, deleteBoard, addCard} from "./controllers/kanban.js";
import cors from "cors";
import {registerUser, logIn, addPassCode, getProfile, getMyTeam} from "./controllers/user.js";
import {protect} from "./middleware/authMiddleware.js";
import * as path from "path";

dotenv.config()

connectDB()

const app = express();

const PORT = 5000;
var port_number = server.listen(process.env.DEFAULT_PORT || PORT);

app.use(cors())

app.use(express.json())

const kanbanRoutes = express.Router()
const userRoutes = express.Router()

kanbanRoutes.use(protect)

kanbanRoutes.route('/').get(getKanbanData).post(editCard)
kanbanRoutes.route('/getList').get(getKanbanBoardsList)
kanbanRoutes.route('/add-board').post(addNewBoard)
kanbanRoutes.route('/delete-board').delete(deleteBoard)
kanbanRoutes.route('/add-card').post(addCard)

app.use('/api/kanban', kanbanRoutes)

userRoutes.route('/sign-up').post(registerUser)
userRoutes.route('/log-in').post(logIn)
userRoutes.route('/add-passcode').post(protect, addPassCode)
userRoutes.route('/profile').get(protect, getProfile)
userRoutes.route('/my-team').get(protect, getMyTeam)

app.use('/api/user', userRoutes)


const __dirname = path.resolve()

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/client/build')))

    console.log(path.resolve(__dirname, 'client', 'build', 'index.html'))

    app.get('*', (req, res) =>
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    )
} else {
    app.get('/', (req, res) => {
        res.send('API is running....')
    })
}

app.listen(
    port_number,
    console.log("server is running")
)

