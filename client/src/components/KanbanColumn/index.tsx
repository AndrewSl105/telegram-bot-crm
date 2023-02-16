import { Box, Typography } from '@mui/material'
import TaskCart from '../TaskCart'
import { styles } from './styles'
import * as React from 'react'

interface KanbanColumnProps {
  column: {
    name: string
    id: string
    items: Array<{
      title: string
      description: string
      assignee: string
      estimate: number
      id: string
    }>
  }
  setColumns: (value: []) => []
}

const KanbanColumn = (props: KanbanColumnProps): React.ReactElement => {
  const enableDropping = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
  }

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    const id = event.dataTransfer.getData('id')
    props.setColumns((prevColumns) => {

      const dragedColumn = prevColumns.filter(column => {
        return column.items.some(el => {
          return el.id === id
        })
      })

      console.log(props.column.name)

      const dragedTask = dragedColumn[0].items.find(el => el.id === id)


      const newColumns = prevColumns

      const dropdColumn = newColumns.find(el => el.id === props.column.id)

      dropdColumn.items.push(dragedTask)
      dragedColumn[0].items.pop(dragedTask)

      return [...newColumns]
    })

    console.log(`Somebody dropped an element with id: ${id}`)
  }

  return (
        <Box onDragOver={enableDropping} onDrop={handleDrop} sx={styles.main}>
            <Box sx={styles.titleCont}>
                <Typography sx={styles.title}>
                    {props.column.name}
                </Typography>
            </Box>
            <Box sx={styles.list}>
                {props.column?.items.map(item => {
                  return <TaskCart
                        title={item.title}
                        description={item.description}
                        assignee={item.assignee}
                        estimate={item.estimate}
                        id={item.id}
                        key={item.id}
                  />
                })}
            </Box>
        </Box>
  )
}

export default KanbanColumn
