import Link from 'next/link'
import { WEBSITE_CHECKOUT, WEBSITE_SHOP } from '../../../../routes/websiteRoute'
import { Button } from '../../../../components/ui/button'
import { Input } from '../../../../components/ui/input'
import { Textarea } from '../../../../components/ui/textarea'
import { Label } from '../../../../components/ui/label'
import { LocalShipping } from '@mui/icons-material'

const Checkout = () => {
  return (
    <div>
      <div className='flex lg:flex-nowrap flex-wrap gap-10 my-20 lg:px-32 px-4'>
        <div className='lg:w-[70%] w-full'>
          <div className='mb-3 flex items-center space-x-2 font-semibold'>
            <LocalShipping />
            <p>Shipping Address</p>
          </div>
          <div className='grid md:grid-cols-2 grid-cols-1 gap-4 mb-5'>
            <div>
              <Label htmlFor="first-name" className={'mb-1'}>First Name</Label>
              <Input type={'text'} placeholder="First name*" id='first-name' />
            </div>
            <div>
              <Label htmlFor="email-address" className={'mb-1'}>Email Address</Label>
              <Input type={'email'} placeholder='Email Address' id='email-address' />
            </div>
            <div>
              <Label htmlFor="phone-number" className={'mb-1'}>Phone Number</Label>
              <Input type={'tel'} placeholder='Phone Number*' id='phone-number' />
            </div>
            <div>
              <Label htmlFor="country" className={'mb-1'}>Country</Label>
              <Input type={'text'} placeholder='Country' id='country' />
            </div>
            <div>
              <Label htmlFor="state" className={'mb-1'}>State</Label>
              <Input type={'text'} placeholder='State*' id='state' />
            </div>
            <div>
              <Label htmlFor="city" className={'mb-1'}>City</Label>
              <Input type={'text'} placeholder='City*' id='city' />
            </div>
            <div>
              <Label htmlFor="pin-code" className={'mb-1'}>Pin Code</Label>
              <Input type={'text'} placeholder='Pin Code*' id='pin-code' />
            </div>
            <div>
              <Label htmlFor="landmark" className={'mb-1'}>Landmark</Label>
              <Input type={'text'} placeholder='Landmark*' id='landmark' />
            </div>
            <div className='col-span'>
              <Label htmlFor="order-note" className={'mb-1'}>Order Note</Label>
              <Textarea id='order-note' placeholder='Order Note' />
            </div>
          </div>
          <Button className={'w-full bg-black hover:bg-gray-800 text-white cursor-pointer rounded-full'}>Place Order</Button>
        </div>
        <div className='lg:w-[30%] w-full'>
          <div className='rounded bg-gray-50 p-5 sticky top-5'>
            <h4 className='text-lg font-semibold mb-5'>Order Summary</h4>
            <div>
              <table className='w-full'>
                <tbody>
                  <tr>
                    <td className='font-medium py-2'>SubTotal:</td>
                    {/* <td className='text-end py-2'>{total.toLocaleString('en-IN', { style: 'currency', currency: "INR" })}</td> */}
                  </tr>
                  <tr>
                    <td className='font-medium py-2'>Discount:</td>
                    {/* <td className='text-end py-2'>-{discount.toLocaleString('en-IN', { style: 'currency', currency: "INR" })}</td> */}
                  </tr>
                  <tr>
                    <td className='font-medium py-2'>Total:</td>
                    {/* <td className='text-end py-2'>{total.toLocaleString('en-IN', { style: 'currency', currency: "INR" })}</td> */}
                  </tr>
                </tbody>
              </table>
              <Button type='button' asChild className={'w-full bg-black rounded-full mt-5 mb-3'}>
                <Link href={WEBSITE_CHECKOUT}>Process To Checkout</Link>
              </Button>
              <p className='text-center'>
                <Link href={WEBSITE_SHOP} className='hover:underline transition-all'>Continue Shopping</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout