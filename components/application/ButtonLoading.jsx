import React from 'react'
import { Button } from '../ui/button'
import { Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

const ButtonLoading = ({ type, text, loading, className, onClick, ...props }) => {
    return (
        <Button type={type} disabled={loading} {...props} className={cn('', className)} onClick={onClick}>
            {loading &&
                <Loader2 className='animate-spin' />
            }
            {text}
        </Button>
    )
}

export default ButtonLoading