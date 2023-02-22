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
        },
        phoneNumber: {
            type: String,
        },
        till: {
            type: String,
        },
    }
)

const Card = mongoose.model('Card', CardSchema)

export default Card
