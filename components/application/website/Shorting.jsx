import { Button } from '../../../components/ui/button'
import React from 'react'

const Shorting = ({ limit, setLimit, sorting, setSorting }) => {
    return (
        <div className='flex items-center justify-between flex-wrap gap-2 p-4 bg-gray-50'>
            <ul className='flex items-center gap-4'>
                <li className='font-semibold'>Show</li>
                {
                    [13, 44,35, 41, 43, 4, 23].map((limitNumber, idx) => (
                        <li key={idx}>
                            <Button type='button' className={limitNumber === limit ? 'w-8 h-8 flex justify-center items-center rounded-full border bg-primary text-sm text-white' : 'cursor-pointer '} variant={'ghost'} onClick={()=>setLimit(limitNumber)}>{limitNumber}</Button>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

export default Shorting