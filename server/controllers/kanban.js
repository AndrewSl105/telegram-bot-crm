import asyncHandler from 'express-async-handler'
import Board from "../models/board.js";
import {generatePassCode} from "../utils.js";
import randomcolor from "randomcolor";
import Card from "../models/card.js";

const getKanbanData = asyncHandler(async (req, res) => {
    const { passCode } = req.query
    const board = await Board.findOne({passCode: passCode})
    res.json(board)
})

const getKanbanBoardsList = asyncHandler(async (req, res) => {
    const boards = await Board.find()
    const list = boards.map(el => {
        return (
            {
                environmentName: el.environmentName,
                passCode: el.passCode,
                style: el.style,
                _id: el._id
            }
        )
    })
    res.json(list)

})

const editCard = asyncHandler(async (req, res) => {
    const { newCard } = req.body
    const query = { environmentName: 'uma' }
    const board = await Board.findOne(query)

    const newCards = board.cards.map((el) => {
        if (el._id.toString() === newCard._id) {
            el = newCard
        }
        return el
    })

    await Board.updateMany(query, {cards: newCards})
    res.json(newCard)
})

const addNewBoard = asyncHandler(async (req, res) => {
    const { boardName } = req.body
    const passCode = generatePassCode()
    const colorStyle = randomcolor()

    const newBoard = {
        environmentName: boardName,
        passCode: passCode,
        style: {
            image: '',
            color: colorStyle
        },
        columns: [
            {
                name: 'new',
                items: []
            },
            {
                name: 'in progress',
                items: []
            },
            {
                name: 'resolved',
                items: []
            },
            {
                name: 'closed',
                items: []
            }
        ],
        cards: []
    }

    try {
        await Board.create(newBoard)
        const board = await Board.findOne({ environmentName: boardName })
        const boardListItem = {
            _id: board._id.toString(),
            environmentName: board?.environmentName,
            passCode: board?.passCode,
            style: board.style
        }
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