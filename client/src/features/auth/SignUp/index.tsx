import { Box, Button, Typography } from '@mui/material'
import AuthContainer from '../../../containers/AuthContainer'
import AuthCardContainer from '../../../containers/AuthCardContainer'
import AuthInput from '../../../patterns/AuthInput'
import bot from '../../../media/images/bot.png'
import { type ReactJSXElement } from '@emotion/react/types/jsx-namespace'
import { styles } from './styles'
import { useFormik } from 'formik'
import { useAppDispatch } from '../../../hook'
import { userSignUpAction } from '../../../redux/slices/user'
import { Link, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { navigateToRoot } from '../../../utils'
import { useSelector } from 'react-redux'
import { signUpSchema } from './validation'

const SignUp = (): ReactJSXElement => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const userState = useSelector((state: any) => state.user)

  console.log(userState)

  useEffect(() => {
    navigateToRoot(navigate)
  }, [userState])

  const formik = useFormik({
    enableReinitialize: true,
    validationSchema: signUpSchema,
    initialValues: {
      userName: '',
      email: '',
      password: '',
      passwordConfirmation: ''
    },
    onSubmit: (): any => {}
  })

  const {
    getFieldProps, values, errors, isValid
  } = formik

  const submitHandler = (): void => {
    void dispatch(userSignUpAction({
      userName: values.userName,
      email: values.email,
      password: values.password
    }))
  }

  return (
        <AuthContainer>
                    <Box sx={styles.imageCont}>
                        <img alt="bot" src={bot} />
                    </Box>
                    <Typography color="primary" variant="h5" sx={styles.h4}>
                        Sign Up
                    </Typography>
                    <AuthCardContainer>
                        <AuthInput
                            {...getFieldProps('userName')}
                            label='Username'
                            type="text"
                            error={Boolean(errors.userName)}
                            helperText={errors.userName}
                        />
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
                        <AuthInput
                            {...getFieldProps('passwordConfirmation')}
                            label='Confirm password'
                            type="password"
                            error={Boolean(errors.passwordConfirmation)}
                            helperText={errors.passwordConfirmation}
                        />
                    </AuthCardContainer>
                    <Button disabled={!isValid} variant="contained" onClick={submitHandler}>
                        Submit
                    </Button>
                    <Typography sx={styles.helpText}>
                        Already have an account? <Link to="/log-in">Log in</Link>
                    </Typography>
        </AuthContainer>
  )
}

export default SignUp
