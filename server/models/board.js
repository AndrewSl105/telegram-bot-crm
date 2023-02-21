import mongoose from 'mongoose'
import Column from "./column.js";

const BoardSchema = mongoose.Schema(
    {
        environmentName: {
           type: String,
           required: true,
        },
        columns: [Column.schema]
    },
    {
        timestamps: true,
    }
)

const Board = mongoose.model('Board', BoardSchema)

export default Board
