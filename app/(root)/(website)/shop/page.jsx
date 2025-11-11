import Filter from '../../../../components/application/website/Filter';
import WebsiteBreadCrumb from '../../../../components/application/website/WebsiteBreadCrumb';
import { WEBSITE_SHOP } from '../../../../routes/websiteRoute';

const breadCrumb = {
    title: 'Shop',
    links: [
        { label: 'Shop', href: WEBSITE_SHOP }
    ]
}
const Shop = () => {
    return (
        <div>
            <WebsiteBreadCrumb props={breadCrumb} />
            <section className='lg:flex lg:px-32 px-4 my-20'>
                <div className='w-72 me-4 '>
                    <div className='sticky top-0 bg-gray-50 p-4 rounded'>
                        <Filter />
                    </div>
                </div>
                <div></div>
            </section>
        </div>
    )
}

export default Shop