import { Card, CardContent } from '@/components/ui/card'
import { zSchmea } from '@/lib/zodSchema'
import Image from 'next/image'
import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
const page = () => {
  const form = useForm({
    resolver: zodResolver(zSchmea),
    defaultValues: {
      username
    }
  })
  return (
    <div>
      <Card className={'w-[450px]'}>
        <CardContent>
          <div className='flex justify-center'>
            <Image src={''} width={'path.width'} height={'path.height'} alt='logo' className='max-w-[150px]' />
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