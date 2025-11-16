'use client'
import { useState } from 'react';
import Filter from '../../../../components/application/website/Filter';
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '../../../../components/ui/sheet';
import Shorting from '../../../../components/application/website/Shorting';
import WebsiteBreadCrumb from '../../../../components/application/website/WebsiteBreadCrumb';
import useWindowSize from '../../../../hooks/useWindowSize';
import { WEBSITE_SHOP } from '../../../../routes/websiteRoute';

const breadCrumb = {
    title: 'Shop',
    links: [
        { label: 'Shop', href: WEBSITE_SHOP }
    ]
}
const Shop = () => {
    const [limit, setLimit] = useState(0);
    const [sorting, setSorting] = useState('');
    const windowSize = useWindowSize();
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
                        <Sheet>
                            <SheetTrigger>Open</SheetTrigger>
                            <SheetContent side='left'>
                                <SheetHeader>
                                    <SheetTitle>Are you absolutely sure?</SheetTitle>
                                    <SheetDescription>
                                        This action cannot be undone. This will permanently delete your account
                                        and remove your data from our servers.
                                    </SheetDescription>
                                </SheetHeader>
                            </SheetContent>
                        </Sheet>
                }
                <div className='lg:w-[calc(100%-18rem)]'>
                    <Shorting limit={limit} setLimit={setLimit} sorting={sorting} setSorting={setSorting} />
                </div>
            </section>
        </div>
    )
}

export default Shop