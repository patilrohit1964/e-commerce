import { Search } from 'lucide-react'
import { Input } from '../../../components/ui/input'
import SearchModal from './SearchModal'
import { useState } from 'react'

const AdminSearch = () => {
    const [open, setOpen] = useState(false)
    return (
        <div className='md:w-[350px]'>
            <div className='flex justify-between items-center relative md:left-64'>
                <Input readOnly className="rounded-full cursor-pointer" placeholder='Search...' onClick={() => setOpen(true)} />
                <button type='button' className='absolute right-3 cursor-default'>
                    <Search />
                </button>
            </div>
            <SearchModal open={open} setOpen={setOpen} />
        </div>
    )
}

export default AdminSearch