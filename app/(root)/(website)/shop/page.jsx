'use client'
import { ListFilter } from 'lucide-react';
import { useState } from 'react';
import Filter from '../../../../components/application/website/Filter';
import Shorting from '../../../../components/application/website/Shorting';
import WebsiteBreadCrumb from '../../../../components/application/website/WebsiteBreadCrumb';
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '../../../../components/ui/sheet';
import useWindowSize from '../../../../hooks/useWindowSize';
import { WEBSITE_SHOP } from '../../../../routes/websiteRoute';
import axios from 'axios';
import { useSearchParams } from 'next/navigation';

const breadCrumb = {
    title: 'Shop',
    links: [
        { label: 'Shop', href: WEBSITE_SHOP }
    ]
}
const Shop = () => {
    const searchParams = useSearchParams().toString();
    const [limit, setLimit] = useState(0);
    const [sorting, setSorting] = useState('');
    const [isMobileFilter, setMobileFilter] = useState(false);
    const windowSize = useWindowSize();
    const fetchProductData = async (pageParam) => {
        const { data: getProduct } = await axios.get(`/api/shop?page=${pageParam}&limit=${limit}&sort=${sorting}&${searchParams}`)
        console.log(getProduct)
    }
    fetchProductData(0)
    return (
        <div>
            <WebsiteBreadCrumb props={breadCrumb} />
            <section className='lg:flex lg:px-32 px-4 my-20'>
                {
                    windowSize.width > 1024 ?
                        <div className='w-72 me-4 '>
                            <div className='sticky top-0 bg-gray-50 p-4 rounded'>
                                <Filter />
                            </div>
                        </div> :
                        <Sheet open={isMobileFilter} onOpenChange={() => setMobileFilter(false)}>
                            <SheetContent side='left' className={'overflow-auto block'}>
                                <SheetHeader className={'border-b'}>
                                    <SheetTitle>Filters</SheetTitle>
                                    <SheetDescription>
                                        You can filter anything
                                    </SheetDescription>
                                </SheetHeader>
                                <div className="p-4">
                                    <Filter />
                                </div>
                            </SheetContent>
                        </Sheet>
                }
                <div className='lg:w-[calc(100%-18rem)]'>
                    <Shorting limit={limit} setLimit={setLimit} sorting={sorting} setSorting={setSorting} mobileFilterOpen={isMobileFilter} setMobileFilterOpen={setMobileFilter} />
                </div>
            </section>
        </div>
    )
}

export default Shop