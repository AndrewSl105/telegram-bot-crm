import { Box, Typography } from '@mui/material'
import { styles } from './styles'
import * as React from 'react'
import { type ColumnInterface } from '../../../../interfaces'
import BoardCard from '../Card'
import { Droppable } from 'react-beautiful-dnd'

const Column = (props: ColumnInterface): React.ReactElement => {
  return (
        <Droppable droppableId={props._id}>
            {
                (provided) => {
                  return (
                        <Box
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            sx={styles.main}>
                            <Box sx={styles.titleCont}>
                                <Typography sx={styles.title}>
                                    {props.name}
                                </Typography>
                            </Box>
                            <Box sx={styles.list}>
                                {props.items.map((item, index) => {
                                  return <BoardCard
                                        title={item.title}
                                        description={item.description}
                                        assignee={item.assignee}
                                        estimate={item.estimate}
                                        _id={item._id}
                                        key={item._id}
                                        status={item.status}
                                        index={index}
                                    />
                                })}
                            </Box>
                        </Box>
                  )
                }
            }
        </Droppable>
  )
}

export default Column
