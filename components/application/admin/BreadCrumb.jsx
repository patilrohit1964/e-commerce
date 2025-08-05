import React from 'react'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

const BreadCrumb = ({ breadcrumbData }) => {
    return (
        <Breadcrumb className='mb-5'>
            <BreadcrumbList>
                {
                    breadcrumbData?.length && breadcrumbData?.map((el, idx) => (
                        <>
                            <BreadcrumbItem key={idx}>
                                <BreadcrumbLink href={el.href}>{el.label}</BreadcrumbLink>
                            </BreadcrumbItem>
                            {idx !== breadcrumbData.length - 1 && <BreadcrumbSeparator />}
                        </>
                    ))
                }
            </BreadcrumbList>
        </Breadcrumb>
    )
}

export default BreadCrumb