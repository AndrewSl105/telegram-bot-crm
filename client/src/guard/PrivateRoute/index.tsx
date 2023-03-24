import { Navigate, useLocation } from 'react-router-dom'
import DashBoard from '../../pages/Dashboard'
import { getToken } from '../../utils'

const PrivateRoutes = (): any => {
  const location = useLocation()
  const token = getToken()

  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
  return (token === undefined || null)
    ? <Navigate to="/log-in" replace state={{ from: location }} />
    : <DashBoard />
}

export default PrivateRoutes
