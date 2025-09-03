'use client'
import BreadCrumb from "@/components/application/admin/BreadCrumb"
import DataTableWrapper from "@/components/application/admin/DataTableWrapper"
import DeleteAction from "@/components/application/admin/DeleteAction"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { DT_CATEGORY_COLUMN } from "@/lib/column"
import { columnConfig } from "@/lib/helper"
import { ADMIN_CATEGORY_SHOW, ADMIN_DASHBOARD, ADMIN_TRASH } from "@/routes/adminPaneRoute"
import { useSearchParams } from "next/navigation"
import { useCallback, useMemo } from "react"

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
    }
}
const Trash = () => {
    const searchParams = useSearchParams()
    const trashOf = searchParams.get('trashof')
    const config = TRASH_CONFIG[trashOf]
    const columns = useMemo(() => {
        return columnConfig(config.columns, false, false, true)
    }, [])
    const action = useCallback((row, deleteType, handleDelete) => {
        return [<DeleteAction key={'delete'} handleDelete={handleDelete} row={row} deleteType={deleteType} />]
    }, [])
    return (
        <div>
            <BreadCrumb breadcrumbData={breadCrumbData} />
            <Card className={'py-0 rounded shadow-sm'}>
                <CardHeader className={'pt-3 px-3 border-b [.border-b]:pb-2 flex justify-between'}>
                    <h4 className='text-2xl font-semibold'>{config.title}</h4>
                </CardHeader>
                <CardContent className={'pb-5 px-0'}>
                    <DataTableWrapper
                        queryKey={`${trashOf}-data-deleted`}
                        fetchUrl={config.fetchUrl}
                        initialPageSize={10}
                        columnsConfig={columns}
                        exportEndPoint={config.exportUrl}
                        deleteEndPoint={config.deleteUrl}
                        deleteType={"PD"}
                        createAction={action}
                    />
                </CardContent>
            </Card>
        </div>
    )
}

export default Trash