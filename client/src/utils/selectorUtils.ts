import { type Board } from '../interfaces/props'

export const getCurrentBoardPassCode = () => (state: Board) => state.kanban.passCode
export const getTeamList = () => (state: any) => state.user.teamList
export const getCurrentBoardName = () => (state: Board) => state.kanban.board.environmentName
