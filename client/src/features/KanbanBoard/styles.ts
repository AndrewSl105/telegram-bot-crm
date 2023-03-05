import { theme } from '../../theme'

export const styles = {
  display: 'grid',
  gridTemplateColumns: 'repeat(4, 1fr)',
  gridGap: '1rem',
  justifyContent: 'space-between',
  height: 'calc(100vh - 120px)',
  [theme.breakpoints.down('xl')]: {
    gridTemplateColumns: 'repeat(3, 1fr)'
  },
  [theme.breakpoints.down('lg')]: {
    gridTemplateColumns: 'repeat(2, 1fr)'
  },
  [theme.breakpoints.down('md')]: {
    gridTemplateColumns: '1fr'
  }
}
