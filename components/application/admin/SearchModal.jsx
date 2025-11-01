import { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../../../components/ui/dialog'
import { Input } from '../../../components/ui/input'
import Link from 'next/link';
import searchData from '../../../lib/search';
import Fuse from 'fuse.js';


const fuseoption = {
    keys: [
        'keywords'
    ]
}
const searchingData = new Fuse(searchData, fuseoption)
const SearchModal = ({ open, setOpen }) => {
    const [query, setQuery] = useState('');
    return (
        <Dialog open={open} onOpenChange={() => setOpen(!open)}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Quick Search</DialogTitle>
                    <DialogDescription>search here any comp</DialogDescription>
                </DialogHeader>
                <Input className={'shadow-gray-400'} placeholder='Search...' value={query} autoFocus onChange={(e) => setQuery(e.target.value)} />
                <ul className='max-h-60 overflow-y-auto'>
                    {query && searchingData.search(query).length > 0 ? searchingData.search(query).map(({ item }, idx) => (
                        <li key={idx}>
                            <Link href={item?.url} className='block py-2 px-3 rounded hover:bg-muted'>
                                <h4>{item?.label}</h4>
                                <p className='text-sm text-muted-foreground'>{item?.description}</p>
                            </Link>
                        </li>
                    ))
                        : <h4 className='text-center text-muted-foreground select-none'>No {query} Search Found</h4>
                    }
                </ul>
            </DialogContent>
        </Dialog>
    )
}

export default SearchModal