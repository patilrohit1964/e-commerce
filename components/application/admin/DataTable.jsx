import { Button } from '@/components/ui/button'
import { useDeleteMutation } from '@/hooks/useDeleteMutation'
import { showToast } from '@/lib/toast'
import { Delete, DeleteForever, Download, Recycling, RestoreFromTrash } from '@mui/icons-material'
import { IconButton, Tooltip } from '@mui/material'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { download, generateCsv, mkConfig } from 'export-to-csv'
import { MaterialReactTable, MRT_ShowHideColumnsButton, MRT_ToggleDensePaddingButton, MRT_ToggleFullScreenButton, MRT_ToggleGlobalFilterButton, useMaterialReactTable } from 'material-react-table'
import Link from 'next/link'
import { useState } from 'react'

const DataTable = ({ queryKey, fetchUrl, columnsConfig, initialPageSize = 10, exportEndPoint, deleteEndPoint, deleteType, trashView, createAction }) => {
    const [columnFilters, setColumnFilters] = useState([])
    const [globalFilter, setglobalFilter] = useState('')
    const [sorting, setSorting] = useState([])
    const [pagination, Setpagination] = useState({
        pageIndex: 0,
        pageSize: initialPageSize
    })
    // row selection state
    const [rowSelection, setRowSelection] = useState({})
    const [exportLoading, setExportLoading] = useState(false)
    // handle delete method
    const deleteMutation = useDeleteMutation(queryKey, deleteEndPoint)
    const handleDelete = (ids, deleteType) => {
        if (deleteType === 'PD') {
            if (confirm("Are You Sure Permentely Delete Media This Action Can't Undone")) {
                deleteMutation.mutate({ ids, deleteType })
                setRowSelection({})
            }
        } else if (deleteType == 'SD') {
            if (confirm("Are You Sure you want to move data into trash ?")) {
                deleteMutation.mutate({ ids, deleteType })
                setRowSelection({})
            }
        }
        else {
            deleteMutation.mutate({ ids, deleteType })
            setRowSelection({})
        }
    }
    const handleExport = async (selectedRows) => {
        setExportLoading(true)
        try {
            const csvConfig = mkConfig({
                fieldSeparator: ',',
                decimalSeparator: '.',
                useKeysAsHeaders: true,
                filename: 'csv-data'
            }) //download data in csv
            let csv
            if (Object.keys(rowSelection)?.length > 0) {
                // export only selected rows 
                const rowdata = selectedRows.map((row) => row.original);
                csv = generateCsv(csvConfig)(rowdata);
            } else {
                // export all data
                const { data: responce } = await axios.get(exportEndPoint)
                if (!responce.success) {
                    throw new Error(responce.message)
                }
                const rowData = responce.data
                csv = generateCsv(csvConfig)(rowData);
            }
            download(csvConfig)(csv)
        }
        catch (error) {
            console.log(error)
            showToast('error', error?.message)
        } finally {
            setExportLoading(false)
        }

    };


    // data fetcing logics
    const { data = { data: [], meta: {} }, isError, isRefetching, isLoading } = useQuery({
        queryKey: [queryKey, { columnFilters, globalFilter, pagination, sorting }],
        queryFn: async () => {
            const url = new URL(fetchUrl, process.env.NEXT_PUBLIC_BASE_URL)
            url.searchParams.set('start', `${pagination.pageIndex * pagination.pageSize}`);
            url.searchParams.set('size', `${pagination.pageSize}`);
            url.searchParams.set('filters', JSON.stringify(columnFilters ?? []));
            url.searchParams.set('globalFilter', globalFilter ?? '');
            url.searchParams.set('sorting', JSON.stringify(sorting ?? []));
            url.searchParams.set('deleteType', deleteType);
            const { data: responce } = await axios.get(url.href)
            return responce
        },
        placeholderData: keepPreviousData
    })
    //init table
    const table = useMaterialReactTable({
        columns: columnsConfig,
        data: data?.data,
        enableRowSelection: true,
        columnFilterDisplayMode: 'popover',
        paginationDisplayMode: 'pages',
        enableColumnOrdering: true,
        enableStickyHeader: true,
        enableStickyFooter: true,
        initialState: { showColumnFilters: true },
        manualFiltering: true,
        manualPagination: true,
        manualSorting: true,
        muiToolbarAlertBannerProps: isError ? { color: 'error', children: 'error loading data' } : undefined,
        onShowColumnFiltersChange: setColumnFilters,
        onGlobalFilterChange: setglobalFilter,
        onPaginationChange: Setpagination,
        onSortingChange: setSorting,
        rowCount: data?.meta?.totalRowCount ?? 0,
        onRowSelectionChange: setRowSelection,
        state: {
            columnFilters,
            globalFilter,
            isLoading,
            pagination,
            showAlertBanner: isError,
            showProgressBars: isRefetching,
            sorting,
            rowSelection
        },
        getRowId: (originalRow) => originalRow?._id,//for add manually id,
        renderToolbarInternalActions: ({ table }) => {
            return (<>
                {/* builtins buttons */}
                <MRT_ToggleGlobalFilterButton table={table} />
                <MRT_ShowHideColumnsButton table={table} />
                <MRT_ToggleFullScreenButton table={table} />
                <MRT_ToggleDensePaddingButton table={table} />

                {deleteType !== "PD" &&
                    <>
                        <Tooltip title="Restore Data">
                            <Link href={trashView}>
                                <IconButton >
                                    <Recycling />
                                </IconButton>
                            </Link>
                        </Tooltip>
                    </>
                }

                {deleteType === "SD" &&
                    <>
                        <Tooltip title="Delete All">
                            <IconButton disabled={!table?.getIsSomeRowsSelected() && !table?.getIsAllRowsSelected()} onClick={() => handleDelete(Object.keys(rowSelection), deleteType)}>
                                <Delete />
                            </IconButton>
                        </Tooltip>
                    </>
                }
                
                {deleteType === "PD" &&
                    <>
                        <Tooltip title="Restore Data">
                            <IconButton disabled={!table?.getIsSomeRowsSelected() && !table?.getIsAllRowsSelected()} onClick={() => handleDelete(Object.keys(rowSelection), deleteType)}>
                                <RestoreFromTrash />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Permanently Delete Data">
                            <IconButton disabled={!table?.getIsSomeRowsSelected() && !table?.getIsAllRowsSelected()} onClick={() => handleDelete(Object.keys(rowSelection), deleteType)}>
                                <DeleteForever />
                            </IconButton>
                        </Tooltip>
                    </>
                }
            </>)
        },
        enableRowActions: true, //add custom action
        positionActionsColumn: 'last', //set custom action position
        renderRowActionMenuItems: ({ row }) => createAction(row, deleteType, handleDelete), //take action on custom action like crud
        renderTopToolbarCustomActions: ({ table }) => {
            return (<Tooltip>
                {/* <ButtonLoading type={'button'} text={<><Download /> Export</>} loading={exportLoading} onClick={() => handleExport(table?.getSelectedRowModel().rows)}  /> */}
                <Button type={'button'} disabled={table?.getSelectedRowModel().rows?.length === 0} onClick={() => handleExport(table?.getSelectedRowModel().rows)} >
                    <Download /> Export
                </Button>
            </Tooltip>)
        }
    })
    return (
        <MaterialReactTable table={table} />
    )
}

export default DataTable