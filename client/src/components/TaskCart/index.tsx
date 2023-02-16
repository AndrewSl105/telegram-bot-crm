import * as React from 'react'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import { red } from '@mui/material/colors'
import { styles } from './styles'
import { type TaskCartProps } from '../../interfaces'

const TaskCart = (props: TaskCartProps): React.ReactElement => {
  const { title, description, assignee, estimate, id } = props

  const onDragStart = (event: React.DragEvent<HTMLDivElement>): void => {
    event.dataTransfer.setData('id', id)
  }

  return (
        <Card draggable="true" onDragStart={onDragStart} sx={styles.main}>
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

export default TaskCart
