import {
  Box,
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select
} from '@mui/material'
import RegularInput from '../../../../../patterns/RegularInput'
import * as React from 'react'
import { type ReactJSXElement } from '@emotion/react/types/jsx-namespace'
import { type BoardListItem, type newCardState } from '../../../../../interfaces'

interface AddCardFormProps {
  cardState: newCardState
  boardsList: BoardListItem[]
  boardId: string
  setCardState: any
  setBoardId: any
}

const AddCardForm = (props: AddCardFormProps): ReactJSXElement => {
  const { cardState, boardsList, setCardState, setBoardId, boardId } = props

  const onChangeHandler = (e) => {
    setCardState({
      ...cardState,
      [e.target.name]: e.target.value
    })
  }

  const addBoardIdHandler = (e) => {
    const {
      target: { value }
    } = e
    setBoardId(value)
  }

  return (
        <Box display='flex' flexDirection='row'>
            <Box marginRight="8px" flexDirection="column" display="flex" flex="1">
                <RegularInput
                    action={onChangeHandler}
                    label="Card Name"
                    name='title'
                    autoFocus
                    value={cardState.title}
                    multiline={false}
                    rows={0}
                />
                <RegularInput
                    action={onChangeHandler}
                    label="Card description"
                    name='description'
                    autoFocus
                    value={cardState.description}
                    multiline
                    rows={4}
                />
                <FormControl margin="dense" sx={{ width: '100%' }}>
                    <InputLabel id="demo-multiple-checkbox-label">Board</InputLabel>
                    <Select
                        onChange={addBoardIdHandler}
                        value={boardId}
                        fullWidth
                        labelId="demo-multiple-checkbox-label"
                        input={<OutlinedInput sx={{
                          '.MuiButtonBase-root': {
                            display: 'none'
                          }
                        }
                        } label="Board" />}
                    >
                        {boardsList.map((el) => (
                            <MenuItem key={el._id} value={el._id}>
                                <Checkbox checked={boardId.includes(el._id)} />
                                <ListItemText primary={el.environmentName} />
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>
            <Box marginLeft="8px" flexDirection="column" display="flex" flex="1">
                <RegularInput
                    action={onChangeHandler}
                    label="Phone Number"
                    name='phoneNumber'
                    value={cardState.phoneNumber}
                    multiline={false}
                    autoFocus={false}
                    rows={0}
                />
                <RegularInput
                    action={onChangeHandler}
                    autoFocus={false}
                    label="Telegram Username"
                    name='userName'
                    value={cardState.userName}
                    multiline={false}
                    rows={0}
                />
                <RegularInput
                    action={onChangeHandler}
                    autoFocus={false}
                    label="Till"
                    name='till'
                    value={cardState.till}
                    multiline={false}
                    rows={0}
                />
                <RegularInput
                    action={onChangeHandler}
                    autoFocus={false}
                    label="Estimate"
                    name='estimate'
                    value={cardState.estimate}
                    multiline={false}
                    rows={0}
                />
            </Box>
        </Box>
  )
}

export default AddCardForm
