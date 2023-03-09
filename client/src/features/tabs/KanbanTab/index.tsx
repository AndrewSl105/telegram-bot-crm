import React, { useEffect } from 'react'
import { Box, LinearProgress } from '@mui/material'
import { useSelector } from 'react-redux'
import { editCardAction, getBoardAction, onDragAction } from '../../../redux/slices/kanban'
import Column from './components/Column'
import { useAppDispatch } from '../../../hook'
import { DragDropContext } from 'react-beautiful-dnd'
import Index from '../../dialogs/DialogRoot'
import { getDestinationColumn, updateCardStatusOnly } from '../../../utils'
import { styles } from './styles'
import { type Board } from '../../../interfaces/props'
import { type ColumnInterface } from '../../../interfaces/state'

const KanbanTab = (): React.ReactElement => {
  const kanban = useSelector((state: Board) => state.kanban)
  const dispatch = useAppDispatch()

  useEffect(() => {
    void dispatch(getBoardAction())
  }, [dispatch])

  const onDragEnd = (result: any): void => {
    const { draggableId } = result
    const destinationColumnId = result.destination.droppableId
    const sourceColumnId = result.source.droppableId

    if (result.destination === false) return
    if (destinationColumnId === sourceColumnId) return

    const destinationColumn = getDestinationColumn(kanban.board.columns, destinationColumnId)
    const newStatus = destinationColumn?.name
    const card = kanban.board.cards.find(el => el._id === draggableId)

    const newCard = updateCardStatusOnly(newStatus, card)
    const boardId = kanban.board._id

    void dispatch(editCardAction(newCard, boardId))
    void dispatch(onDragAction(result))
  }

  return (
      <Box>
        <DragDropContext onDragEnd={onDragEnd}>
          <Box sx={styles}>
            {
              kanban.loading
                ? (
                      <Box sx={{ width: '100%', position: 'absolute', top: '0px', left: '0' }}>
                        <LinearProgress />
                      </Box>
                  )
                : null
            }
            {
              kanban.board !== undefined && !kanban.loading
                ? (
                    kanban.board.columns?.map((column: ColumnInterface) => {
                      return <Column
                            key={column._id}
                            name={column.name}
                            _id={column._id}
                            items={column.items} />
                    })
                  )
                : null
            }
          </Box>
          <Index />
        </DragDropContext>
      </Box>
  )
}

export default KanbanTab