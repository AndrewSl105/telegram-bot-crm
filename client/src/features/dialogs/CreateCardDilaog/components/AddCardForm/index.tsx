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
import { type AddCardFormProps } from '../../../../../interfaces/props'

const AddCardForm = (props: AddCardFormProps): ReactJSXElement => {
  const { boardsList, getFieldProps, boardId, errors } = props

  return (
        <Box display='flex' flexDirection='row'>
            <Box marginRight="8px" flexDirection="column" display="flex" flex="1">
                <RegularInput
                    {...getFieldProps('title')}
                    label="Card Name"
                    name='title'
                    error={errors.title}
                    helperText={errors.title}
                    autoFocus
                />
                <RegularInput
                    {...getFieldProps('description')}
                    label="Card description"
                    name='description'
                    error={errors.description}
                    helperText={errors.description}
                    multiline
                    rows={4}
                />
                <FormControl margin="dense" sx={{ width: '100%' }}>
                    <InputLabel id="demo-multiple-checkbox-label">Board</InputLabel>
                    <Select
                        {...getFieldProps('boardId')}
                        fullWidth
                        error={errors.boardId}
                        helperText={errors.boardId}
                        labelId="demo-multiple-checkbox-label"
                        input={<OutlinedInput sx={{
                          '.MuiButtonBase-root': {
                            display: 'none'
                          },
                          height: '56px'
                        }
                        } label="Board" />}
                    >
                        {boardsList.map((el) => (
                            <MenuItem key={el._id} value={el._id}>
                                <Checkbox checked={boardId === el._id} />
                                <ListItemText primary={el.environmentName} />
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>
            <Box marginLeft="8px" flexDirection="column" display="flex" flex="1">
                <RegularInput
                    {...getFieldProps('phoneNumber')}
                    label="Phone Number"
                    name='phoneNumber'
                    error={errors.phoneNumber}
                    helperText={errors.phoneNumber}
                />
                <RegularInput
                    {...getFieldProps('userName')}
                    label="Telegram Username"
                    name='userName'
                />
                <RegularInput
                    label="Till"
                    {...getFieldProps('till')}
                    name='till'
                />
                <RegularInput
                    type="number"
                    label="Estimate"
                    {...getFieldProps('estimate')}
                    name='estimate'
                />
            </Box>
        </Box>
  )
}

export default AddCardForm
