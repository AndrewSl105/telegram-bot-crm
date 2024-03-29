import { Box, Button, Typography } from '@mui/material'
import AuthContainer from '../../../containers/AuthContainer'
import AuthCardContainer from '../../../containers/AuthCardContainer'
import AuthInput from '../../../patterns/AuthInput'
import bot from '../../../media/images/bot.png'
import { type ReactJSXElement } from '@emotion/react/types/jsx-namespace'
import { styles } from './styles'
import { useFormik } from 'formik'
import { useAppDispatch } from '../../../hook'
import { userLogInAction } from '../../../redux/slices/user'
import { Link, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { navigateToRoot } from '../../../utils'
import { logInSchema } from './validation'

const LogIn = (): ReactJSXElement => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const userState = useSelector((state: any) => state.user)

  useEffect(() => {
    navigateToRoot(navigate)
  }, [userState])

  const formik = useFormik({
    enableReinitialize: true,
    validationSchema: logInSchema,
    initialValues: {
      email: '',
      password: ''
    },
    onSubmit: () => {}
  })

  const {
    getFieldProps, values, errors, isValid
  } = formik

  const submitHandler = (): void => {
    void dispatch(userLogInAction(values))
  }

  return (
        <AuthContainer>
            <Box sx={styles.imageCont}>
                <img alt="bot" src={bot} />
            </Box>
            <Typography color="primary" variant="h5" sx={styles.h4}>
                Log In
            </Typography>
            <AuthCardContainer>
                <AuthInput
                    {...getFieldProps('email')}
                    label='Email'
                    type="text"
                    error={Boolean(errors.email)}
                    helperText={errors.email}
                />
                <AuthInput
                    {...getFieldProps('password')}
                    label='Password'
                    type="password"
                    error={Boolean(errors.password)}
                    helperText={errors.password}
                />
            </AuthCardContainer>
            <Button disabled={!isValid} variant="contained" onClick={submitHandler}>
                Log In
            </Button>
            <Typography sx={styles.helpText}>
                Not registered yet? <Link to="/sign-up">Create an account</Link>
            </Typography>
        </AuthContainer>
  )
}

export default LogIn
