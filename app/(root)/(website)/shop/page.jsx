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
        </div>
    )
}

export default Shop