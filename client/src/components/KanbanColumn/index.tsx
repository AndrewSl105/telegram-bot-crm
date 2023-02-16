import { Box, Typography } from '@mui/material'
import TaskCart from '../TaskCart'
import { styles } from './styles'
import * as React from 'react'
import {
  type ColumnInterface,
  type KanbanColumnInterface,
  type TaskCartInterface
} from '../../interfaces'
import { findDropColumn } from '../../utils'

const KanbanColumn = (props: KanbanColumnInterface): React.ReactElement => {
  const enableDropping = (event: React.DragEvent<HTMLDivElement>): any => {
    event.preventDefault()
  }

  const handleDrop = (event: React.DragEvent<HTMLDivElement>): any => {
    const id = event.dataTransfer.getData('id')
    props.setColumns((prevColumns: any) => {
      const dragedColumn = prevColumns.filter((column: ColumnInterface) => {
        return column.items.some((el: TaskCartInterface) => {
          return el.id === id
        })
      })

      const dragTask = dragedColumn[0].items.find((el: TaskCartInterface) => el.id === id)

      const newColumns = prevColumns

      const dropColumn = findDropColumn(newColumns, props.column.id)

      dropColumn?.items.push(dragTask)
      dragedColumn[0].items.pop(dragTask)

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
