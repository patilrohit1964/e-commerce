'use client'
import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import Loading from '../../../../components/application/Loading';
import Filter from '../../../../components/application/website/Filter';
import ProductBox from '../../../../components/application/website/ProductBox';
import Shorting from '../../../../components/application/website/Shorting';
import WebsiteBreadCrumb from '../../../../components/application/website/WebsiteBreadCrumb';
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle
} from '../../../../components/ui/sheet';
import useWindowSize from '../../../../hooks/useWindowSize';
import { WEBSITE_SHOP } from '../../../../routes/websiteRoute';
import ButtonLoading from '../../../../components/application/ButtonLoading';

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
        if (!getProduct.success) {
            return
        }
        return getProduct?.data
    }
    const { error, data, isFetching, fetchNextPage, hasNextPage } = useInfiniteQuery({
        queryKey: ['products', limit, sorting, searchParams], //this is dependancy this work when any of change from this 
        queryFn: async ({ pageParam }) => await fetchProductData(pageParam),
        initialPageParam: 0,
        getNextPageParam: (lastPage) => {
            return lastPage.nextPage
        }
    })
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
                    {
                        isFetching && <div className='p-3 text-center font-semibold'><Loading /></div>
                    }
                    {
                        isFetching && <div className='p-3 text-center font-semibold'>{error?.message}</div>
                    }
                    <div className='grid lg:grid-cols-3 grid-cols-2 lg:gap-10 gap-5'>
                        {data?.pages?.map((page) => (
                            page?.products?.map(product => (
                                <ProductBox key={product?._id} product={product} />
                            ))
                        ))}
                    </div>
                    {/* load more button */}
                    <div className='flex justify-center items-center mt-3'>
                        {hasNextPage ?
                            <ButtonLoading type={'button'} loading={isFetching} className={'cursor-pointer'} text={'Load More'} onClick={fetchNextPage} />
                            :
                            <>
                                {!isFetching && <span>No more data for load.</span>}
                            </>
                        }
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Shop