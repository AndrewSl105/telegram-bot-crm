import mongoose from 'mongoose'

const ColumnSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        items: []
    }
)

const Column = mongoose.model('Column', ColumnSchema)

export default Column
