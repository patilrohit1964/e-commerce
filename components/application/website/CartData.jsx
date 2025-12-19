import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle } from '../../../components/ui/sheet'

import Link from 'next/link'
import { Button } from '../../../components/ui/button'
import { WEBSITE_CART, WEBSITE_CHECKOUT } from '../../../routes/websiteRoute'
import { CartItems } from './CartItems'

const CartData = ({ open, setOpen, cartItems }) => {
    // set cart data and focus on cart state management
    return (
        <Sheet open={open} onOpenChange={() => setOpen(false)}>
            <SheetContent side='right' className={'px-1 pb-3 overflow-y-auto'}>
                <SheetHeader className={''}>
                    <SheetTitle className={'border-b'}>Cart Items</SheetTitle>
                    {/* <SheetDescription>
                        Make changes to your profile here. Click save when you&apos;re done.
                    </SheetDescription> */}
                </SheetHeader>
                {
                    cartItems?.length > 0 ? cartItems?.map((item) => (
                        <CartItems item={item} key={item?._id} />
                    ))
                        :
                        <h1 className='text-gray-400 text-xl h-screen flex items-center justify-center text-center'>No Any Items in cart</h1>
                }
                {
                    cartItems?.length < 0 &&
                    <SheetFooter className={'border-t border-t-gray-500 p-0'}>
                        <div className='flex flex-col items-between justify-between'>
                            <div className='flex items-center justify-between'>
                                <p>Subtotal</p>
                                <p>Rs.0</p>
                            </div>
                            <div className='flex items-center justify-between'>
                                <p>Discount</p>
                                <p>Rs.0</p>
                            </div>
                        </div>
                        <div className='flex items-center justify-between border-t border-t-gray-500 py-2'>
                            <Button variant={'outline'} className={'border border-gray-400 cursor-pointer'} size={'lg'}>
                                <Link href={WEBSITE_CART}>View Cart</Link>
                            </Button>
                            <Button size={'lg'} className={'cursor-pointer'}>
                                <Link href={WEBSITE_CHECKOUT}>Checkout</Link>
                            </Button>
                        </div>
                    </SheetFooter>
                }
            </SheetContent>
        </Sheet>
    )
}

export default CartData