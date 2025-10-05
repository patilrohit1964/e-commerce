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
import { DT_PRODUCT_COLUMN } from "../../../../../lib/column"
import { columnConfig } from "../../../../../lib/helper"
import { ADMIN_CATEGORY_SHOW, ADMIN_DASHBOARD, ADMIN_PRODUCT_ADD, ADMIN_PRODUCT_EDIT, ADMIN_TRASH } from "../../../../../routes/adminPaneRoute"

const breadCrumbData = [
  {
    label: "Home",
    href: ADMIN_DASHBOARD,
  },
  {
    label: "Product",
    href: ADMIN_CATEGORY_SHOW,
  }
]
const ShowCoupon = () => {
  const columns = useMemo(() => {
    return columnConfig(DT_PRODUCT_COLUMN)
  }, [])
  const action = useCallback((row, deleteType, handleDelete) => {
    let actionMenu = []
    actionMenu.push(<EditAction key={'edit'} href={ADMIN_PRODUCT_EDIT(row?.original?._id)} />)
    actionMenu.push(<DeleteAction key={'delete'} handleDelete={handleDelete} row={row} deleteType={deleteType} />)
    return actionMenu
  }, [])
  return (
    <div>
      <BreadCrumb breadcrumbData={breadCrumbData} />
      <Card className={'py-0 rounded shadow-sm'}>
        <CardHeader className={'pt-3 px-3 border-b [.border-b]:pb-2 flex justify-between'}>
          <h4 className='text-2xl font-semibold'>Show Product</h4>
          <Button asChild>
            <Link href={ADMIN_PRODUCT_ADD}>
              <FilePlus />
              New Product
            </Link>
          </Button>
        </CardHeader>
        <CardContent className={'pb-5 px-0'}>
          <DataTableWrapper
            queryKey={'product-data'}
            fetchUrl={'/api/product'}
            initialPageSize={10}
            columnsConfig={columns}
            exportEndPoint={'/api/product/export'}
            deleteEndPoint={'/api/product/delete'}
            deleteType={"SD"}
            trashView={`${ADMIN_TRASH}?trashof=product`}
            createAction={action}
          />
        </CardContent>
      </Card>
    </div>
  )
}

export default ShowCoupon