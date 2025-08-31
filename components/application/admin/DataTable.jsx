import { useQuery } from '@tanstack/react-query'
import React, { useState } from 'react'

const DataTable = ({ queryKey, fetchUrl, columnsConfig, initialPageSize = 10, exportEndPoint, deleteEndPoint, deleteType, trashView, createAction }) => {
    const [columnFilters, setColumnFilters] = useState([])
    const [globalFilter, setglobalFilter] = useState('')
    const [sorting, setSorting] = useState([])
    const [pagination, Setpagination] = useState({
        pageIndex: 0,
        pageSize: initialPageSize
    })

    // data fetcing logics
    const { data: { data: [], meta } = {}, isError, isRefetching, isLoading } = useQuery({
        queryKey: [queryKey, { columnFilters, globalFilter, pagination, sorting }],
        queryFn: async () => {
            const url = new URL(fetchUrl, process.env.NEXT_PUBLIC_BASE_URL)
            url.searchParams.set('start', `${pagination.pageIndex * pagination.pageSize}`);
            url.searchParams.set('size', `${pagination.pageSize}`);
            url.searchParams.set('filters', JSON.stringify(columnFilters ?? []));
            url.searchParams.set('globalFilter', globalFilter ?? '');
            url.searchParams.set('sorting', JSON.stringify(sorting ?? [])),

    }
    })
    return (
        <div>DataTable</div>
    )
}

export default DataTable