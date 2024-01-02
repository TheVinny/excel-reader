import { useMyContext } from '../../../shared/context/ContextApi'
import './Table.scss'
import { DataGrid } from '@mui/x-data-grid'

export default function Table() {
  const { table } = useMyContext()
  return (
    <DataGrid
      rows={table.rows}
      columns={table.columns}
      checkboxSelection={true}
    />
  )
}
