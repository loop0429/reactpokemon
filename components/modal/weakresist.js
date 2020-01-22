import React from 'react'
import { useSelector } from 'react-redux'

const useWeakResist = () => {
  const weakResist = useSelector((state) => state.modalReducer.weakResist)

  return { weakResist }
}

const WeakResist = () => {
  const { weakResist } = useWeakResist()
  return (
    <>
      <table className="border-collapse text-sm">
        <tbody>
          {Object.keys(weakResist).map((item, index) => {
            return (
              <tr key={index}>
                <th>{item.name}</th>
                <td>
                  <ul className="flex flex-wrap">
                    <li className="flex items-center mr-1">
                      <img className="mr-1" src={item.img} width="15" />
                      <span>{item.type}</span>
                    </li>
                  </ul>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
      <style jsx>{`
        table {
          width: 100%;
        }
        tr:nth-child(odd) {
          background: #f7fafc;
        }
        th, td {
          padding: 0.5em;
          border: 1px solid rgba(0, 0, 0, 0.1);
        }
        th {
          white-space: nowrap;
        }
      `}</style>
    </>
  )
}

export default WeakResist
