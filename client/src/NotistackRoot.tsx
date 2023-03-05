import { useSnackbar } from 'notistack'
import { type ReactElement, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { hideNotification } from './slices/notistack'

interface NotistackState {
  notistack: {
    show: boolean
    text: string
    variant: string
  }
}
const NotistackRoot = (): ReactElement => {
  const { enqueueSnackbar } = useSnackbar()
  const notistack = useSelector((state: NotistackState) => state.notistack)
  const dispatch = useDispatch()

  console.log(notistack)

  useEffect(() => {
    if (notistack.show) {
      enqueueSnackbar(notistack.text, {
        variant: notistack.variant
      })
      dispatch(hideNotification())
    }
  }, [notistack.show])

  return (
        <>
        </>
  )
}

export default NotistackRoot
