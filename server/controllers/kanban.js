import asyncHandler from 'express-async-handler'
import Board from "../models/board.js";

const getKanbanData = asyncHandler(async (req, res) => {
    const kanban = await Board.findOne({ environmentName: 'uma' })
    res.json(kanban)
})

const updateTaskStatus = asyncHandler(async (req, res) => {

})

export { getKanbanData, updateTaskStatus}