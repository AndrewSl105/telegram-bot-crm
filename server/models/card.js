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
        userName: String,
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
            type: String,
            required: true
        }
    }
)

const Card = mongoose.model('Card', CardSchema)

export default Card
