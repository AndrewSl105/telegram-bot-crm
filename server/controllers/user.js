import User from "../models/user.js";
import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import Board from "../models/board.js";
import bcrypt from "bcryptjs";

const registerUser = asyncHandler(async (req, res) => {
    const { userName, email, password, passCodes } = req.body

    const userExists = await User.findOne({ email })

    if (userExists) {
        res.status(400)
        throw new Error('User already exists')
    }

    const salt = await bcrypt.genSalt(10)
    const bcryptPassword = await bcrypt.hash(password, salt)

    const user = await User.create({
        userName,
        email,
        password: bcryptPassword,
        passCodes,
        role: 'user'
    })

    if (user) {
        res.status(201).json({
                token: generateToken(user._id),
                _id: user._id
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }
})

const logIn = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    const user = await User.findOne({ email })

    if (user && (bcrypt.compare(user.password, password))) {
        res.json({
                token: generateToken(user._id),
                _id: user._id
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

    if (board && !user.passCodes.includes(passCode)) {
        const newUserPassCodes = user.passCodes
        newUserPassCodes.push(passCode)

        await User.updateOne({_id: newId}, {
            passCodes: newUserPassCodes
        })

        console.log(newUserPassCodes)

    } else {
        res.status(401)
        throw new Error('Board doesn\'t exists!')
    }
})

const getProfile = asyncHandler(async (req, res) => {
    const { _id } = req.query

    const user = await User.findById(_id)

    res.json({
        userProfile: {
            userName: user.userName,
            passCodes: user.passCodes,
            role: user.role
        }})

    console.log(user)
})

const getMyTeam = asyncHandler(async (req, res) => {
    const { _id } = req.query


})


export { registerUser, logIn, addPassCode, getProfile, getMyTeam }