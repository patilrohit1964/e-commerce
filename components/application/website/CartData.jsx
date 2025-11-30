import { Label } from '../../../components/ui/label'
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from '../../../components/ui/sheet'

import React from 'react'
import { Input } from '../../../components/ui/input'
import { Button } from '../../../components/ui/button'
import { CartItems } from './CartItems'
import { useSelector } from 'react-redux'

const CartData = ({ open, setOpen, cartItems }) => {
    // set cart data and focus on cart state management
    const { cartItems:cartData } = useSelector(state => state?.cartStore)
    return (
        <Sheet open={open} onOpenChange={() => setOpen(false)}>
            <SheetContent side='right' className={'px-2'}>
                <SheetHeader>
                    <SheetTitle className={'border-b'}>Add To Cart Items</SheetTitle>
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
                        <Button variant={'outline'} className={'border border-gray-400 cursor-pointer'} size={'lg'}>View Cart</Button>
                        <Button size={'lg'} className={'cursor-pointer'}>Checkotut</Button>
                    </div>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}

export default CartData