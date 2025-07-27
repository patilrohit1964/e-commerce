import { zSchmea } from '@/lib/zodSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { FormControl, FormField, FormItem, FormLabel, FormMessage, Form } from '../ui/form'
import { Input } from '../ui/input'
import ButtonLoading from './ButtonLoading'
import { InputOTP, InputOTPGroup } from '../ui/input-otp'

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
            <Form {...form}>
                <form onSubmit={form.handleSubmit('handleLoginSubmit')}>
                    <div>
                        <FormField control={form.control} name='otp' render={({ field }) => (
                            <FormItem>
                                <FormLabel>OTP</FormLabel>
                                <FormControl>
                                    <InputOTPGroup />
                                    {/* <InputOTP /> */}
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}>
                        </FormField>
                    </div>
                    <div className='mt-5'><ButtonLoading type={'submit'} text={'Verify OTP'} loading={loading} className={'w-full cursor-pointer'} /></div>
                </form>
            </Form>
        </div>
    )
}

export default OtpVerification