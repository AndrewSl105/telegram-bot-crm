import { Box, Typography } from '@mui/material'
import { type ReactJSXElement } from '@emotion/react/types/jsx-namespace'

const styles = {
  cursor: 'pointer',
  background: 'rgb(249, 250, 251)',
  padding: '1rem',
  margin: '1rem',
  minWidth: '145px',
  borderRadius: '10px',
  boxShadow: 'rgba(145, 158, 171, 0.16) 0px 1px 2px 0px',
  transition: 'box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
  ':hover': {
    boxShadow: 'rgba(145, 158, 171, 0.5) 0px 5px 10px -4px'
  }
}

interface AdminItemsProps {
  icon: ReactJSXElement
  text: string
  action: any

}

const AdminItem = (props: AdminItemsProps): ReactJSXElement => {
  const { icon, text, action } = props

  return (
        <Box onClick={action} alignItems="center" display="flex" flexDirection="column" sx={styles}>
            {icon}
            <Typography sx={{ marginTop: '8px' }}>
                {text}
            </Typography>
        </Box>
  )
}

export default AdminItem
