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

    console.log(passCodesList)
    const boards = await Board.find({ passCode: { $all: passCodesList }})
    console.log(boards)
    const list = getBoardsList(boards)
    res.json(list)
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
    const { boardName } = req.body
    const passCode = generatePassCode()
    const colorStyle = randomcolor()

    const newBoard = getNewBoardObject(boardName, passCode, colorStyle)

    try {
        await Board.create(newBoard)
        const board = await Board.findOne({ environmentName: boardName })
        const boardListItem = getBoardListItem(board)

        res.json(boardListItem)
    } catch (error) {
        console.error(error)
    }

})

const deleteBoard = asyncHandler(async (req, res) => {
    const { boardId } = req.body

    await Board.findOneAndRemove({_id: boardId})

    res.json(boardId)
})

const addCard = asyncHandler(async (req, res) => {
    const {card,  boardId } = req.body
    const board = await Board.findOne({ _id: boardId})
    const newCard = await Card.create(card)
    const newCards = board.cards.concat(newCard)
    await Board.updateMany({ _id: boardId}, {cards: newCards})

    res.json({
        newCard,
        boardId: board._id.toString()
    })

})


export { getKanbanData, editCard, getKanbanBoardsList, addNewBoard, deleteBoard, addCard}