'use client'
import Shorting from '../../../../components/application/website/Shorting';
import Filter from '../../../../components/application/website/Filter';
import WebsiteBreadCrumb from '../../../../components/application/website/WebsiteBreadCrumb';
import { WEBSITE_SHOP } from '../../../../routes/websiteRoute';
import { useState } from 'react';

const breadCrumb = {
    title: 'Shop',
    links: [
        { label: 'Shop', href: WEBSITE_SHOP }
    ]
}
const Shop = () => {
    const [limit, setLimit] = useState(0);
    return (
        <div>
            <WebsiteBreadCrumb props={breadCrumb} />
            <section className='lg:flex lg:px-32 px-4 my-20'>
                <div className='w-72 me-4 '>
                    <div className='sticky top-0 bg-gray-50 p-4 rounded'>
                        <Filter />
                    </div>
                </div>
                <div className='lg:w-[calc(100%-18rem)]'>
                    <Shorting limit={limit} setLimit={setLimit} />
                </div>
            </section>
        </div>
    )
}

export default Shop