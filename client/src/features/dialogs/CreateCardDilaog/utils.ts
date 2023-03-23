import { NEW } from '../../../constants'
import { getUserId } from '../../../utils'

export const getInitialState = (): any => {
  const _Id = getUserId()

  return (
    {
      title: '',
      description: '',
      estimate: 0,
      phoneNumber: '',
      userName: '',
      till: '',
      assignee: '',
      status: NEW,
      boardId: '',
      createdBy: _Id
    }
  )
}
