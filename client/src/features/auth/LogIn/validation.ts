import * as Yup from 'yup'
import { EMAIL_INCORRECT, PASSWORD_SIZE_LIMIT, REQUIRED } from '../../../constants/validation'

export const logInSchema = Yup.object().shape({
  email: Yup.string().required(REQUIRED).email(EMAIL_INCORRECT),
  password: Yup.string()
    .required(REQUIRED)
    .min(9, PASSWORD_SIZE_LIMIT)
    .max(27, PASSWORD_SIZE_LIMIT)
})
