/* eslint-disable @typescript-eslint/no-explicit-any */
import { IoSearch } from 'react-icons/io5'
import { FaFileCsv, FaFileCircleXmark } from 'react-icons/fa6'
import { useEffect, useState } from 'react'
import Table from '../components/Table'
import '../style/index.scss'
import { useMyContext } from '../../../shared/context/ContextApi'
import { toast } from 'react-toastify'

function Home() {
  const [search, setSearch] = useState<string>('')

  const { handleFileUpload, file, setTable } = useMyContext()

  useEffect(() => {
    const arrayConvertido = file.map((item) => ({
      ...item,
      Matrícula: item.Matrícula.toString(),
    }))

    const regex = /^(\d{8}-)*\d{8}$/

    if (search === '') {
      setTable({
        rows: arrayConvertido.map((row: any) => ({ ...row })),
        columns: [
          { field: 'Nome', headerName: 'Nome', width: 250 },
          { field: 'Matrícula', headerName: 'Matrícula', width: 100 },
          { field: 'Número', headerName: 'Número', width: 100 },
          { field: 'Cargo', headerName: 'Cargo', width: 250 },
        ],
      })
      return
    }

    const arrayMatriculas = search
      .split('-')
      .map((matricula) => matricula.trim())

    const filtrados = arrayConvertido.filter((item: any) => {
      return arrayMatriculas.includes(item.Matrícula)
    })

    const foundRA = filtrados.map((item) => item.Matrícula)
    const notFoundRA = arrayMatriculas.filter((ra) => !foundRA.includes(ra))

    if (notFoundRA.length > 0 && regex.test(search)) {
      const lastInvalidRA = notFoundRA[notFoundRA.length - 1]
      toast.warn(`Não foi encontrado o RA ${lastInvalidRA}`)
    }

    setTable({
      rows: filtrados.map((row: any) => ({ ...row })),
      columns: [
        { field: 'Nome', headerName: 'Nome', width: 250 },
        { field: 'Matrícula', headerName: 'Matrícula', width: 100 },
        { field: 'Número', headerName: 'Número', width: 100 },
        { field: 'Cargo', headerName: 'Cargo', width: 250 },
      ],
    })
  }, [search, file, setTable])

  return (
    <div className="Home">
      <label htmlFor="file-upload" className="lfile-icon">
        <div className={file.length ? 'UploadBox' : 'UploadBoxX'}>
          <div className="uploadIcon">
            {file.length ? <FaFileCsv /> : <FaFileCircleXmark />}
          </div>
          <label htmlFor="file-upload" className="custom-upload-button">
            <input type="file" id="file-upload" onChange={handleFileUpload} />
            <span>Upload</span>
          </label>
        </div>
      </label>

      <div className="InputBox">
        <div className="searchIcon">
          <IoSearch />
        </div>
        <input
          type="text"
          placeholder="Search"
          onChange={(e) => setSearch(e.target.value)}
          disabled={!file.length}
        />
      </div>

      <div className="TableContent">
        <Table />
      </div>
    </div>
  )
}

export default Home
