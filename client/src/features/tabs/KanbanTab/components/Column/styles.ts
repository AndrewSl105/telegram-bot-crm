import { theme } from '../../../../../MUI/theme'

export const styles = {
  main: {
    width: '100%',
    display: 'flex',
    flexFlow: 'column',
    border: '1px dashed rgba(145, 158, 171, 0.24)',
    borderRadius: '8px',
    alignItems: 'center',
    margin: '0 16px 0 16px',
    fontFamily: 'Public Sans, sans-serif !important',
    background: 'rgb(249, 250, 251)',
    transition: 'box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    [theme.breakpoints.down('sm')]: {
      margin: '0 4px'
    }
  },
  titleCont: {
    width: '100%',
    padding: '1rem',
    display: 'flex',
    justifyContent: 'center',
    textAlign: 'center'
  },
  title: {
    fontWeight: 'bold',
    fontSize: '1.25rem',
    color: 'rgb(33, 43, 54)',
    marginTop: '1rem'
  },
  list: {
    width: '100%',
    height: 'inherit',
    padding: '0.5rem',
    flexFlow: 'column',
    display: 'flex',
    alignItems: 'center'
  }
}
