import { type ReactJSXElement } from '@emotion/react/types/jsx-namespace'
import { useEffect } from 'react'
import { useAppDispatch } from '../../../hook'
import { getMyTeamAction } from '../../../redux/slices/user'
import { useSelector } from 'react-redux'
import { getCurrentBoardPassCode, getTeamList } from '../../../utils/selectorUtils'
import TeamTable from './components/TeamTable'

const MyTeamTab = (): ReactJSXElement => {
  const dispatch = useAppDispatch()
  const passCode = useSelector(getCurrentBoardPassCode())
  const teamList = useSelector(getTeamList())

  useEffect(() => {
    void dispatch(getMyTeamAction(passCode))
  }, [passCode])

  return (
        <div>
            <TeamTable teamList={teamList} />
        </div>
  )
}

export default MyTeamTab
