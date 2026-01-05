'use client'
import { statusBatch } from "../../../../../lib/helper"
import Loading from "../../../../../components/application/Loading"
import { Badge } from "../../../../../components/ui/badge"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "../../../../../components/ui/table"
import { useFetch } from "../../../../../hooks/useFetch"

export function LatestOrder() {
    const { data: latestOrderData, loading } = useFetch(`/api/dashboard/admin/latest-order`)
    if (loading) {
        return <Loading />
    }
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Order Id</TableHead>
                    <TableHead>Payment Id</TableHead>
                    <TableHead>Total Item</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Amount</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {latestOrderData && latestOrderData?.data?.map((lOrder, idx) => (
                    <TableRow key={lOrder?._id}>
                        <TableCell>{lOrder?.order_id}</TableCell>
                        <TableCell>{lOrder?.payment_id}</TableCell>
                        <TableCell>{lOrder?.products?.length}</TableCell>
                        <TableCell>{statusBatch(lOrder?.status)}</TableCell>
                        <TableCell>{lOrder?.totalAmount}</TableCell>
                    </TableRow>
                ))
                }
            </TableBody>
        </Table>
    )
}
