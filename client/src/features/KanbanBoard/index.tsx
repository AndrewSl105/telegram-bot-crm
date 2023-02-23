import React, { useEffect } from 'react'
import { Box } from '@mui/material'
import { useSelector } from 'react-redux'
import { getBoardAction, updateCard } from '../../slices/kanban'
import Column from './components/Column'
import { type BoardInterface } from '../../interfaces'
import { useAppDispatch } from '../../hook'
import { DragDropContext } from 'react-beautiful-dnd'

const styles = {
  display: 'flex',
  justifyContent: 'space-between',
  height: 'calc(100vh - 120px)'
}

const KanbanBoard = (): React.ReactElement => {
  const board = useSelector((state: BoardInterface) => state.kanban.board)
  const dispatch = useAppDispatch()

  useEffect(() => {
    void dispatch(getBoardAction())
  }, [dispatch])

  const onDragEnd = (result): void => {
    const { draggableId } = result
    dispatch(updateCard(draggableId))
  }

  return (
      <DragDropContext onDragEnd={onDragEnd}>
        <Box sx={styles}>
          {
            board !== undefined
              ? (
                  board.columns?.map(column => {
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
      </DragDropContext>
  )
}

export default KanbanBoard
