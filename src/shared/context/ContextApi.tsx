/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  createContext,
  useContext,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
  ReactNode,
  ChangeEvent,
} from 'react'
import * as XLSX from 'xlsx'
import { GridColDef, GridRowsProp } from '@mui/x-data-grid'
import { toast } from 'react-toastify'

interface FileDataRow {
  id: number
  Nome: string
  Número: string
  Cargo: string
  Matrícula: string
}

interface MyContextProps {
  setFile: Dispatch<SetStateAction<FileDataRow[]>>
  file: FileDataRow[]
  handleFileUpload: (e: ChangeEvent<HTMLInputElement>) => void
  table: {
    rows: GridRowsProp
    columns: GridColDef[]
  }
  setTable: any
}

const MyContext = createContext<MyContextProps | undefined>(undefined)

const MyContextProvider = ({ children }: { children: ReactNode }) => {
  const [fileData, setFileData] = useState<FileDataRow[]>([])
  const [table, setTable] = useState({
    rows: [] as GridRowsProp,
    columns: [] as GridColDef[],
  })

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0]

    if (!file) return

    const fileName = file.name
    const fileExtension = fileName.split('.').pop() // Obter a extensão do arquivo

    // Verificar se a extensão é a desejada (por exemplo, ".xlsx")
    if (fileExtension !== 'xlsx') {
      return toast.error('Arquivo Invalido, Importe um xlsx', {
        position: 'bottom-left',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      })
    }

    const reader = new FileReader()

    reader.onload = (event) => {
      const data = event.target?.result
      if (!data) return

      const binaryString = new Uint8Array(data as ArrayBuffer)
      const workbook = XLSX.read(binaryString, { type: 'array' })
      const sheetName = workbook.SheetNames[0]
      const sheet = workbook.Sheets[sheetName]
      const parsedData = XLSX.utils.sheet_to_json(sheet, { header: 1 }) as any[]

      const rowsData: FileDataRow[] = parsedData
        .slice(1)
        .map((row: string[], index: number) => {
          return {
            id: index + 1,
            Nome: row[7] || '', // Assuming the second column is "Nome" in your model
            Matrícula: row[5] || '', // Assuming the second column is "Nome" in your model
            Número: row[6] || '', // Assuming the third column is "Número" in your model
            Cargo: row[11] || '', // Assuming the fourth column is "Cargo" in your model
          }
        })

      setFileData(rowsData)
      setTable({
        rows: rowsData.map((row) => ({ ...row })),
        columns: [
          { field: 'Nome', headerName: 'Nome', width: 250 },
          { field: 'Matrícula', headerName: 'Matrícula', width: 100 },
          { field: 'Número', headerName: 'Número', width: 100 },
          { field: 'Cargo', headerName: 'Cargo', width: 250 },
        ],
      })

      // Salvar dados no localStorage
      localStorage.setItem('excelData', JSON.stringify(parsedData))
    }

    reader.readAsArrayBuffer(file)

    toast.success('Planilha anexada com sucesso', {
      position: 'bottom-left',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    })
  }

  useEffect(() => {
    // Recuperar dados do localStorage ao carregar o componente
    const storedData = localStorage.getItem('excelData')
    if (storedData) {
      const parsedData = JSON.parse(storedData) as any[]

      const rowsData: FileDataRow[] = parsedData
        .slice(1)
        .map((row: string[], index: number) => {
          return {
            id: index + 1,
            Nome: row[7] || '',
            Matrícula: row[5] || '',
            Número: row[6] || '',
            Cargo: row[11] || '',
          }
        })

      setFileData(rowsData)
      setTable({
        rows: rowsData.map((row) => ({ ...row })),
        columns: [
          { field: 'Nome', headerName: 'Nome', width: 250 },
          { field: 'Matrícula', headerName: 'Matrícula', width: 100 },
          { field: 'Número', headerName: 'Número', width: 100 },
          { field: 'Cargo', headerName: 'Cargo', width: 250 },
        ],
      })
    }
  }, []) // Executar apenas uma vez ao montar o componente

  const contextValue: MyContextProps = {
    setFile: setFileData,
    file: fileData,
    handleFileUpload,
    table,
    setTable,
  }

  return (
    <MyContext.Provider value={contextValue}>{children}</MyContext.Provider>
  )
}

const useMyContext = (): MyContextProps => {
  const context = useContext(MyContext)
  if (!context) {
    throw new Error('useMyContext must be used within a MyContextProvider')
  }
  return context
}

export { MyContextProvider, useMyContext }
