export const styles = {
  main: {
    marginTop: '0.5rem',
    borderRadius: '8px',
    maxWidth: 345,
    width: '90%',
    position: 'relative',
    boxShadow: 'rgba(145, 158, 171, 0.16) 0px 1px 2px 0px',
    transition: 'box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    background: 'white',
    ':hover': {
      boxShadow: 'rgba(145, 158, 171, 0.16) 0px 20px 40px -4px'
    }
  },
  title: {
    marginBottom: '0.5rem',
    padding: '0.7rem',
    borderBottom: '1px dashed rgba(145, 158, 171, 0.24)'
  },
  description: {
    padding: '1rem',
    display: '-webkit-box',
    WebkitLineClamp: '3',
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden'
  }
}
