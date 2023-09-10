import asyncHandler from 'express-async-handler'
import Board from "../models/board.js";
import {generatePassCode, getBoardListItem, getBoardsList, getNewBoardObject, updateCards} from "../utils.js";
import randomcolor from "randomcolor";
import Card from "../models/card.js";
import User from "../models/user.js";

const getKanbanData = asyncHandler(async (req, res) => {
    const { passCode } = req.query

    const board = await Board.findOne({passCode: passCode})
    res.json(board)
})

const getKanbanBoardsList = asyncHandler(async (req, res) => {
    const { userId } = req.query
    const _id = userId.replace(/['"]+/g, '')
    const user = await User.findOne({ _id: _id })
    const passCodesList = user.passCodes

    try {
        const boards = await Board.find({ passCode: { $in: passCodesList }})

        const list = getBoardsList(boards)

        res.json(list)
    } catch (error) {
        console.error(error)
    }
})

const editCard = asyncHandler(async (req, res) => {
    const { newCard, boardId } = req.body
    const query = { _id: boardId }
    const board = await Board.findOne(query)

    const newCards = updateCards(board.cards, newCard)

    await Board.updateMany(query, {cards: newCards})
    res.json(newCard)
})

const addNewBoard = asyncHandler(async (req, res) => {
    const { boardName, userId } = req.body
    const passCode = generatePassCode()
    const colorStyle = randomcolor()

    const newBoard = getNewBoardObject(boardName, passCode, colorStyle, userId)

    try {
        const user = await User.findOne({ _id: userId})
        const newPassCodes = user.passCodes

        await Board.create(newBoard)
        const board = await Board.findOne({ environmentName: boardName })
        newPassCodes.push(board.passCode)

        await User.updateOne({_id: user._id}, {
            passCodes: newPassCodes
        })
        const boardListItem = getBoardListItem(board)

        res.json(boardListItem)
    } catch (error) {
        console.error(error)
    }

})

const deleteBoard = asyncHandler(async (req, res) => {
    const { boardId, userId } = req.body

    const board = await  Board.findById(boardId)

    const user = await User.findById(userId)
    const newPassCodes = user.passCodes
    newPassCodes.pop(board.passCode)

    await User.updateOne({_id: userId}, {passCodes: newPassCodes})

    await Board.findOneAndRemove({_id: boardId})

    res.json(boardId)
})

const addCard = asyncHandler(async (req, res) => {
    const { values } = req.body
    const boardId = values.boardId
    delete values.boardId
    const card = values

    const board = await Board.findOne({ _id: boardId})
    const newCard = await Card.create(card)

    const newCards = board.cards.concat(newCard)
    await Board.updateMany({ _id: boardId}, {cards: newCards})

    res.json({
        newCard,
        boardId: board._id.toString()
    })

})

const editBoard = asyncHandler(async (req, res) => {
    const { boardId, boardName } = req.body
    const board = await Board.findOneAndUpdate({ _id: boardId }, {
        environmentName: boardName
    })

    res.json({
        environmentName: board.environmentName,
        _id: board._id
    })

})

const deleteCard = asyncHandler(async (req, res) => {
    const { cardId,  passCode } = req.body

    const board = await Board.findOne( { passCode: passCode} )
    const cards = board.cards
    const newCards = cards.filter(card => card._id.toString() !== cardId)

    await Board.updateOne({ passCode: passCode }, {
        cards: newCards
    })

    res.json({
        newCards: newCards
    })
})


export { getKanbanData, editCard, getKanbanBoardsList, addNewBoard, deleteBoard, addCard, editBoard, deleteCard}