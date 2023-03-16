import { theme } from '../../../MUI/theme'

export const styles = {
  h4: {
    marginBottom: '1rem',
    marginTop: '2rem'
  },
  imageCont: {
    borderRadius: '50%',
    width: '150px',
    height: '150px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: '#1976d2',
    img: {
      width: 'inherit'
    }
  },
  helpText: {
    mt: '1rem',
    a: {
      textDecoration: 'none',
      color: theme.palette.primary.main
    }
  }
}
