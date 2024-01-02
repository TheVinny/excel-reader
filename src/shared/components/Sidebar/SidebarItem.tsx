import { Link } from 'react-router-dom'
import ISidebar from '../domain/interface/ISidebar'

function SidebarItem(props: { data: ISidebar[] }) {
  const { data } = props
  return (
    <>
      {data.map((Item, index) => (
        <Link to={Item.path} key={index}>
          <div className="SidebarItem">
            <Item.icon key={index} />
            <p className="name">{Item.name}</p>
          </div>
        </Link>
      ))}
    </>
  )
}

export default SidebarItem
