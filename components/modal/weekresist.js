import React from 'react'

const WeekResist = () => {
  return (
    <>
      <table className="border-collapse text-sm">
        <tbody>
          <tr>
            <th>二重弱点</th>
            <td>
              <ul className="flex flex-wrap">
                <li className="flex items-center mr-1">
                  <img className="mr-1" src="/static/img/icon/type-Bug.png" width="15" />
                  <span>虫</span>
                </li>
              </ul>
            </td>
          </tr>
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

export default WeekResist
