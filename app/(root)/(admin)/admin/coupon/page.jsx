'use client'
import { FilePlus } from "lucide-react"
import Link from "next/link"
import { useCallback, useMemo } from "react"
import BreadCrumb from "../../../../../components/application/admin/BreadCrumb"
import DataTableWrapper from "../../../../../components/application/admin/DataTableWrapper"
import DeleteAction from "../../../../../components/application/admin/DeleteAction"
import EditAction from "../../../../../components/application/admin/EditAction"
import { Button } from "../../../../../components/ui/button"
import { Card, CardContent, CardHeader } from "../../../../../components/ui/card"
import { DT_COUPON_VARIANT_COLUMN } from "../../../../../lib/column"
import { columnConfig } from "../../../../../lib/helper"
import { ADMIN_COUPON__EDIT, ADMIN_COUPON__SHOW, ADMIN_COUPON_ADD, ADMIN_DASHBOARD, ADMIN_TRASH } from "../../../../../routes/adminPaneRoute"

const breadCrumbData = [
  {
    label: "Home",
    href: ADMIN_DASHBOARD,
  },
  {
    label: "Coupon",
    href: ADMIN_COUPON__SHOW,
  }
]
const ShowCoupon = () => {
  const columns = useMemo(() => {
    return columnConfig(DT_COUPON_VARIANT_COLUMN)
  }, [])
  const action = useCallback((row, deleteType, handleDelete) => {
    let actionMenu = []
    actionMenu.push(<EditAction key={'edit'} href={ADMIN_COUPON__EDIT(row?.original?._id)} />)
    actionMenu.push(<DeleteAction key={'delete'} handleDelete={handleDelete} row={row} deleteType={deleteType} />)
    return actionMenu
  }, [])
  return (
    <div>
      <BreadCrumb breadcrumbData={breadCrumbData} />
      <Card className={'py-0 rounded shadow-sm'}>
        <CardHeader className={'pt-3 px-3 border-b [.border-b]:pb-2 flex justify-between'}>
          <h4 className='text-2xl font-semibold'>Show Coupons</h4>
          <Button asChild>
            <Link href={ADMIN_COUPON_ADD}>
              <FilePlus />
              New Coupon
            </Link>
          </Button>
        </CardHeader>
        <CardContent className={'pb-5 px-0'}>
          <DataTableWrapper
            queryKey={'coupon-data'}
            fetchUrl={'/api/coupon'}
            initialPageSize={10}
            columnsConfig={columns}
            exportEndPoint={'/api/coupon/export'}
            deleteEndPoint={'/api/coupon/delete'}
            deleteType={"SD"}
            trashView={`${ADMIN_TRASH}?trashof=coupon`}
            createAction={action}
          />
        </CardContent>
      </Card>
    </div>
  )
}

export default ShowCoupon