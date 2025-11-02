import { ShoppingCart } from 'lucide-react'
import React from 'react'

const Cart = () => {
    return (
        <button type='button'>
            <ShoppingCart className='text-gray-500 hover:text-primary cursor-pointer' />
        </button>
    )
}

export default Cart