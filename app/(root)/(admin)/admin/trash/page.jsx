'use client'
import { useSearchParams } from "next/navigation"
import { useCallback, useMemo } from "react"
import BreadCrumb from "../../../../../components/application/admin/BreadCrumb"
import DataTableWrapper from "../../../../../components/application/admin/DataTableWrapper"
import DeleteAction from "../../../../../components/application/admin/DeleteAction"
import RestoreAction from "../../../../../components/application/admin/RestoreAction"
import { Card, CardContent, CardHeader } from "../../../../../components/ui/card"
import { DT_CATEGORY_COLUMN, DT_COUPON_VARIANT_COLUMN, DT_CUSTOMER_COLUMN, DT_PRODUCT_COLUMN, DT_PRODUCT_VARIANT_COLUMN, DT_REVIEW_COLUMN } from "../../../../../lib/column"
import { columnConfig } from "../../../../../lib/helper"
import { ADMIN_CATEGORY_SHOW, ADMIN_DASHBOARD, ADMIN_TRASH } from "../../../../../routes/adminPaneRoute"

const breadCrumbData = [
    {
        label: "Home",
        href: ADMIN_DASHBOARD,
    },
    {
        label: "Category",
        href: ADMIN_CATEGORY_SHOW,
    },
    {
        label: "Trash",
        href: ADMIN_TRASH,
    },
]
const TRASH_CONFIG = {
    category: {
        title: 'Category Trash',
        columns: DT_CATEGORY_COLUMN,
        fetchUrl: "/api/category",
        exportUrl: '/api/category/export',
        deleteUrl: '/api/category/delete'
    },
    product: {
        title: 'Product Trash',
        columns: DT_PRODUCT_COLUMN,
        fetchUrl: "/api/product",
        exportUrl: '/api/product/export',
        deleteUrl: '/api/product/delete'
    },
    'product-variant': {
        title: 'Product Variant Trash',
        columns: DT_PRODUCT_VARIANT_COLUMN,
        fetchUrl: "/api/product-variant",
        exportUrl: '/api/product-variant/export',
        deleteUrl: '/api/product-variant/delete'
    },
    coupon: {
        title: 'Coupon Trash',
        columns: DT_COUPON_VARIANT_COLUMN,
        fetchUrl: "/api/coupon",
        exportUrl: '/api/coupon/export',
        deleteUrl: '/api/coupon/delete'
    },
    customer: {
        title: 'Customer Trash',
        columns: DT_CUSTOMER_COLUMN,
        fetchUrl: "/api/customer",
        exportUrl: '/api/customer/export',
        deleteUrl: '/api/customer/delete'
    },
    review: {
        title: 'Review Trash',
        columns: DT_REVIEW_COLUMN,
        fetchUrl: "/api/review",
        exportUrl: '/api/review/export',
        deleteUrl: '/api/review/delete'
    }
}
const Trash = () => {
    const searchParams = useSearchParams()
    const trashOf = searchParams.get('trashof')
    const config = TRASH_CONFIG[trashOf]
    const columns = useMemo(() => {
        return columnConfig(config?.columns, false, false, true)
    }, [])
    const action = useCallback((row, deleteType, handleDelete) => {
        return [
            <DeleteAction key={'delete'} handleDelete={handleDelete} row={row} deleteType={deleteType} />,
            <RestoreAction key={'restore'} handleRestore={handleDelete} row={row} deleteType={"RSD"} />
        ]
    }, [])
    return (
        <div>
            <BreadCrumb breadcrumbData={breadCrumbData} />
            <Card className={'py-0 rounded shadow-sm'}>
                <CardHeader className={'pt-3 px-3 border-b [.border-b]:pb-2 flex justify-between'}>
                    <h4 className='text-2xl font-semibold'>{config?.title}</h4>
                </CardHeader>
                <CardContent className={'pb-5 px-0'}>
                    <DataTableWrapper
                        queryKey={`${trashOf}-data-deleted`}
                        fetchUrl={config?.fetchUrl}
                        initialPageSize={10}
                        columnsConfig={columns}
                        exportEndPoint={config?.exportUrl}
                        deleteEndPoint={config?.deleteUrl}
                        deleteType={"PD"}
                        createAction={action}
                    />
                </CardContent>
            </Card>
        </div>
    )
}

export default Trash