import * as React from 'react'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import { Draggable } from 'react-beautiful-dnd'
import { styles } from './styles'
import bot from '../../../../../media/images/bot.png'
import { getAvatar } from '../../../../../utils'
import { type CardInterface } from '../../../../../interfaces/state'
import CardMenu from '../CardMenu'
import { IconButton, InputAdornment, Link, TextField } from '@mui/material'
import FileCopyRoundedIcon from '@mui/icons-material/FileCopyRounded'
import { showNotification } from '../../../../../redux/slices/notistack'
import { ERROR, SUCCESS } from '../../../../../constants'
import { useAppDispatch } from '../../../../../hook'
import PermPhoneMsgRoundedIcon from '@mui/icons-material/PermPhoneMsgRounded'
import Box from '@mui/material/Box'
import RateReviewRoundedIcon from '@mui/icons-material/RateReviewRounded'
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
    phoneNumber,
    till
  } = props

  const dispatch = useAppDispatch()

  const copyPassCodeHandler = async (): Promise<void> => {
    try {
      await navigator.clipboard.writeText(phoneNumber)
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      dispatch(showNotification({ text: 'Phone number copy to clipboard!', variant: SUCCESS }))
    } catch (err: unknown) {
      console.error('Failed to copy: ', err)
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      dispatch(showNotification({ text: `Failed to copy: ${err}`, variant: ERROR }))
    }
  }

  const avatarSrc = getAvatar(createdBy, bot)

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
                              <Typography
                                  sx={{ ...styles.description, borderTop: '1px dashed rgba(145, 158, 171, 0.24)' }}
                                  variant="body2"
                                  color="text.secondary2"
                              >
                                <TextField
                                    margin="dense"
                                    value={phoneNumber}
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
                            <Box alignItems="center" display="flex" justifyContent="center">
                              <Link
                                  sx={{
                                    textDecoration: 'none',
                                    display: 'flex',
                                    alignItems: 'center'
                                  }}
                                  href={`tg://resolve?domain=${user}`}>
                                <Typography sx={{ mr: '4px' }}>
                                  Write user in Telegram
                                </Typography>
                                <RateReviewRoundedIcon color="primary" />
                              </Link>
                            </Box>
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
