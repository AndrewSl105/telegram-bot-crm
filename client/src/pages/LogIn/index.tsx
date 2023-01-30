import { Box, Typography } from '@mui/material'
import AuthContainer from '../../containers/AuthContainer'
import AuthCardContainer from '../../containers/AuthCardContainer'
import AuthInput from '../../components/AuthInput'
import bot from '../../media/images/bot.png'
import { Outlet } from 'react-router-dom'

const styles = {
  h4: {
    color: 'rgb(103, 58, 183)',
    marginBottom: '1rem',
    marginTop: '2rem'
  },
  imageCont: {
    borderRadius: '50%',
    width: '240px',
    height: '240px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'rgb(103, 58, 183)',
    img: {
      width: 'inherit'
    }
  }
}

const Index = () => {
  return (
        <AuthContainer>
            <Box sx={styles.imageCont}>
                <img alt="bot" src={bot} />
            </Box>
            <Typography variant="h4" sx={styles.h4}>
                Registration
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
