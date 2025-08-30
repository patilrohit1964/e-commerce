import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator
} from "@/components/ui/breadcrumb"

const BreadCrumb = ({ breadcrumbData }) => {
    return (
        <Breadcrumb className='mb-5'>
            <BreadcrumbList>
                {
                    breadcrumbData?.length && breadcrumbData?.map((el, idx) => (
                        <div key={idx} className='flex items-center'>
                            <BreadcrumbItem key={idx}>
                                <BreadcrumbLink href={el.href}>{el.label}</BreadcrumbLink>
                            </BreadcrumbItem>
                            {idx !== breadcrumbData?.length - 1 && <BreadcrumbSeparator className={'ml-2'} />}
                        </div>
                    ))
                }
            </BreadcrumbList>
        </Breadcrumb>
    )
}

export default BreadCrumb