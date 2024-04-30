import React from 'react'

function ProgressBar({done} : {done: number}) {
  return (
    <div className="w-full bg-gray-300/80 rounded-full h-2">
        <div className="bg-blue-600 h-2 rounded-full" style={{width: done + "%"}}></div>
    </div>
  )
}

export default ProgressBar