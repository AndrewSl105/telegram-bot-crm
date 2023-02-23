import * as React from 'react'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import { Draggable } from 'react-beautiful-dnd'
import { red } from '@mui/material/colors'
import { styles } from './styles'
import { useDispatch } from 'react-redux'
import { show } from '../../../../slices/dialog'
import { TASK_DIALOG } from '../../../../constants'
import { type CardInterface } from '../../../../interfaces'

const BoardCard = (props: CardInterface): React.ReactElement => {
  const { title, description, assignee, estimate, _id, index } = props

  const dispatch = useDispatch()

  const showTaskModal = (): void => {
    dispatch(show(TASK_DIALOG))
  }

  return (
      <Draggable key={_id} draggableId={_id} index={index}>
          {
              (provided) => {
                return (
                      <Card
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps} onClick={showTaskModal} sx={styles.main}>
                          <CardHeader
                              avatar={
                                  <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                                      R
                                  </Avatar>
                              }
                              title={assignee}
                              subheader={estimate}
                          />
                          <CardContent>
                              <Typography sx={styles.title} variant="h5" >
                                  {title}
                              </Typography>
                              <Typography sx={styles.description} variant="body2" color="text.secondary2">
                                  {description}
                              </Typography>
                          </CardContent>
                      </Card>
                )
              }
          }
      </Draggable>
  )
}

export default BoardCard
