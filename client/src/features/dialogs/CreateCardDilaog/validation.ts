import * as Yup from 'yup'
import { PHONE_NUMBER_INVALID, REQUIRED, TITLE_SIZE } from '../../../constants/validation'
const phoneNumber = /^\+?\d+$/

export const cardSchema = Yup.object().shape({
  title: Yup.string().required(REQUIRED).max(47, TITLE_SIZE),
  description: Yup.string().required(REQUIRED),
  estimate: Yup.number(),
  phoneNumber: Yup.string().matches(phoneNumber, PHONE_NUMBER_INVALID),
  boardId: Yup.string().required(REQUIRED)

})
