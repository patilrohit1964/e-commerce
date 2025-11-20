import React from 'react'
import { OrbitalLoader } from '../ui/orbital-loader'

const Loading = () => {
  return (
    <div className='flex items-center justify-center h-screen'>
      <OrbitalLoader />
    </div>
  )
}

export default Loading