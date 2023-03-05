import asyncHandler from 'express-async-handler'
import Board from "../models/board.js";

const getKanbanData = asyncHandler(async (req, res) => {
    const { passCode } = req.query
    const board = await Board.findOne({passCode: passCode})
    res.json(board)
})

const getKanbanBoardsList = asyncHandler(async (req, res) => {
    const { passCodes } = req.query
    const boards = await Board.find()
    const selectedBoards = boards.filter(el => passCodes.includes(el.passCode))
    const list = selectedBoards.map(el => {
        return (
            {
                environmentName: el.environmentName,
                passCode: el.passCode
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

export { getKanbanData, editCard, getKanbanBoardsList}