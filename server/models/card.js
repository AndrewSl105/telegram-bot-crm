import mongoose from 'mongoose'

const CardSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        estimate: {
            type: Number,
        },
        status: {
            type: String,
        },
        user: {
            type: String,
        }
    },
    {
        timestamps: true,
    }
)

const Card = mongoose.model('Card', CardSchema)

export default Card
