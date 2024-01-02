import { createBrowserRouter } from 'react-router-dom'
import Home from '../../../../modules/Home/Page/Home'
import Staff from '../../../../modules/StaffTable/Page/StaffTable'
import App from '../../../App'

const Routes = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: '/staff',
        element: <Staff />,
      },
      {
        path: '/',
        element: <Home />,
      },
    ],
  },
])

export default Routes
