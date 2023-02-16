import React, { useState } from 'react'
import { Box } from '@mui/material'
import KanbanColumn from '../../../../components/KanbanColumn'
import { columnsData } from '../data'

const styles = {
  display: 'flex',
  justifyContent: 'space-between',
  height: 'calc(100vh - 120px)'
}

const MainBoard = (): React.ReactElement => {
  const [columns, setColumns] = useState(columnsData)

  return (
      <Box sx={styles}>
          {columns.map(item => {
            return <KanbanColumn setColumns={setColumns} key={item.name} column={item} />
          })}
      </Box>
  )
}

export default MainBoard
