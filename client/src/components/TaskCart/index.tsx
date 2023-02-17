import * as React from 'react'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import { red } from '@mui/material/colors'
import { styles } from './styles'
import { type TaskCartInterface } from '../../interfaces'
import { useDispatch } from 'react-redux'
import { show } from '../../slices/dialog'
import { TASK_DIALOG } from '../../constants'
import DialogRoot from '../../DialogRoot'

const TaskCart = (props: TaskCartInterface): React.ReactElement => {
  const { title, description, assignee, estimate, id } = props

  const dispatch = useDispatch()

  const onDragStart = (event: React.DragEvent<HTMLDivElement>): void => {
    event.dataTransfer.setData('id', id)
  }

  const showTaskModal = (): void => {
    dispatch(show(TASK_DIALOG))
  }

  console.log(DialogRoot)

  return (
        <Card onClick={showTaskModal} draggable="true" onDragStart={onDragStart} sx={styles.main}>
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
                <DialogRoot />
            </CardContent>
        </Card>
  )
}

export default TaskCart
