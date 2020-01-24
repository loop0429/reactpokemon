import React from 'react'

const WeakResist = (weakResist) => {
  return (
    <>
      <table className="border-collapse text-sm">
        <tbody>
          {Object.keys(weakResist).map((item) => {
            if (weakResist[item].types.length !== 0) {
              return (
                <tr key={item}>
                  <th>{weakResist[item].name}</th>
                  <td>
                    <ul className="flex flex-wrap">
                      {weakResist[item].types.map((data) => {
                        return (
                          <li key={data.type} className="flex items-center mr-1">
                            <img className="mr-1" src={data.img} width="15" />
                            <span>{data.type}</span>
                          </li>
                        )
                      })}
                    </ul>
                  </td>
                </tr>
              )
            }
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
