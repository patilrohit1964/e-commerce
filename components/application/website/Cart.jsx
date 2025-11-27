import { ShoppingCart } from 'lucide-react'
import React from 'react'
import { useSelector } from 'react-redux'

const Cart = () => {
    const { cartItems } = useSelector(state => state?.cartStore)
    console.log('cartItems.length',cartItems);
    return (
        <div className='relative'>
            <button type='button'>
                <ShoppingCart className='text-gray-500 hover:text-primary cursor-pointer' />
            </button>
            {
                cartItems?.length > 0 &&
                <div className='h-4 w-4 absolute -right-3 -top-2 rounded-full bg-red-600 text-white flex justify-center items-center p-1 text-sm'>1</div>
            }
        </div>
    )
}

export default Cart