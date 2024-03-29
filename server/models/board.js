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
        style: {
            image: String,
            color: String
        },
        passCode: {
            type: String,
            required: true,
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
    },
    {
        timestamps: true,
    }
)

const Board = mongoose.model('Board', BoardSchema)

export default Board
