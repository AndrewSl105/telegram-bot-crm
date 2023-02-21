import React, { useEffect } from 'react'
import { Box } from '@mui/material'
import { useSelector } from 'react-redux'
import { getBoardAction } from '../../slices/kanban'
import Column from './components/Column'
import { type BoardInterface } from '../../interfaces'
import { useAppDispatch } from '../../hook'

const styles = {
  display: 'flex',
  justifyContent: 'space-between',
  height: 'calc(100vh - 120px)'
}

const KanbanBoard = (): React.ReactElement => {
  const board = useSelector((state: BoardInterface) => state.kanban.board)
  const dispatch = useAppDispatch()

  console.log(board)

  useEffect(() => {
    void dispatch(getBoardAction())
  }, [dispatch])

  return (
        <Box sx={styles}>
          {
            board !== undefined
              ? (
                  board.columns?.map(column => {
                    return <Column key={column.id} name={column.name} id={column.id} items={column.items} />
                  })
                )
              : null
          }
      </Box>
  )
}

export default KanbanBoard
