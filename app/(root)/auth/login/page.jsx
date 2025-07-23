import { Card, CardContent } from '@/components/ui/card'
import Image from 'next/image'
import React from 'react'

const page = () => {
  return (
    <div>
      <Card className={'w-[450px]'}>
        <CardContent>
          <div className='flex justify-center'>
            <Image src={''} width={'path.width'} height={'path.height'} alt='logo' className='max-w-[150px]'/>
          </div>
          <div className='text-center'>
            <h1></h1>
            <p></p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default page