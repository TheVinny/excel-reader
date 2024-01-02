import './Sidebar.scss'
import logo from './logo.png'
import SidebarItem from './SidebarItem'
import SidebarData from './SidebarData'

function Sidebar() {
  return (
    <div className="Sidebar">
      <div className="logo">
        <img src={logo} alt="" />
      </div>
      <SidebarItem data={SidebarData} />
    </div>
  )
}

export default Sidebar
