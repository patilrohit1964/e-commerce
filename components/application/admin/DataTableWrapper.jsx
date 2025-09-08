'use client'
import { ThemeProvider, } from '@mui/material'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { darkTheme, lightTheme } from '../../../lib/materialTheme'
import DataTable from './DataTable'

const DataTableWrapper = ({ queryKey, fetchUrl, columnsConfig, initialPageSize = 10, exportEndPoint, deleteEndPoint, deleteType, trashView, createAction }) => {
    const { resolvedTheme } = useTheme()
    const [mounted, setMounted] = useState(false)
    useEffect(() => {
        setMounted(true)
    }, []);

    if (!mounted) return null

    return (
        <ThemeProvider theme={resolvedTheme === 'dark' ? darkTheme : lightTheme}>
            <DataTable
                queryKey={queryKey}
                fetchUrl={fetchUrl}
                columnsConfig={columnsConfig}
                initialPageSize={initialPageSize}
                exportEndPoint={exportEndPoint}
                deleteEndPoint={deleteEndPoint}
                deleteType={deleteType}
                trashView={trashView}
                createAction={createAction}
            />
        </ThemeProvider>
    )
}

export default DataTableWrapper