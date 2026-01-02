'use client'
import { FilePlus } from "lucide-react"
import Link from "next/link"
import { useCallback, useMemo } from "react"
import BreadCrumb from "../../../../../components/application/admin/BreadCrumb"
import DataTableWrapper from "../../../../../components/application/admin/DataTableWrapper"
import DeleteAction from "../../../../../components/application/admin/DeleteAction"
import ViewAction from "../../../../../components/application/admin/ViewAction"
import { Button } from "../../../../../components/ui/button"
import { Card, CardContent, CardHeader } from "../../../../../components/ui/card"
import { DT_ORDER_COLUMN } from "../../../../../lib/column"
import { columnConfig } from "../../../../../lib/helper"
import { ADMIN_COUPON_ADD, ADMIN_DASHBOARD, ADMIN_ORDER__DETAILS, ADMIN_TRASH } from "../../../../../routes/adminPaneRoute"

const breadCrumbData = [
    {
        label: "Home",
        href: ADMIN_DASHBOARD,
    },
    {
        label: "Orders",
        href: '',
    }
]
const ShowOrders = () => {
    const columns = useMemo(() => {
        return columnConfig(DT_ORDER_COLUMN)
    }, [])
    const action = useCallback((row, deleteType, handleDelete) => {
        let actionMenu = []
        actionMenu.push(<ViewAction key={'edit'} href={ADMIN_ORDER__DETAILS(row?.original?.order_id)} />)
        actionMenu.push(<DeleteAction key={'delete'} handleDelete={handleDelete} row={row} deleteType={deleteType} />)
        return actionMenu
    }, [])
    return (
        <div>
            <BreadCrumb breadcrumbData={breadCrumbData} />
            <Card className={'py-0 rounded shadow-sm'}>
                <CardHeader className={'pt-3 px-3 border-b [.border-b]:pb-2 flex justify-between'}>
                    <h4 className='text-2xl font-semibold'>Show Orders</h4>
                </CardHeader>
                <CardContent className={'pb-5 px-0'}>
                    <DataTableWrapper
                        queryKey={'orders-data'}
                        fetchUrl={'/api/orders'}
                        initialPageSize={10}
                        columnsConfig={columns}
                        exportEndPoint={'/api/orders/export'}
                        deleteEndPoint={'/api/orders/delete'}
                        deleteType={"SD"}
                        trashView={`${ADMIN_TRASH}?trashof=orders`}
                        createAction={action}
                    />
                </CardContent>
            </Card>
        </div>
    )
}

export default ShowOrders