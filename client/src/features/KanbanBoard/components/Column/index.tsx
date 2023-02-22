import { Box, Typography } from '@mui/material'
import { styles } from './styles'
import * as React from 'react'
import { type ColumnInterface } from '../../../../interfaces'
import BoardCard from '../Card'
import { useDispatch } from 'react-redux'
import { updateCardStatus } from '../../../../slices/kanban'

const Column = (props: ColumnInterface): React.ReactElement => {
  const dispatch = useDispatch()
  const enableDropping = (event: React.DragEvent<HTMLDivElement>): any => {
    event.preventDefault()
  }

  const handleDrop = (event: React.DragEvent<HTMLDivElement>): any => {
    const id = event.dataTransfer.getData('id')
    // dispatch(updateCardStatus(id, props.name))
    console.log(`Somebody dropped an element with id: ${id}`)
  }

  return (
        <Box onDragOver={enableDropping} onDrop={handleDrop} sx={styles.main}>
            <Box sx={styles.titleCont}>
                <Typography sx={styles.title}>
                    {props.name}
                </Typography>
            </Box>
            <Box sx={styles.list}>
                {props.items.map(item => {
                  return <BoardCard
                        title={item.title}
                        description={item.description}
                        assignee={item.assignee}
                        estimate={item.estimate}
                        _id={item._id}
                        key={item._id}
                        dropColumnId={props._id}
                    />
                })}
            </Box>
        </Box>
  )
}

export default Column
