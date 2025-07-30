'use client'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { WEBSITE_HOME, WEBSITE_REGISTER } from '@/routes/websiteRoute'
import axios from 'axios'
import Link from 'next/link'
import React, { use, useEffect, useState } from 'react'

const EmailVerification = ({ params }) => {
  const { token } = use(params)
  const [isVerified, setIsVerified] = useState(false)
  useEffect(() => {
    const verify = async () => {
      const { data } = await axios.post(`/api/auth/verify-email`, { token })
      if (data.success) {
        setIsVerified(true)
    }
    }
    verify()
  }, [])
  return (
    <Card className={'w-[400px]'}>
      <CardContent>
        {isVerified ?
          (
            <div>
              <div className='flex justify-center items-center mb-5'>
                <h1 className='text-3xl'>Email verified success</h1>
              </div>
              <Link href={WEBSITE_HOME} className='cursor-pointer'>
                <Button className='w-full'>Continue to shopping</Button>
              </Link>
            </div>
          ) :
          <div>
            <div>
              <div className='flex justify-center items-center mb-5'>
                <h1 className='text-3xl text-red-500'>Error! Try again</h1>
              </div>
              <Link href={WEBSITE_REGISTER} className='cursor-pointer'>
                <Button className='w-full'>Try Again</Button>
              </Link>
            </div>
          </div>}
      </CardContent>
    </Card>
  )
}

export default EmailVerification