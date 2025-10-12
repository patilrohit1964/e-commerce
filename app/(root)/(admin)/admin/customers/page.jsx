'use client'
import { useCallback, useMemo } from "react"
import BreadCrumb from "../../../../../components/application/admin/BreadCrumb"
import DataTableWrapper from "../../../../../components/application/admin/DataTableWrapper"
import DeleteAction from "../../../../../components/application/admin/DeleteAction"
import { Card, CardContent, CardHeader } from "../../../../../components/ui/card"
import { DT_CUSTOMER_COLUMN } from "../../../../../lib/column"
import { columnConfig } from "../../../../../lib/helper"
import { ADMIN_DASHBOARD, ADMIN_TRASH } from "../../../../../routes/adminPaneRoute"

const breadCrumbData = [
    {
        label: "Home",
        href: ADMIN_DASHBOARD,
    },
    {
        label: "Customers",
        href: '',
    }
]
const ShowCustomers = () => {
    const columns = useMemo(() => {
        return columnConfig(DT_CUSTOMER_COLUMN)
    }, [])
    const action = useCallback((row, deleteType, handleDelete) => {
        let actionMenu = []
        actionMenu.push(<DeleteAction key={'delete'} handleDelete={handleDelete} row={row} deleteType={deleteType} />)
        return actionMenu
    }, [])
    return (
        <div>
            <BreadCrumb breadcrumbData={breadCrumbData} />
            <Card className={'py-0 rounded shadow-sm'}>
                <CardHeader className={'pt-3 px-3 border-b [.border-b]:pb-2 flex justify-between'}>
                    <h4 className='text-2xl font-semibold'>Show Customers</h4>
                </CardHeader>
                <CardContent className={'pb-5 px-0'}>
                    <DataTableWrapper
                        queryKey={'customers-data'}
                        fetchUrl={'/api/customer'}
                        initialPageSize={10}
                        columnsConfig={columns}
                        exportEndPoint={'/api/customer/export'}
                        deleteEndPoint={'/api/customer/delete'}
                        deleteType={"SD"}
                        trashView={`${ADMIN_TRASH}?trashof=customer`}
                        createAction={action}
                    />
                </CardContent>
            </Card>
        </div>
    )
}

export default ShowCustomers