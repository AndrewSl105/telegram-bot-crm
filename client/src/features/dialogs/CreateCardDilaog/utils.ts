import { type newCardState } from '../../../interfaces'
import { NEW } from '../../../constants'

export const getInitialState = () => {
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
