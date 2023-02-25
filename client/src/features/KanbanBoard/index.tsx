import React, { useEffect } from 'react'
import { Box } from '@mui/material'
import { useSelector } from 'react-redux'
import {getBoardAction, updateCardStatus } from '../../slices/kanban'
import Column from './components/Column'
import { type Board } from '../../interfaces'
import { useAppDispatch } from '../../hook'
import { DragDropContext } from 'react-beautiful-dnd'

const styles = {
  display: 'grid',
  gridTemplateColumns: 'repeat(4, 1fr)',
  gridGap: '1rem',
  justifyContent: 'space-between',
  height: 'calc(100vh - 120px)'
}

const KanbanBoard = (): React.ReactElement => {
  const board = useSelector((state: Board) => state.kanban)
  const dispatch = useAppDispatch()

  console.log(board)

  useEffect(() => {
    void dispatch(getBoardAction())
  }, [dispatch])

  const onDragEnd = (result: any): void => {
    const { draggableId } = result
    const destinationColumnId = result.destination.droppableId

    dispatch(updateCardStatus({
      draggableId, destinationColumnId
    }))
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
