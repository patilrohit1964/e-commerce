import { Button } from '../../../components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../components/ui/select'
import { sortings } from '../../../lib/utils'

const Shorting = ({ limit, setLimit, sorting, setSorting, mobileFilterOpen, setMobileFilterOpen }) => {
    return (
        <div className='flex items-center justify-between flex-wrap gap-2 p-4 bg-gray-50'>
            <ul className='flex items-center gap-4'>
                <li className='font-semibold'>Show</li>
                {
                    [13, 44, 35, 41, 43,]?.map((limitNumber, idx) => (
                        <li key={idx}>
                            <Button type='button' className={limitNumber === limit ? 'w-8 h-8 flex justify-center items-center rounded-full border bg-primary text-sm text-white' : 'cursor-pointer '} variant={'ghost'} onClick={() => setLimit(limitNumber)}>{limitNumber}</Button>
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