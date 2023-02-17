export const styles = {
  main: {
    marginTop: '1rem',
    padding: '1rem',
    borderRadius: '8px',
    maxWidth: 345,
    boxShadow: 'rgba(145, 158, 171, 0.16) 0px 1px 2px 0px',
    transition: 'box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    background: 'whit',
    cursor: 'pointer',
    ':hover': {
      boxShadow: 'gba(145, 158, 171, 0.16) 0px 20px 40px -4px'
    }
  },
  title: {
    marginBottom: '0.5rem',
    paddingBottom: '0.5rem',
    borderBottom: '1px dashed rgba(145, 158, 171, 0.24)'
  },
  description: {
    display: '-webkit-box',
    WebkitLineClamp: '3',
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden'
  }
}
