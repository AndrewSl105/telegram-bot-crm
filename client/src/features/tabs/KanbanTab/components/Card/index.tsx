import * as React from 'react'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import { Draggable } from 'react-beautiful-dnd'
import { styles } from './styles'
// import { useDispatch } from 'react-redux'
// import { show } from '../../../../../redux/slices/dialog'
// import { EDIT_CARD_DIALOG } from '../../../../../constants'
import bot from '../../../../../media/images/bot.png'
import { getAvatar } from '../../../../../utils'
import { type CardInterface } from '../../../../../interfaces/state'
import CardMenu from '../CardMenu'
import { IconButton, InputAdornment, TextField } from '@mui/material'
import FileCopyRoundedIcon from '@mui/icons-material/FileCopyRounded'
import { showNotification } from '../../../../../redux/slices/notistack'
import { ERROR, SUCCESS } from '../../../../../constants'
import { useAppDispatch } from '../../../../../hook'
import PermPhoneMsgRoundedIcon from '@mui/icons-material/PermPhoneMsgRounded'

export const EDIT = true

const BoardCard = (props: CardInterface): React.ReactElement => {
  const {
    title,
    description,
    assignee,
    // estimate,
    _id,
    index,
    createdBy,
    user,
    // eslint-disable-next-line @typescript-eslint/naming-convention
    phone_number,
    till
  } = props

  const dispatch = useAppDispatch()

  // const dispatch = useDispatch()

  // const showTaskModal = (e: any): void => {
  //   dispatch(show({
  //     type: EDIT_CARD_DIALOG,
  //     props: {
  //       _id,
  //       EDIT
  //     }
  //   }))
  // }

  const copyPassCodeHandler = async (): Promise<void> => {
    try {
      await navigator.clipboard.writeText(phone_number)
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      dispatch(showNotification({ text: 'Phone number copy to clipboard!', variant: SUCCESS }))
    } catch (err: unknown) {
      console.error('Failed to copy: ', err)
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      dispatch(showNotification({ text: `Failed to copy: ${err}`, variant: ERROR }))
    }
  }

  const avatarSrc = getAvatar(createdBy, bot)
  console.log(props)

  return (
      <Draggable key={_id} draggableId={_id} index={index}>
          {
              (provided) => {
                return (
                      <Card
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          sx={styles.main}>
                          <CardHeader
                              avatar={
                                  <Avatar sx={{ bgcolor: 'gray' }} src={avatarSrc} aria-label="recipe">
                                      R
                                  </Avatar>
                              }
                              title={assignee}
                              subheader={`till: ${till}`}
                          />
                          <CardContent>
                              <Typography sx={styles.title} variant="h5" >
                                  {title}
                              </Typography>
                              <Typography sx={styles.description} variant="body2" color="text.secondary2">
                                  {description}
                              </Typography>
                              <Typography sx={{ ...styles.description, borderTop: '1px dashed rgba(145, 158, 171, 0.24)' }} variant="body2" color="text.secondary2">
                                <TextField
                                    margin="dense"
                                    value={phone_number}
                                    fullWidth
                                    id="outlined-basic"
                                    label="Phone Number"
                                    variant="outlined"
                                    size='small'
                                    disabled={true}
                                    InputProps={{
                                      startAdornment: (
                                          <InputAdornment position="start">
                                            <PermPhoneMsgRoundedIcon sx={{
                                              width: '18px'
                                            }} />
                                          </InputAdornment>
                                      ),
                                      endAdornment:
                                          <IconButton sx={{ p: '5px' }} onClick={copyPassCodeHandler}>
                                            <FileCopyRoundedIcon sx={{
                                              width: '18px'
                                            }} />
                                          </IconButton>
                                    }}
                                />
                              </Typography>
                          </CardContent>
                          <CardMenu _id={_id} user={user} />
                      </Card>
                )
              }
          }
      </Draggable>
  )
}

export default BoardCard
