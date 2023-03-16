import * as Yup from 'yup'
import { PASSWORD_MATCH, PASSWORD_SIZE_LIMIT, REQUIRED, USERNAME_SIZE_LIMIT } from '../../../constants/validation'

export const signUpSchema = Yup.object().shape({
  userName: Yup.string().max(27, USERNAME_SIZE_LIMIT).required(REQUIRED),
  email: Yup.string().required(REQUIRED).email(),
  password: Yup.string()
    .required(REQUIRED)
    .min(9, PASSWORD_SIZE_LIMIT)
    .max(27, PASSWORD_SIZE_LIMIT),
  passwordConfirmation: Yup.string()
    .oneOf([Yup.ref('password')], PASSWORD_MATCH)
})
