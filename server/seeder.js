import dotenv from 'dotenv'
import connectDB from "./config/db.js";
import Board from "./models/board.js";
import { boards } from "./data.js";

dotenv.config()

connectDB()

const importData = async () => {
    try {
        await Board.deleteMany()
        await Board.insertMany(boards)

        process.exit()
    } catch (error) {
        console.error(`${error}`)
        process.exit(1)
    }
}

const destroyData = async () => {
    try {
        await Board.deleteMany()

        console.log('Data Destroyed!')
        process.exit()
    } catch (error) {
        console.error(`${error}`)
        process.exit(1)
    }
}

if (process.argv[2] === '-d') {
    destroyData()
} else {
    importData()
}
