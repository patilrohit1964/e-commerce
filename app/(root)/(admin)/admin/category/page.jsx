import DataTableWrapper from "@/components/application/admin/DataTableWrapper"
import DeleteAction from "@/components/application/admin/DeleteAction"
import EditAction from "@/components/application/admin/EditAction"
import { Breadcrumb } from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { DT_CATEGORY_COLUMN } from "@/lib/column"
import { columnConfig } from "@/lib/helper"
import { ADMIN_CATEGORY_ADD, ADMIN_CATEGORY_EDIT, ADMIN_CATEGORY_SHOW, ADMIN_DASHBOARD, ADMIN_TRASH } from "@/routes/adminPaneRoute"
import { FilePlus } from "lucide-react"
import Link from "next/link"
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
    label: "Edit Category",
    href: "",
  },
]
const ShowCategory = () => {
  const columns = useMemo(() => {
    return columnConfig(DT_CATEGORY_COLUMN)
  }, [])
  const action = useCallback((row, deleteType, handleDelete) => {
    let actionMenu = []
    actionMenu.push(<EditAction key={'edit'} href={ADMIN_CATEGORY_EDIT(row?.original?._id)} />)
    actionMenu.push(<DeleteAction key={'delete'} handleDelete={handleDelete} row={row} deleteType={deleteType} />)
    return actionMenu
  }, [])
  return (
    <div>
      <Breadcrumb breadcrumbData={breadCrumbData} />
      <Card className={'py-0 rounded shadow-sm'}>
        <CardHeader className={'pt-3 px-3 border-b [.border-b]:pb-2 flex justify-between'}>
          <h4 className='text-2xl font-semibold'>Show Category</h4>
          <Button asChild>
            <Link href={ADMIN_CATEGORY_ADD}>
              <FilePlus />
              New Category
            </Link>
          </Button>
        </CardHeader>
        <CardContent className={'pb-5'}>
          <DataTableWrapper
            queryKey={'category-data'}
            fetchUrl={'/api/category'}
            initialPageSize={10}
            columnsConfig={columns}
            exportEndPoint={'/api/category/export'}
            deleteEndPoint={'/api/category/delete'}
            deleteType={"SD"}
            trashView={`${ADMIN_TRASH}?trashof=category`}
            createAction={action}
          />
        </CardContent>
      </Card>
    </div>
  )
}

export default ShowCategory