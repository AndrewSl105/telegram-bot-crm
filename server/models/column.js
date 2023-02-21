import mongoose from 'mongoose'
import Card from "./card.js";

const ColumnSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        items: [Card.schema]
    },
    {
        timestamps: true,
    }
)

const Column = mongoose.model('Column', ColumnSchema)

export default Column
