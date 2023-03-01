import asyncHandler from 'express-async-handler'
import Board from "../models/board.js";

const getKanbanData = asyncHandler(async (req, res) => {
    const board = await Board.findOne({ environmentName: 'uma' })
    res.json(board)
})

const updateTaskStatus = asyncHandler(async (req, res) => {
    const { draggableId, destinationColumnId } = req.body
    const query = { environmentName: 'uma' }
    const board = await Board.findOne(query)
    const destinationColumn = board.columns.find((el) => el._id.toString() === destinationColumnId)
    const newCards = board.cards.map((el) => {
        if (el._id.toString() === draggableId) {
            el.status = destinationColumn.name
        }
        return el
    })

    await Board.updateMany(query, {cards: newCards})
})

export { getKanbanData, updateTaskStatus}