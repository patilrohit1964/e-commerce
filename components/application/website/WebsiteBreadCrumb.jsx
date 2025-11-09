import Link from 'next/link';
import { WEBSITE_HOME } from '../../../routes/websiteRoute';

const WebsiteBreadCrumb = ({props}) => {
    return (
        <div className={`py-10 flex justify-center items-center bg-cover bg-center`}>
            <div>
                <h1 className='text-2xl font-semibold mb-2 text-center'>{props?.title}</h1>
                <ul className='flex gap-2 justify-center'>
                    <li><Link href={WEBSITE_HOME} className='font-semibold'>Home</Link></li>
                    {props.links.map((link, idx) => (
                        <li>
                            <span className='me-1'>/</span>
                            {link?.href ? <Link href={link?.href}>{link?.label}</Link> : <span>{link?.label}</span>}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default WebsiteBreadCrumb