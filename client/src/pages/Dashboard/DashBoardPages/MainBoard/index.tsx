import React, { useEffect } from 'react'
import { Box } from '@mui/material'
import KanbanColumn from '../../../../components/KanbanColumn'
import { useDispatch, useSelector } from 'react-redux'
import { getKanban, type KanbanDataState } from '../../../../slices/kanbanTask'

const styles = {
  display: 'flex',
  justifyContent: 'space-between',
  height: 'calc(100vh - 120px)'
}

const MainBoard = (): React.ReactElement => {
  const columns = useSelector((state: KanbanDataState) => state.kanban.data)
  const dispatch = useDispatch()

  console.log(columns)

  useEffect(() => {
    dispatch(getKanban())
  }, [dispatch])

  return (
      <Box sx={styles}>
          {columns?.map(item => {
            return <KanbanColumn key={item.name} column={item} />
          })}
      </Box>
  )
}

export default MainBoard
