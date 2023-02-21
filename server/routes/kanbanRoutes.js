import express from 'express'
import { getKanbanData } from "../controllers/kanban.js";
const router = express.Router()

router.route('/').get(getKanbanData)

