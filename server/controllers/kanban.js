import asyncHandler from 'express-async-handler'
import Board from "../models/board.js";

const getKanbanData = asyncHandler(async (req, res) => {
    const board = await Board.findOne({ environmentName: 'uma' })
    res.json(board)
})

const updateTaskStatus = asyncHandler(async (req, res) => {
    const { draggableId, destinationColumnId } = req.body
    const board = await Board.findOne({ environmentName: 'uma' })
    const destinationColumn = board.columns.find((el) => el._id.toString() === destinationColumnId)
    console.log(destinationColumn.name)

    board.cards.map((el) => {
        if (el._id.toString() === draggableId) {
            el.status = destinationColumn.name
        }
        return el
    })

    console.log(board.cards)

    res.status(200)

})

export { getKanbanData, updateTaskStatus}