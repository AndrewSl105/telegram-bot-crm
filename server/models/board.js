import mongoose from 'mongoose'
import Column from "./column.js";
import Card from "./card.js";

const BoardSchema = mongoose.Schema(
    {
        environmentName: {
           type: String,
           required: true,
        },
        columns: [Column.schema],
        cards: [Card.schema],
        passCode: {
            type: String,
            required: true,
        }
    },
    {
        timestamps: true,
    }
)

const Board = mongoose.model('Board', BoardSchema)

export default Board
