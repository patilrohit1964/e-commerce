// import { Button } from '@/components/ui/button'
import { ADMIN_DASHBOARD } from '../routes/adminPaneRoute'
import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <div>
      {/* <Button>Hii</Button> */}
      hii fdf
      <Link href={ADMIN_DASHBOARD}>Dashboard</Link>
    </div>
  )
}

export default page