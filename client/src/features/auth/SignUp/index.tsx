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

const SignUp = (): ReactJSXElement => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const userState = useSelector((state: any) => state.user)

  useEffect(() => {
    navigateToRoot(navigate)
  }, [userState])

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      userName: '',
      email: '',
      password: '',
      role: 'user'
    },
    onSubmit: (): any => {}
  })

  const {
    getFieldProps, values
  } = formik

  const submitHandler = (): void => {
    void dispatch(userSignUpAction(values))
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
                        />
                        <AuthInput
                            {...getFieldProps('email')}
                            label='Email'
                            type="text"/>
                        <AuthInput
                            {...getFieldProps('password')}
                            label='Password'
                            type="password"/>
                        <AuthInput
                            label='Confirm password'
                            type="password"/>
                    </AuthCardContainer>
                    <Button variant="contained" onClick={submitHandler}>
                        Submit
                    </Button>
                    <Typography sx={{ mt: '1rem' }}>
                        Already have an account? <Link to="/log-in">Log in</Link>
                    </Typography>
        </AuthContainer>
  )
}

export default SignUp
