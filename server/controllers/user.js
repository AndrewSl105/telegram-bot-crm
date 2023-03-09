import User from "../models/user.js";
import asyncHandler from "express-async-handler";

const registerUser = asyncHandler(async (req, res) => {
    const { userName, email, password, passCodes, role } = req.body

    console.log(req.body)

    const userExists = await User.findOne({ email })

    if (userExists) {
        res.status(400)
        throw new Error('User already exists')
    }

    const user = await User.create({
        userName,
        email,
        password,
        passCodes,
        role
    })

    if (user) {
        res.status(201).json({
            _id: user._id,
            userName: user.userName,
            email: user.email,
            passCodes: user.passCodes,
            role: user.role
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }
})

const logIn = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    const user = await User.findOne({ email })

    console.log(user)

    if (user && (user.password === password)) {
        res.json({
            _id: user._id,
            userName: user.userName,
            email: user.email,
            passCodes: user.passCodes,
            role: user.role
        })
    } else {
        res.status(401)
        throw new Error('Invalid email or password')
    }
})


export { registerUser, logIn }