import React, { useEffect } from 'react'
import { Box, LinearProgress } from '@mui/material'
import { useSelector } from 'react-redux'
import { editCardAction, getBoardAction, onDragAction } from '../../slices/kanban'
import Column from './components/Column'
import { type Board, type ColumnInterface } from '../../interfaces'
import { useAppDispatch } from '../../hook'
import { DragDropContext } from 'react-beautiful-dnd'
import DialogRoot from '../../DialogRoot'
import { getDestinationColumn, updateCardStatusOnly } from '../../utils'
import { styles } from './styles'

const KanbanBoard = (): React.ReactElement => {
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

    void dispatch(editCardAction(newCard))
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
          <DialogRoot />
        </DragDropContext>
      </Box>
  )
}

export default KanbanBoard
