import { NEW } from '../../../constants'
import { type newCardState } from '../../../interfaces/state'

export const getInitialState = (): any => {
  return (
    {
      title: '',
      description: '',
      estimate: 0,
      phoneNumber: '',
      userName: '',
      till: '',
      createdBy: '',
      assignee: '',
      status: ''
    }
  )
}

export const getNewCardObject = (cardState: any): newCardState => {
  return (
    {
      title: cardState.title,
      description: cardState.description,
      estimate: cardState.estimate,
      assignee: 'Me',
      status: NEW,
      userName: cardState.userName,
      phoneNumber: cardState.phoneNumber,
      till: cardState.till,
      createdBy: 'Admin'
    }
  )
}
