import React from 'react'

const WeakResist = (weakResist) => {
  return (
    <table className="border-collapse text-sm weekresist__table">
      <tbody>
        {Object.keys(weakResist).map((item) => {
          // 弱点・耐性がないものは描画しない
          if (weakResist[item].types.length !== 0) {
            return (
              <tr
                key={item}
                className="weekresist__row"
              >
                <th className="weekresist__th">{weakResist[item].name}</th>
                <td className="weekresist__td">
                  <ul className="flex flex-wrap">
                    {weakResist[item].types.map((data) => {
                      return (
                        <li
                          key={data.type}
                          className="flex items-center mr-1"
                        >
                          <img
                            className="mr-1"
                            src={data.img}
                            width="15"
                          />
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
      <style jsx>{`
        .weekresist__table {
          width: 100%;
        }
        .weekresist__row:nth-child(odd) {
          background: #f7fafc;
        }
        .weekresist__th,
        .weekresist__td {
          padding: 0.5em;
          border: 1px solid rgba(0, 0, 0, 0.1);
        }
        .weekresist__th {
          white-space: nowrap;
        }
      `}</style>
    </table>
  )
}

export default WeakResist
