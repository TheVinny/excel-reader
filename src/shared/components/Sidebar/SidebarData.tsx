import Home from '../../../modules/Home/Page/Home'
import StaffTable from '../../../modules/StaffTable/Page/StaffTable'
import ISidebar from '../domain/interface/ISidebar'
import { IoHome, IoPersonSharp } from 'react-icons/io5'

const SidebarData: ISidebar[] = [
  { element: Home, path: '/', icon: IoHome, name: 'Inicio' },
  {
    element: StaffTable,
    path: 'staff',
    icon: IoPersonSharp,
    name: 'Listas',
  },
]

export default SidebarData
