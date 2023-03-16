import User from "../models/user.js";
import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import Board from "../models/board.js";
import board from "../models/board.js";

const registerUser = asyncHandler(async (req, res) => {
    console.log(req.body)

    const { userName, email, password, passCodes, role } = req.body.userData


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
            userData: {
                _id: user._id,
                userName: user.userName,
                email: user.email,
                passCodes: user.passCodes,
                role: user.role,
            },
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }
})

const logIn = asyncHandler(async (req, res) => {
    const { email, password } = req.body.userData

    const user = await User.findOne({ email })

    if (user && (user.password === password)) {
        res.json({
            userData: {
                _id: user._id,
                userName: user.userName,
                email: user.email,
                passCodes: user.passCodes,
                role: user.role,
            },
            token: generateToken(user._id)
        })
    } else {
        res.status(401)
        throw new Error('Invalid email or password')
    }
})

const addPassCode = asyncHandler(async (req, res) => {
    const { passCode, _id } = req.body
    const newId = _id.replace(/['"]+/g, '')

    const user = await User.findOne({ _id:  newId})
    const board = await Board.findOne({ passCode: passCode })

    if (board) {
        const newUserPassCodes = user.passCodes
        newUserPassCodes.push(passCode)

        await User.updateOne({_id: newId}, {
            passCodes: newUserPassCodes
        })

    } else {
        res.status(401)
        throw new Error('Board doesn\'t exists!')
    }
})


export { registerUser, logIn, addPassCode }