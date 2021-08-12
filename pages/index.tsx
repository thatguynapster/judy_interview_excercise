import React, { FC } from 'react'
import HeadFile from '../components/head-file'
import { useState } from 'react'

const Index: FC = () => {
  const [rawData, setRawData] = useState<string[] | null>(null)
  const [CSVHeader, setCSVHeader] = useState<any[]>([])
  const [formattedData, setFormattedData] = useState<any[]>([])
  const [processStart, setProcessStart] = useState<number>(new Date().getTime())
  const [processEnd, setProcessEnd] = useState<number>(new Date().getTime())

  async function _readCSV(ev: any) {
    const selected_file = ev.target.files[0]
    const _fr = new FileReader()
    _fr.onload = (evt) => {
      processCSVData(evt.target?.result)
    }
    _fr.readAsBinaryString(selected_file)
    // clear input field
    ev.target.value = null
  }

  async function processCSVData(_data: any) {
    setProcessStart(new Date().getTime())
    const CSVLines = _data.split(/\r\n|\n/)
    setCSVHeader(CSVLines[0].split(/,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/).join(','))

    // console.log(CSVHeaders)
    // console.log(CSVLines)
    setRawData(CSVLines)

    // format csv data
    let csv_nmatrix: any = []

    CSVLines.map((_csv: string, i: number) => {
      //ignore header
      if (i > 0) {
        if (_csv.length > 0) {
          // remove empty entries
          csv_nmatrix.push(_csv.split(','))
        }
      }
    })
    // console.log(csv_nmatrix)

    let formatted_matrix = csv_nmatrix.map((_row: any, y: any) => {
      _row.map((_cell: any, x: any) => {
        let spatials: any = []
        // get surrounding values
        let _prev_row = undefined
        if (csv_nmatrix[y - 1]) {
          _prev_row = [csv_nmatrix[y - 1][x - 1], csv_nmatrix[y - 1][x], csv_nmatrix[y - 1][x + 1]]
        }
        let _next_row = undefined
        if (csv_nmatrix[y + 1]) {
          _next_row = [csv_nmatrix[y + 1][x - 1], csv_nmatrix[y + 1][x], csv_nmatrix[y + 1][x + 1]]
        }

        let _curr_row = [_row[x - 1], _row[x + 1]]
        // console.log(_prev_row)
        // console.log(_sp)
        // console.log(_next_row)
        // END get surrounding values

        spatials.push(_prev_row, _curr_row, _next_row)
        // removing undefined arrays in spatials
        let _sp = spatials
          .filter((element: string[]) => {
            return element !== undefined
          })
          .map((_fsf: string[], i: number) => {
            // console.log(_fsf)
            let l2_filter = _fsf.filter((element: string) => {
              return element !== undefined
            })
            // console.log(l2_filter)
            return l2_filter
          })
          .join(',')
          .split(',')
        // console.log(_cell, _sp)

        // recalculate cell value from spatials when 0
        if (Number(_cell) === 0) {
          // console.log('zeroed cell')
          let _l = _sp.length
          let new_cell = _sp.reduce((acc: number, curr: number) => Number(acc) + Number(curr))
          // console.log(new_cell / _l)
          _row[x] = new_cell / _l
        } else {
          // console.log('non zeroed cell')
        }
        // console.log(_row, _sp)
      })
      return _row.join(',')
    })

    // console.log(formatted_matrix)

    setFormattedData(formatted_matrix)
    setProcessEnd(new Date().getTime())
  }

  return (
    <>
      <HeadFile title="JUDY.LEGAL ASSIGNMENT" />

      {/* PAGE CONTENT HERE... */}
      <div className="">
        <div className="bg-gray-200 h-screen p-6 flex flex-row space-x-6 justify-between">
          <div className="w-full bg-white rounded-lg p-4 overflow-y-auto space-y-4">
            <div className="flex flex-row">
              <label
                htmlFor="csv-file"
                className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500"
              >
                <span>Select a file</span>
                <input
                  id="csv-file"
                  name="csv-file"
                  type="file"
                  className="sr-only"
                  accept=".csv"
                  onChange={_readCSV}
                />
              </label>
            </div>
            <div>
              {rawData?.map((_rd: string, i: any) => {
                return <p key={i}>{_rd}</p>
              })}
            </div>
          </div>
          <div className="w-full bg-white rounded-lg p-4 overflow-y-auto relative h-full">
            <p className="bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500">
              Formatted Data{' '}
              <span className="absolute right-0">
                {((processEnd - processStart) / 1000).toFixed(16)}s
              </span>
            </p>
            {<span>{CSVHeader}</span>}
            {formattedData?.map((_data: string[], i: any) => {
              // console.log(_data)
              return (
                <div key={i} className="mb-auto">
                  {_data}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </>
  )
}

export default Index
