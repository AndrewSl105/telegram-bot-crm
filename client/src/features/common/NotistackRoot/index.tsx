import { useSnackbar, type VariantType } from 'notistack'
import { type ReactElement, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { hideNotification } from '../../../redux/slices/notistack'

interface NotistackState {
  notistack: {
    show: boolean
    text: string
    variant: VariantType
  }
}
const Index = (): ReactElement => {
  const { enqueueSnackbar } = useSnackbar()
  const notistack = useSelector((state: NotistackState) => state.notistack)
  const dispatch = useDispatch()

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

export default Index
