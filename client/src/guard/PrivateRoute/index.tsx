import { Navigate, useLocation } from 'react-router-dom'
import DashBoard from '../../pages/Dashboard'
import { getToken } from '../../utils'

const PrivateRoutes = (): any => {
  const location = useLocation()
  const token = getToken()

  if (token === undefined) {
    return null // or loading indicator/spinner/etc
  }

  return (token != null)
    ? <DashBoard />
    : <Navigate to="/log-in" replace state={{ from: location }} />
}

export default PrivateRoutes
