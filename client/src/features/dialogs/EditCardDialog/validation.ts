import * as Yup from 'yup'
import { REQUIRED, TITLE_SIZE } from '../../../constants/validation'

export const editCardSchema = Yup.object().shape({
  title: Yup.string().required(REQUIRED).max(47, TITLE_SIZE),
  description: Yup.string().required(REQUIRED),
  estimate: Yup.number()
})
