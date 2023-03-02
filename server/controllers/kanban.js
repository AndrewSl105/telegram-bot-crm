import asyncHandler from 'express-async-handler'
import Board from "../models/board.js";

const getKanbanData = asyncHandler(async (req, res) => {
    const board = await Board.findOne({ environmentName: 'uma' })
    res.json(board)
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

export { getKanbanData, editCard}