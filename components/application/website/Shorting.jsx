import { ListFilter } from 'lucide-react'
import { Button } from '../../../components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../components/ui/select'
import { sortings } from '../../../lib/utils'

const Shorting = ({ limit, setLimit, sorting, setSorting, mobileFilterOpen, setMobileFilterOpen }) => {
    return (
        <div className='flex items-center justify-between flex-wrap gap-2 p-4 bg-gray-50'>
            <Button type='button' className={'lg:hidden'} variant={'outline'} onClick={() => setMobileFilterOpen(!mobileFilterOpen)}>Filter <ListFilter size={20} /></Button>
            <ul className='flex items-center gap-4'>
                <li className='font-semibold'>Show</li>
                {
                    [9, 12, 18, 24]?.map((limitNumber, idx) => (
                        <li key={idx}>
                            <Button type='button' className={limitNumber === limit ? 'w-8 h-8 flex justify-center items-center rounded-full border bg-primary text-sm text-white cursor-pointer' : 'cursor-pointer border border-gray-300 rounded-full w-8 h-8'} variant={'ghost'} onClick={() => setLimit(limitNumber)}>{limitNumber}</Button>
                        </li>
                    ))
                }
            </ul>
            <Select value={sorting} onValueChange={(val) => setSorting(val)}>
                <SelectTrigger className="md:w-[180px] w-full bg-white">
                    <SelectValue placeholder="Default Sorting" />
                </SelectTrigger>
                <SelectContent>
                    {
                        sortings?.map(sort => (
                            <SelectItem key={sort?.value} value={sort?.value}>{sort?.label}</SelectItem>
                        ))
                    }
                </SelectContent>
            </Select>
        </div>
    )
}

export default Shorting