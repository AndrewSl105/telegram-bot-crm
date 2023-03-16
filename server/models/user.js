import mongoose from 'mongoose'

const userSchema = mongoose.Schema(
    {
        userName: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        passCodes: [String],
        role: {
            type: String,
            required: true,
        }
    }
)

const User = mongoose.model('User', userSchema)

export default User
