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
        user: String,
        assignee: {
            type: String,
        },
        phoneNumber: {
            type: String,
        },
        till: {
            type: String,
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
    }
)

const Card = mongoose.model('Card', CardSchema)

export default Card
