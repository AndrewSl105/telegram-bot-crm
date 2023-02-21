import { Box, Typography } from '@mui/material'
import { styles } from './styles'
import * as React from 'react'
import { type ColumnInterface } from '../../../../interfaces'
import BoardCard from '../Card'

const Column = (props: ColumnInterface): React.ReactElement => {
  const enableDropping = (event: React.DragEvent<HTMLDivElement>): any => {
    event.preventDefault()
  }

  const handleDrop = (event: React.DragEvent<HTMLDivElement>): any => {
    const id = event.dataTransfer.getData('id')
    console.log(`Somebody dropped an element with id: ${id}`)
  }

  console.log(props.items)

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
                        id={item.id}
                        key={item.id}
                    />
                })}
            </Box>
        </Box>
  )
}

export default Column
