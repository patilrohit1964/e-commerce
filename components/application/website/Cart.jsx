import { ShoppingCart } from 'lucide-react'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import CartData from './CartData'

const Cart = () => {
    const { cartItems } = useSelector(state => state?.cartStore)
    const [open, setOpen] = useState(false)
    console.log('cartItems.length', cartItems);
    return (
        <div className='relative'>
            <button type='button' onClick={() => setOpen(true)}>
                <ShoppingCart className='text-gray-500 hover:text-primary cursor-pointer' />
            </button>
            {
                cartItems?.length > 0 &&
                <div className='h-4 w-4 absolute -right-3 -top-2 rounded-full bg-red-600 text-white flex justify-center items-center p-1 text-sm'>{cartItems?.length}</div>
            }
            {
                open && <CartData open={open} setOpen={setOpen} cartItems={cartItems} />
            }
        </div>
    )
}

export default Cart