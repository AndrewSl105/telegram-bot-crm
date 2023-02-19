import { Box, Typography } from '@mui/material'
import TaskCart from '../TaskCart'
import { styles } from './styles'
import * as React from 'react'
import {
  type KanbanColumnInterface
} from '../../interfaces'
import { useDispatch } from 'react-redux'
import { updateKanban } from '../../slices/kanbanTask'

const KanbanColumn = (props: KanbanColumnInterface): React.ReactElement => {
  const enableDropping = (event: React.DragEvent<HTMLDivElement>): any => {
    event.preventDefault()
  }

  const dispatch = useDispatch()

  const handleDrop = (event: React.DragEvent<HTMLDivElement>): any => {
    const id = event.dataTransfer.getData('id')
    console.log(props.column.id, props.column.name)
    dispatch(updateKanban({
      id,
      columnId: props.column.id
    }))
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
