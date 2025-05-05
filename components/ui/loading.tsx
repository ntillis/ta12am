import React from 'react'
import BeatLoader from 'react-spinners/BeatLoader'

const loading = () => {
  return (
    <div className="flex items-center justify-center w-screen p-4">
        <BeatLoader />
    </div>
  )
}

export default loading