import { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../../../components/ui/dialog'
import { Input } from '../../../components/ui/input'
import Link from 'next/link';

const SearchModal = ({ open, setOpen }) => {
    const [query, setQuery] = useState('');
    return (
        <Dialog open={open} onOpenChange={() => setOpen(!open)}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Quick Search</DialogTitle>
                    <DialogDescription>search here any comp</DialogDescription>
                </DialogHeader>
                <Input placeholder='Search...' value={query} autofocus onChange={(e) => setQuery(e.target.value)} />
                <ul className='mt-4 max-h-60 overflow-y-auto'>
                    <li>
                        <Link href={''} className='block py-2 px-3 rounded hover:bg-muted'>
                            <h4>Title</h4>
                            <p className='text-sm text-muted-foreground'>Lorem ipsum dolor sit amet.</p>
                        </Link>
                    </li>
                </ul>
            </DialogContent>
        </Dialog>
    )
}

export default SearchModal