import React from 'react'

function ProgressBar({done} : {done: number}) {
  return (
    <div className="w-full bg-gray-100 rounded-full h-2 z-30 absolute bottom-0">
        <div className="bg-blue-200 h-2 rounded-full" style={{width: done + "%"}}></div>
    </div>
  )
}

export default ProgressBar