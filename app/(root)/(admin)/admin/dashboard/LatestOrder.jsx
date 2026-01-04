'use client'
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
                    <TableHead>Total Id</TableHead>
                    <TableHead>Status Id</TableHead>
                    <TableHead>Amount</TableHead>
                </TableRow>
            </TableHeader>
            {
                latestOrderData && latestOrderData?.length > 0 ?
                    <TableBody>
                        {latestOrderData && latestOrderData?.length > 0 && latestOrderData?.data?.map((lOrder, idx) => (
                            <TableRow key={idx}>
                                <TableCell>{lOrder?.order_id}</TableCell>
                                <TableCell>{lOrder?.payment_id}</TableCell>
                                <TableCell>{`total${idx + 1}`}</TableCell>
                                <TableCell><Badge>{lOrder?.status}</Badge></TableCell>
                                <TableCell>{lOrder?.totalAmount}</TableCell>
                            </TableRow>
                        ))
                        }
                    </TableBody>
                    :
                    <div className="h-full w-full flex items-center justify-center">
                        No any order yet
                    </div>
            }
        </Table>
    )
}
