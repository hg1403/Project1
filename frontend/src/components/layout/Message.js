import React from 'react'

const message = ({ variant ,children}) => {
  return (
    <div className={`alert alert-${variant}`}>{children} </div>
  )
}

export default message
