import { zSchmea } from '@/lib/zodSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { FormControl, FormField, FormItem, FormLabel, FormMessage, Form } from '../ui/form'
import { Input } from '../ui/input'
import ButtonLoading from './ButtonLoading'
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from '../ui/input-otp'
import { Button } from '../ui/button'

const OtpVerification = ({ email, onSubmit, loading }) => {
    const formSchema = zSchmea.pick({ otp: true, email: true })
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            otp: '',
            email: email
        }
    })
    return (
        <div>
            <div>
                <p className='text-sm text-gray-400 text-center py-3'>We have sent and an One-time password (OTP) to your registered email address. The OTP is valid for 10 minutes only</p>
            </div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className='flex items-center justify-center'>
                        <FormField control={form.control} name='otp' render={({ field }) => (
                            <FormItem>
                                <FormLabel className={'font-bold'}>OTP</FormLabel>
                                <FormControl className='mx-auto'>
                                    <InputOTP maxLength={6}>
                                        <InputOTPGroup>
                                            <InputOTPSlot className={'border border-gray-400 focus:border-none'} index={0} />
                                            <InputOTPSlot className={'border border-gray-400 focus:border-none'} index={1} />
                                            <InputOTPSlot className={'border border-gray-400 focus:border-none'} index={2} />
                                        </InputOTPGroup>
                                        <InputOTPSeparator />
                                        <InputOTPGroup>
                                            <InputOTPSlot className={'border border-gray-400 focus:border-none'} index={3} />
                                            <InputOTPSlot className={'border border-gray-400 focus:border-none'} index={4} />
                                            <InputOTPSlot className={'border border-gray-400 focus:border-none'} index={5} />
                                        </InputOTPGroup>
                                    </InputOTP>
                                </FormControl>
                                <FormMessage className={'text-center'} />
                            </FormItem>
                        )}>
                        </FormField>
                    </div>
                    <div className='mt-5 flex flex-col items-center justify-center'><ButtonLoading type={'submit'} text={'Verify OTP'} loading={loading} className={'w-full cursor-pointer'} />
                        <Button variant={'link'} className={'cursor-pointer hover:text-blue-400 transition-all delay-150'}>Resend OTP ?</Button>
                    </div>
                </form>
            </Form>
        </div>
    )
}

export default OtpVerification