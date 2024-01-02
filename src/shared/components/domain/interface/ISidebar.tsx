import { ReactElement } from 'react'
import { IconType } from 'react-icons'

interface ISidebar {
  path: string
  element: () => ReactElement
  icon: IconType
  name: string
}

export default ISidebar
