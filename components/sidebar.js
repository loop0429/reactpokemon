import React from 'react'

const isOpenSidebar = false

const Sidebar = () => {
  let sidebarClass = 'sidebar'
  if (isOpenSidebar) {
    sidebarClass = `${sidebarClass} is-open`
  }
  const style = {
    width: '30px',
    height: '30px'
  }
  return (
    <div className={sidebarClass}>
      <div className="img-pokemon491" style={style}>
        <p>iwt</p>
      </div>
    </div>
  )
}

export default Sidebar
