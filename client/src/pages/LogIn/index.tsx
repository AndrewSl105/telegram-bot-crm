import { Typography } from '@mui/material'
import AuthContainer from '../../containers/AuthContainer'
import AuthCardContainer from '../../containers/AuthCardContainer'
import AuthInput from '../../components/AuthInput'

const styles = {
  h3: {
    color: 'rgb(103, 58, 183)',
    marginBottom: '2rem'
  }
}

const Index = () => {
  return (
        <AuthContainer>
            <Typography variant="h3" sx={styles.h3}>
                Create new account
            </Typography>
            <AuthCardContainer>
                <AuthInput label='Username' type="text"/>
                <AuthInput label='Email' type="text"/>
                <AuthInput label='Password' type="password"/>
                <AuthInput label='Confirm password' type="password"/>
                <AuthInput label='Passcode' type="text"/>
            </AuthCardContainer>
        </AuthContainer>
  )
}

export default Index
