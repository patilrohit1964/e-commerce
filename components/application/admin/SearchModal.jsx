import Fuse from 'fuse.js';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../../../components/ui/dialog';
import { Input } from '../../../components/ui/input';
import searchData from '../../../lib/search';


const SearchModal = ({ open, setOpen }) => {
    const fuseoption = {
        keys: ['keywords', 'description', 'label'],
        threshold: 0.3 //this is imp if you want strictly search
    }
    const [query, setQuery] = useState('');
    const searchResult = useMemo(() => {
        const searchingData = new Fuse(searchData, fuseoption)
        return searchingData;
    }, [query])
    return (
        <Dialog open={open} onOpenChange={() => setOpen(!open)}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Quick Search</DialogTitle>
                    <DialogDescription>search here any comp</DialogDescription>
                </DialogHeader>
                <Input className={'shadow-gray-400'} placeholder='Search...' value={query} autoFocus onChange={(e) => setQuery(e.target.value)} />
                <ul className='max-h-60 overflow-y-auto'>
                    {query && searchResult.search(query).length > 0 ? searchResult.search(query).map(({ item }, idx) => (
                        <li
                            key={idx}
                            onClick={() => {
                                setOpen(false)
                                setQuery('')
                            }}>
                            <Link href={item?.url} className='block py-2 px-3 rounded hover:bg-muted'>
                                <h4>{item?.label}</h4>
                                <p className='text-sm text-muted-foreground'>{item?.description}</p>
                            </Link>
                        </li>
                    ))
                        :
                        <h4 className='text-center text-muted-foreground select-none'>
                            {query.length >= 1 ?
                                `No ${query} Search Found`
                                : 'Search using above input'
                            }
                        </h4>
                    }
                </ul>
            </DialogContent>
        </Dialog>
    )
}

export default SearchModal