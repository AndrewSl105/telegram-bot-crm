import express from 'express'
import dotenv from 'dotenv'
import connectDB from "./config/db.js";
import {
    editCard, getKanbanData, getKanbanBoardsList,
    addNewBoard, deleteBoard, addCard, editBoard, deleteCard
} from "./controllers/kanban.js";
import cors from "cors";
import {registerUser, logIn, addPassCode, getProfile, getMyTeam} from "./controllers/user.js";
import {protect} from "./middleware/authMiddleware.js";
import * as path from "path";

dotenv.config()

connectDB()

const app = express();

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
kanbanRoutes.route('/edit-board').put(editBoard)
kanbanRoutes.route('/delete-card').delete(deleteCard)


app.use('/api/kanban', kanbanRoutes)

userRoutes.route('/sign-up').post(registerUser)
userRoutes.route('/log-in').post(logIn)
userRoutes.route('/add-passcode').post(protect, addPassCode)
userRoutes.route('/profile').get(protect, getProfile)
userRoutes.route('/my-team').delete(protect, getMyTeam)

app.use('/api/user', userRoutes)

const __dirname = path.resolve()

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/client/build')))

    app.get('*', (req, res) =>
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    )
} else {
    app.get('/', (req, res) => {
        res.send('API is running....')
    })
}

app.listen(process.env.PORT || 5000, function() {
    console.log('Server listening on port 5000');
});

