import asyncHandler from 'express-async-handler'
import Board from "../models/board.js";

const getKanbanData = asyncHandler(async (req, res) => {
    const board = await Board.findOne({ environmentName: 'uma' })
    res.json(board)
})

const updateTaskStatus = asyncHandler(async (req, res) => {
    const board = await Board.findOne({ environmentName: 'uma' })
    console.log(req.body, board.columns)

})

export { getKanbanData, updateTaskStatus}