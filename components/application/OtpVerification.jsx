import { zSchmea } from '@/lib/zodSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { FormControl, FormField, FormItem, FormLabel, FormMessage, Form } from '../ui/form'
import { Input } from '../ui/input'
import ButtonLoading from './ButtonLoading'
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from '../ui/input-otp'
import { Button } from '../ui/button'
import { useState } from 'react'
import axios from 'axios'
import { showToast } from '@/lib/toast'

const OtpVerification = ({ email, onSubmit, loading }) => {
    const formSchema = zSchmea.pick({ otp: true, email: true })
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            otp: '',
            email: email
        }
    })
    const [resendOtpLoading, setresendOtpLoading] = useState(false)

    const handleOtpVerification = async (values) => {
        onSubmit(values)
    }

    const resendOtp = async () => {
        try {
            setresendOtpLoading(true)
            const { data: resendOtpResponce } = await axios.post('/api/auth/resend-otp', {
                email
            });
            if (!resendOtpResponce.success) {
                throw new Error(resendOtpResponce.message)
            }
            showToast('success', resendOtpResponce?.message || 'logged successfully')
        }
        catch (error) {
            console.log(error)
            showToast('error', resendOtpResponce?.message || 'logged successfully')
        } finally {
            setresendOtpLoading(false)
        }
    }
    return (
        <div>
            <div>
                <p className='text-sm text-gray-400 text-center py-3'>We have sent and an One-time password (OTP) to your registered email address. The OTP is valid for 10 minutes only</p>
            </div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleOtpVerification)}>
                    <div className='flex items-center justify-center'>
                        <FormField control={form.control} name='otp' render={({ field }) => (
                            <FormItem>
                                <FormLabel className={'font-bold'}>OTP</FormLabel>
                                <FormControl className='mx-auto'>
                                    <InputOTP maxLength={6} {...field}>
                                        <InputOTPGroup>
                                            {[...Array(6)].map((_, idx) => (
                                                <InputOTPSlot index={idx} />
                                            ))}
                                        </InputOTPGroup>
                                    </InputOTP>
                                </FormControl>
                                <FormMessage className={'text-center'} />
                            </FormItem>
                        )} />
                    </div>

                    <div className='mt-5 flex flex-col items-center justify-center'>
                        <ButtonLoading type='submit' text='Verify OTP' className='w-full cursor-pointer' loading={loading} />
                        <div>
                            <Button onClick={resendOtp} variant='link' className='cursor-pointer hover:text-blue-400 transition-all delay-150' disabled={resendOtpLoading}>
                                {!resendOtpLoading ? 'Resend OTP ?' : <span className='text-lg text-gray-700'>resending...</span>}
                            </Button>
                        </div>
                    </div>
                </form>
            </Form>

        </div>
    )
}

export default OtpVerification